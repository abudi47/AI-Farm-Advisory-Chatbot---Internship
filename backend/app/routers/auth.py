from fastapi import Depends, HTTPException, status, APIRouter
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel
from datetime import datetime, timedelta
from jose import JWTError, jwt
from passlib.context import CryptContext
from sqlalchemy.orm import Session
from common.models.user import User as UserModel
from common.models.db import get_db
from common.models.document import Document 
from sqlalchemy import func


SECRET_KEY = "4340aa99705e93cda93f400b78f61f56bc671ce6c23bda8235803c098832abb7"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: str | None = None

class User(BaseModel):
    username: str | None = None
    email: str | None = None
    full_name: str | None = None
    disabled: bool | None = None
    is_admin: int | None = 0

class UserInDB(User):
    hashed_password: str

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth_2_scheme = OAuth2PasswordBearer(tokenUrl="token")

router = APIRouter()

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    if len(password) > 72:
        password = password[:72]
    return pwd_context.hash(password)

def get_user(db: Session, username: str):
    return db.query(UserModel).filter(UserModel.email == username).first()

def authenticate_user(db: Session, username: str, password: str):
    user = get_user(db, username)
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user  # This is UserModel, not Pydantic User

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_user(token: str = Depends(oauth_2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except JWTError:
        raise credentials_exception

    user = get_user(db, username=token_data.username)
    if user is None:
        raise credentials_exception
    return user

async def get_current_active_user(current_user: UserModel = Depends(get_current_user)):
    if getattr(current_user, "disabled", False):
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user

@router.post("/token", response_model=Token)
async def login_for_access_token(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email, "is_admin": user.is_admin}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/users/me/", response_model=User)
async def read_users_me(current_user: UserModel = Depends(get_current_active_user)):
    # Convert SQLAlchemy user to Pydantic User for response
    return User(
        username=current_user.email,
        email=current_user.email,
        full_name=getattr(current_user, "full_name", None),
        disabled=getattr(current_user, "disabled", False),
        is_admin=getattr(current_user, "is_admin", 0)
    )

@router.get("/users/me/items/")
async def read_own_items(current_user: UserModel = Depends(get_current_active_user)):
    return [{"item_id": 1, "owner": current_user.email}]

@router.get("/auth/verify")
async def verify_token(current_user: UserModel = Depends(get_current_active_user)):
    return {
        "id": current_user.id,
        "email": current_user.email,
        "is_admin": getattr(current_user, "is_admin", 0)
    }

# Dependency to check admin
async def get_current_admin_user(current_user: UserModel = Depends(get_current_active_user)):
    if not getattr(current_user, "is_admin", 0):
        raise HTTPException(status_code=403, detail="Not enough permissions")
    return current_user

@router.get("/admin/documents")
async def list_documents(
    db: Session = Depends(get_db),
    current_admin: UserModel = Depends(get_current_admin_user)
):
    # Get unique src_file_name entries
    ocs = (
    db.query(
        Document.src_file_name,
        func.min(Document.id).label("id"),
        func.min(Document.created_at).label("upload_date"),
        func.max(Document.status).label("status"),
        func.max(Document.size).label("size"),
    )
    .group_by(Document.src_file_name)
    .all()
)
    return [
        {
            "id": doc.id,
            "filename": doc.src_file_name,
            "upload_date": doc.upload_date,
            "status": doc.status,
            "size": doc.size,
        }
        for doc in ocs
    ]
from fastapi import UploadFile, File

@router.post("/upload")
async def upload_document(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_admin: UserModel = Depends(get_current_admin_user)
):
    # Save file and create Document entry
    contents = await file.read()
    filename = file.filename
    size = len(contents)
    # Save file to disk or cloud here if needed
    doc = Document(
        src_file_name=filename,
        content=contents.decode("utf-8", errors="ignore"),  # or save as binary
        status="pending",
        size=size,
    )
    db.add(doc)
    db.commit()
    db.refresh(doc)
    return {"id": doc.id, "filename": doc.src_file_name, "status": doc.status}

