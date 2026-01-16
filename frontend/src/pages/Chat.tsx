import { useState, useRef, useEffect } from "react";
import { ChatHeader } from "@/components/ChatHeader";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { LoadingIndicator } from "@/components/LoadingIndicator";
import { useToast } from "@/hooks/use-toast";
import { sendMessage, ChatMessage as ChatMessageType } from "@/services/api";
import { Sprout, MessageCircle } from "lucide-react";
import { useTranslations } from "@/hooks/useTranslations";
import { useLanguage } from "@/contexts/LanguageContext";
import { useChat } from "@/contexts/ChatContext";

const Index = () => {
  // const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const { messages, addMessage } = useChat();
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const { currentLanguage, changeLanguage } = useLanguage();
  const [location, setLocation] = useState<{ latitude: number; longitude: number; errorMessage: string } | null>(null);
  const { t } = useTranslations();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("Latitude: " + position.coords.latitude + ", Longitude: " + position.coords.longitude);
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            errorMessage: "",
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          setLocation((prev) => ({
            ...prev,
            errorMessage: "Unable to retrieve location",
          }));
        }
      );
    } else {
      setLocation({ latitude: 0, longitude: 0, errorMessage: "Geolocation is not supported by this browser" });
      console.error("Geolocation is not supported by this browser.");
    }
  };


  useEffect(() => {
    getLocation();
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (messageText: string) => {
    const userMessage: ChatMessageType = {
      id: Date.now().toString(),
      text: messageText,
      isUser: true,
      timestamp: new Date(),
    };

    // setMessages(prev => [...prev, userMessage]);
    addMessage(userMessage);
    setIsLoading(true);

    try {
      const response = await sendMessage(
        messageText,
        currentLanguage,
        location ? "" : null,
        location ? location.latitude : null,
        location ? location.longitude : null
      );
      
      const botMessage: ChatMessageType = {
        id: (Date.now() + 1).toString(),
        text: response.answer,
        isUser: false,
        timestamp: new Date(),
        sources: response.sources,
      };

      // setMessages(prev => [...prev, botMessage]);
      addMessage(botMessage);
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: t.connectionError,
        description: error instanceof Error ? error.message : t.connectionErrorDescription,
        variant: "destructive",
      });
      
      const errorMessage: ChatMessageType = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I'm having trouble connecting to the server. Please check the backend URL/config and try again.",
        isUser: false,
        timestamp: new Date(),
      };
      
      // setMessages(prev => [...prev, errorMessage]);
      addMessage(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (file: File) => {
    setIsUploading(true);
    
    try {
      // await uploadDocument(file);
      toast({
        title: t.documentUploaded,
        description: `${file.name} ${t.documentUploadedDescription}`,
      });
    } catch (error) {
      console.error('Error uploading file:', error);
      toast({
        title: t.uploadFailed,
        description: error instanceof Error ? error.message : t.uploadFailed,
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-warm">
      <ChatHeader
        language={currentLanguage}
        onLanguageChange={changeLanguage}
      />
      
      <main className="flex-1 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto">
          <div className="container mx-auto max-w-4xl px-3 sm:px-4 py-4 sm:py-6">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-8 sm:py-20">
                <div className="p-4 sm:p-6 bg-primary/10 rounded-full mb-4 sm:mb-6">
                  <Sprout className="h-12 w-12 sm:h-16 sm:w-16 text-primary" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-foreground px-4">{t.welcomeTitle}</h2>
                <p className="text-muted-foreground mb-6 sm:mb-8 max-w-md leading-relaxed text-sm sm:text-base px-4">
                  {t.welcomeDescription}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 w-full max-w-2xl px-4">
                  <div className="p-3 sm:p-4 bg-card rounded-lg border shadow-sm">
                    <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6 text-primary mb-2" />
                    <h3 className="font-semibold mb-1 text-sm sm:text-base">{t.askQuestionsTitle}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">{t.askQuestionsDescription}</p>
                  </div>
                  <div className="p-3 sm:p-4 bg-card rounded-lg border shadow-sm">
                    <Sprout className="h-5 w-5 sm:h-6 sm:w-6 text-primary mb-2" />
                    <h3 className="font-semibold mb-1 text-sm sm:text-base">{t.multipleLanguagesTitle}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">{t.multipleLanguagesDescription}</p>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {messages.map((message) => (
                  <ChatMessage key={message.id} message={message} />
                ))}
                {isLoading && <LoadingIndicator />}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>
        </div>
        
        <ChatInput
          onSendMessage={handleSendMessage}
          disabled={isUploading}
          isLoading={isLoading}
        />
      </main>
    </div>
  );
};

export default Index;