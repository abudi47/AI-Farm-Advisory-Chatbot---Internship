import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  sources?: string[];
}

interface ChatContextType {
  messages: ChatMessage[];
  addMessage: (message: ChatMessage) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);

    const addMessage = (message: ChatMessage) => {
        setMessages((prevMessages) => {
          localStorage.setItem("chat-messages", JSON.stringify([...prevMessages, message]));
          return [...prevMessages, message]
        });
    };

    useEffect(() => {
        const storedMessages = localStorage.getItem("chat-messages");
        console.log("Hello");
        
        if (storedMessages) {
            setMessages(JSON.parse(storedMessages));
        }
    }, []);

  return (
    <ChatContext.Provider value={{ messages, addMessage }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  return useContext(ChatContext);
};
