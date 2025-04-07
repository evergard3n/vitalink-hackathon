"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { Chat } from "./definitions";
import { useUser } from "@clerk/nextjs";
/* eslint-disable @typescript-eslint/no-explicit-any */



interface WebSocketContextType {
  socket: WebSocket | null;
  messages: Chat[] | undefined;
  sendMessage: (message: string) => void;
  sendFormData: (formData: any) => void;
  formContent: any;
}


const WebSocketContext = createContext<WebSocketContextType | undefined>(
  undefined
);

export const  WebSocketProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<Chat[]>([]);
  const [formContent, setFormContent] = useState();
  const { user } =  useUser();
  useEffect(() => {
    if(!user) return;
    const getMessages = async () => {
      const response = await fetch(`https://${process.env.NEXT_PUBLIC_BACKEND_URL}/api/history/${user.id}`);
      if(!response) return;
      const data = await response.json();
      if(!data.chat_history) return;
      setMessages(data.chat_history);

    }
    getMessages();
  },[user])
  useEffect(() => {
    const ws = new WebSocket(`wss://${process.env.NEXT_PUBLIC_BACKEND_URL}/api/chat`);

    ws.onopen = () => console.log("🟢 WebSocket đã kết nối!");
    ws.onclose = () => console.log(`🔴 WebSocket mất kết nối! ${process.env.NEXT_PUBLIC_BACKEND_URL}`);
    ws.onerror = (error) => console.error("⚠️ WebSocket error:", error);

    ws.onmessage = (event) => {
      const response = JSON.parse(event.data);
      if(response.reply && response.reply !== "Cập nhật form thành công.") {
        const newMessage: Chat = {
          message: response.reply,
          sender: "BOT",
        };
        setMessages((prev) => [...prev, newMessage]);
        setFormContent(response.form);
      } else {
        
        console.log('form received')
      }
      
       // Lưu tin nhắn mới
    };

    setSocket(ws);

    return () => {
      ws.close(); // Đóng kết nối khi unmount
    };
  }, []);
  function sendMessage(message: string) {
    if (socket && socket.readyState === WebSocket.OPEN) {
      const chatMessage: Chat = {
        sender: "User",
        message: message,
      };

      socket.send(JSON.stringify({ type: "chat", message: message, user_id : user?.id}));
      setMessages((prev) => [...prev, chatMessage]);
    } else {
      console.warn("⚠️ WebSocket chưa sẵn sàng!");
    }
  }
  function sendFormData(formData: any) {
    

    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({type: "formUpdate", data: formData}))
    }
  }
  return (
    <WebSocketContext.Provider
      value={{ socket, messages, sendMessage, sendFormData, formContent }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => useContext(WebSocketContext);
