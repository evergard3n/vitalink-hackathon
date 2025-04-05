'use client'

import { useState, useEffect } from "react";

export default function Page() {
    const [status, setStatus] = useState("Đang kết nối...");
    const [socket, setSocket] = useState(null);
  
    useEffect(() => {
      const ws = new WebSocket("ws://localhost:5001/api/chat");
  
      ws.onopen = () => {
        setStatus("🟢 Đã kết nối!");
      };
  
      ws.onclose = () => {
        setStatus("🔴 Mất kết nối!");
      };
  
      ws.onerror = (error) => {
        setStatus("⚠️ Lỗi WebSocket!");
        console.error("WebSocket error:", error);
      };
  
  
      return () => {
        ws.close(); // Đóng kết nối khi component bị unmount
      };
    }, []);
  
    return <p>Trạng thái WebSocket: {status}</p>;
  };
