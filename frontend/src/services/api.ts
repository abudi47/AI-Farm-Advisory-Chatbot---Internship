// const API_BASE_URL = "http://localhost:8000";
// filepath: frontend/src/services/api.ts
const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.DEV ? "http://localhost:8000" : "")
).replace(/\/$/, "");
export interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  sources?: string[];
}

export interface Document {
  id: string;
  filename: string;
  upload_date: string;
  status: 'pending' | 'embedded' | 'failed';
  size: number;
}

export interface ChatResponse {
  answer: string;
  sources: string[];
}

export interface ChatRequest {
  question: string;
  lang: string;
  location: string;
  latitude: number;
  longitude: number;
}

export const languages = [
  { code: "en", name: "English" },
  { code: "om", name: "Affan Oromo" },
  { code: "am", name: "Amharic" },
  { code: "ti", name: "Tigrigna" },
  { code: "so", name: "Somali" },
];

export async function sendMessage(
  question: string,
  lang: string,
  location: string = null,
  latitude: number = null,
  longitude: number = null
): Promise<ChatResponse> {
  try {
    if (!API_BASE_URL) {
      throw new Error("VITE_API_BASE_URL is not set for this build.");
    }
    const response = await fetch(`${API_BASE_URL}/ask`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question,
        lang,
        location: location,
        latitude: latitude,
        longitude: longitude,
      }),
    });

    if (!response.ok) {
      let detail = "";
      try {
        const contentType = response.headers.get("content-type") || "";
        if (contentType.includes("application/json")) {
          const body = await response.json();
          detail = body?.detail ? String(body.detail) : JSON.stringify(body);
        } else {
          detail = await response.text();
        }
      } catch {
        // ignore parse errors
      }
      const suffix = detail ? ` - ${detail}` : "";
      throw new Error(`HTTP error! status: ${response.status}${suffix}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error sending message:", error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(`Failed to reach the server at ${API_BASE_URL}`);
  }
}

export async function uploadPdfToCloudinary(file: File): Promise<string> {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error("Failed to upload PDF to Cloudinary");
  }

  const data = await response.json();
  return data.secure_url;
}


export async function uploadDocumentUrlToBackend(url: string, filename: string): Promise<void> {
  const token = localStorage.getItem('admin_token');
  const response = await fetch(`${API_BASE_URL}/upload`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { "Authorization": `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ file_url: url, filename }),
  });

  if (!response.ok) {
    throw new Error("Failed to register document in backend");
  }
}


export async function triggerEmbedding(documentId: string): Promise<void> {
  try {
    const token = localStorage.getItem('admin_token');
    const response = await fetch(`${API_BASE_URL}/admin/documents/${documentId}/embed`, {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error triggering embedding:", error);
    throw new Error("Failed to trigger embedding");
  }
}


export async function getDocuments(): Promise<Document[]> {
  try {
    const token = localStorage.getItem('admin_token');
    const response = await fetch(`${API_BASE_URL}/admin/documents`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching documents:", error);
    throw new Error("Failed to fetch documents");
  }
}