# AI Farm Advisory Chatbot - Frontend

A beautiful, modern React frontend for the AI Farm Advisory Chatbot with multilingual support and responsive design.

## 🌱 Features

- **Modern Chat Interface**: Clean, agricultural-themed design with user and bot message bubbles
- **Multilingual Support**: English, Amharic, Affan Oromo, and Somali
- **Real-time Responses**: Connects to FastAPI backend for intelligent farming advice
- **Source Display**: Shows sources for AI responses to ensure transparency
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Loading States**: Beautiful loading indicators and smooth animations
- **Error Handling**: Graceful error handling with user-friendly messages

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Your FastAPI backend running on `http://localhost:8000`

### Installation & Running

1. **Clone and Install Dependencies**

   ```bash
   npm install
   ```

2. **Start the Development Server**

   ```bash
   npm run dev
   ```

3. **Open Your Browser**
   - Navigate to `http://localhost:8080`
   - The frontend will automatically connect to your backend at `localhost:8000`

## 🔧 Backend Connection

The frontend uses the `VITE_API_BASE_URL` environment variable as the backend base URL.

- **Development**: if `VITE_API_BASE_URL` is not set, it falls back to `http://localhost:8000`.
- **Production build**: you must set `VITE_API_BASE_URL` (otherwise the app will not be able to reach the backend).

Example `.env` for the frontend:

```bash
VITE_API_BASE_URL=http://localhost:8000
```

The backend should expose these endpoints:

- `POST /ask` - Send agricultural questions
  ```json
  {
    "question": "How do I improve soil fertility?",
    "lang": "en"
  }
  ```
- `POST /embed` - Upload PDF documents (optional, feature currently disabled in UI)
  ```
  FormData with 'file' field containing PDF
  ```

### Starting Your Backend

Make sure your FastAPI backend is running:

```bash
cd backend
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## 🎨 Design Features

- **Agricultural Color Scheme**: Earthy greens and natural tones
- **Smooth Animations**: Loading states and message transitions
- **Responsive Layout**: Mobile-first design with touch-friendly inputs
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Modern UI Components**: Built with shadcn/ui and Tailwind CSS
- **Custom Logo**: Nile Tech Solutions logo used in header and meta tags

## 📱 Mobile Support

The chatbot is fully responsive and optimized for:

- Mobile phones (portrait and landscape)
- Tablets
- Desktop computers
- Touch and keyboard interactions

## 🔍 Usage Tips

1. **Ask Specific Questions**: "How do I treat wheat rust disease?"
2. **Use Natural Language**: The AI understands conversational queries
3. **Switch Languages**: Use the language selector in the header
4. **Check Sources**: Review the sources provided with each answer

## 🏗️ Technical Stack

- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **shadcn/ui** component library
- **Lucide React** for icons
- **Vite** for build and development
- **React Query** for data fetching

## 🛠️ Development

### File Structure

```
src/
├── components/         # Reusable UI components
│   ├── ChatHeader.tsx     # Header with language selector and logo
│   ├── ChatMessage.tsx    # Message bubble component
│   ├── ChatInput.tsx      # Input field and send button
│   └── LoadingIndicator.tsx # Loading animation
├── services/          # API service layer
│   └── api.ts            # Backend communication
├── pages/            # Main pages
│   ├── Landing.tsx       # Landing page
│   ├── Chat.tsx          # Chat interface
│   └── NotFound.tsx      # 404 page
├── contexts/         # React context providers
│   └── LanguageContext.tsx # Language context
└── index.css         # Global styles and design system
```

### Customization

- **Colors**: Edit `src/index.css` for theme colors
- **API URL**: Update `API_BASE_URL` in `src/services/api.ts`
- **Languages**: Modify `languages` array in `src/services/api.ts`
- **Logo**: Replace `/public/nile-tech-logo.png` for branding

## 🐛 Troubleshooting

### Backend Connection Issues

If you see "Failed to get response from the server":

1. Verify backend is running: `curl http://localhost:8000/docs`
2. Check console for CORS errors
3. Ensure `VITE_API_BASE_URL` points to the correct backend URL
4. Ensure backend CORS allows your frontend origin (or uses `Access-Control-Allow-Origin: *` without cookies)

### Common Issues

- **Build Errors**: Run `npm install` to ensure all dependencies
- **Port Conflicts**: Backend must use port 8000, frontend uses 8080
- **Language Issues**: Check that your backend supports all language codes
- **Router Errors**: Only one `<BrowserRouter>` should exist (see `App.tsx`)

## 📝 API Integration

The frontend automatically handles:

- Message formatting and validation
- Loading states during API calls
- Error recovery and user notification
- Source display from backend responses
- (PDF upload temporarily disabled in UI)

Perfect for agricultural consultants, farmers, and anyone needing intelligent farming advice! 🌾
