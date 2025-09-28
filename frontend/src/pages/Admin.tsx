import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { uploadDocumentUrlToBackend } from "@/services/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
//   uploadDocument,
  getDocuments,
  triggerEmbedding,
  type Document,
} from "@/services/api";
import { Upload, LogOut, RefreshCw } from "lucide-react";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      await login(email, password);
      toast({
        title: "Success",
        description: "Logged in successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid credentials",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Admin Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

const AdminDashboard: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { logout, user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    try {
      const docs = await getDocuments();
      setDocuments(docs);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load documents",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (
  event: React.ChangeEvent<HTMLInputElement>
) => {
  const file = event.target.files?.[0];
  if (!file) return;
  setIsUploading(true);

  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append('filename', file.name);

    await uploadDocumentUrlToBackend(formData);

    toast({ title: "Success", description: "PDF uploaded and registered!" });
    loadDocuments();
  } catch (error: any) {
    toast({
      title: "Error",
      description: error.message,
      variant: "destructive",
    });
  } finally {
    setIsUploading(false);
  }
};
  const handleTriggerEmbedding = async (documentId: string) => {
    try {
      await triggerEmbedding(documentId);
      toast({
        title: "Success",
        description: "Embedding process started",
      });
      loadDocuments(); // Refresh to see updated status
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to trigger embedding",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: Document["status"]) => {
    const variants = {
      pending: "secondary" as const,
      embedded: "default" as const,
      failed: "destructive" as const,
    };
    return <Badge variant={variants[status]}>{status}</Badge>;
  };

  const formatFileSize = (bytes: number) => {
    const sizes = ["Bytes", "KB", "MB", "GB"];
    if (bytes === 0) return "0 Bytes";
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + " " + sizes[i];
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground">Welcome, {user?.email}</p>
          </div>
          <Button variant="outline" onClick={logout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        {/* Upload Section */}
        <Card>
          <CardHeader>
            <CardTitle>Upload PDF Document</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <Label htmlFor="file-upload" className="cursor-pointer">
                <div className="flex items-center space-x-2 px-4 py-2 border border-input rounded-md hover:bg-accent">
                  <Upload className="h-4 w-4" />
                  <span>
                    {isUploading ? "Uploading..." : "Choose PDF File"}
                  </span>
                </div>
                <Input
                  id="file-upload"
                  type="file"
                  accept=".pdf"
                  onChange={handleFileUpload}
                  disabled={isUploading}
                  className="hidden"
                />
              </Label>
              <Button
                variant="outline"
                size="sm"
                onClick={loadDocuments}
                disabled={isLoading}
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Documents Table */}
        <Card>
          <CardHeader>
            <CardTitle>Uploaded Documents</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-4">Loading documents...</div>
            ) : documents.length === 0 ? (
              <div className="text-center py-4 text-muted-foreground">
                No documents uploaded yet
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Filename</TableHead>
                    <TableHead>Upload Date</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {documents.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell className="font-medium">
                        {doc.filename}
                      </TableCell>
                      <TableCell>
                        {new Date(doc.upload_date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{formatFileSize(doc.size)}</TableCell>
                      <TableCell>{getStatusBadge(doc.status)}</TableCell>
                      <TableCell>
                        {doc.status === "pending" && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleTriggerEmbedding(doc.id)}
                          >
                            Trigger Embedding
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const Admin: React.FC = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  return user ? <AdminDashboard /> : <LoginForm />;
};

export default Admin;

function uploadPdfToCloudinary(file: File) {
    throw new Error("Function not implemented.");
}

