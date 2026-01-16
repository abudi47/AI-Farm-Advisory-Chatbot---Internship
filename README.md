# 🌱 AI Farm Advisory Chatbot  
![Alt text](https://www.thehabarinetwork.com/wp-content/uploads/2025/08/hg7r9hW7FbWWm5w-1000x600.jpg)
An intelligent chatbot that provides **agricultural advice** to farmers using **AI, PostgreSQL + pgvector, FastAPI, and React**.  
It supports **multilingual queries (e.g., Afaan Oromo, English)** and integrates with **Telegram & SMS gateways** for accessibility.  

---

## ✨ Features  

- 🤖 **AI-powered Q&A** – Answer farming questions using OpenAI embeddings & GPT.  
- 📚 **Document ingestion** – Store agricultural guides in Postgres (with pgvector).  
- 🌍 **Multilingual support** – Auto-translate questions (e.g., English ⇄ Afaan Oromo).  
- ☁️ **Weather integration** – Real-time weather data via OpenWeather API.  
- 📱 **Telegram bot + SMS gateway** – Farmers can ask questions on-the-go.  
- 🔒 **Configurable via `.env`** – Secure API keys & database settings.  

---

## 🛠 Tech Stack  

**Backend**: [FastAPI](https://fastapi.tiangolo.com/) + [SQLAlchemy](https://www.sqlalchemy.org/) + [Alembic](https://alembic.sqlalchemy.org/) + [python-telegram-bot](https://python-telegram-bot.org/)  
**Database**: [PostgreSQL](https://www.postgresql.org/) + [pgvector](https://github.com/pgvector/pgvector)  
**Frontend**: [React](https://react.dev/) + Tailwind CSS  
**AI**: OpenAI API (embeddings + GPT models)  
**Integrations**: Telegram Bot API, Twilio SMS, OpenWeather API  
**Containerization**: Docker + docker-compose  

---


## 🚀 Getting Started  

### 1. Clone repository  

```bash
$ git clone https://github.com/abudi47/AI-Farm-Advisory-Chatbot---Internship.git
$ cd AI-Farm-Advisory-Chatbot---Internship
```

### 2. Set up environment variables
```bash
$ cp backend/.env.example backend/.env
```
Edit `backend/.env` and fill in your actual API keys and database credentials.

### 3. Start services with Docker Compose (Development)  

```bash
$ cd backend
$ python3 -m venv venv
$ source venv/bin/activate
$ pip install -r backend/requirements.txt
```

To start the backend server and Telegram bot, run:
```bash
$ python main.py runserver
$ python main.py runbot
```

To start the frontend, run:
```bash
$ cd ../frontend
$ npm install
$ npm run dev
```
### 4. Ingest agricultural documents
```bash
$ python main.py embed-and-store path/to/your/document.pdf --title "Document Title"
```

### 5. Access the application
- Backend API docs: `http://localhost:8000/docs`
- Frontend: `http://localhost:8080`
- Telegram Bot: Search for your bot username in Telegram and start chatting!

<br/>

---
## 📡 API Examples  

This document shows example usage of the **AI Farm Advisory Chatbot API** endpoints.  

---

### 🔹 /ask

Verify that the backend is running:  

```http
post /ask

Content-Type: application/json

{
  "question": "What is the best time to plant maize in Ethiopia?",
  "language": "en",
  "location": "Addis Ababa"
}
```
**Response**:  
```json
{
  "answer": "The best time to plant maize in Ethiopia is during the main rainy season, which typically occurs from June to September. This period provides optimal soil moisture and temperature conditions for maize growth. However, it's important to consider local variations in climate and consult with local agricultural experts for specific recommendations.",
  
    "sources": [ "Maize Cultivation Guide", "Ethiopian Agricultural Practices" ]
}
```

## 🧪 Run tests

```bash
$ cd backend
$ source venv/bin/activate
$ python -m unittest discover -s tests -v
```

# 🤝 Contributing Guide  

Thank you for considering contributing to **AI Farm Advisory Chatbot**! 🚜🌱  
We welcome bug reports, feature requests, documentation updates, and code improvements.  

---

## 🔹 How to Contribute  

1. **Fork the project**  
   Click the **Fork** button at the top-right of this repository.  

2. **Clone your fork locally**  
   ```bash
   git clone https://github.com/your-username/ai-farm-advisory-chatbot.git
   cd ai-farm-advisory-chatbot
    ```
3. **Create a new branch**
    ```bash
    git checkout -b feature/your-feature-name
    ```
4. **Make your changes**  
   - Follow the existing code style and conventions.  
   - Write clear commit messages.  
   - Add tests for new features or bug fixes.
5. **Run tests**  
   Ensure all tests pass before submitting your changes.  
   ```bash
   cd backend
   source venv/bin/activate
   python -m unittest discover -s tests -v
   ```
6. **Commit your changes**  
   ```bash
   git add .
   git commit -m "Add your commit message"
   ```
7. **Push to your fork**  
   ```bash
   git push origin feature/your-feature-name
    ```
8. **Create a Pull Request**  
   Go to the original repository and click the **Compare & pull request** button.  
   Fill out the PR template and describe your changes.


## Contributors
<!-- Contributors list -->
<table>
  <tr>
    <td align="center">
      <a href="https://github.com/beab1212">
        <img src="https://avatars.githubusercontent.com/u/111971678?v=4" width="100px;" alt="User1"/>
      </a>
      <br />
      <a href="https://github.com/beab1212">Beab1212</a>
      <br />
      <a href="https://x.com/bw40508">Twitter</a> | <a href="https://linkedin.com/in/beabdev">LinkedIn</a>
    </td>
    <td align="center">
      <a href="https://github.com/abudi47">
        <img src="https://avatars.githubusercontent.com/u/136098639?v=4" width="100px;" alt="User2"/>
      </a>
      <br />
      <a href="https://github.com/abudi47">Abudi47</a>
      <br />
      <a href="https://twitter.com//abduselam-t">Twitter</a> | <a href="https://linkedin.com/in/abduselam-t">LinkedIn</a>
    </td>
    <!-- Repeat for more contributors -->
  </tr>
</table>

