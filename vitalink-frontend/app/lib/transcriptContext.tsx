// lib/AudioRecorderContext.js
"use client"; // Mark as a Client Component

import { createContext, useContext, useState, useRef, useEffect } from "react";

interface AudioRecorderContextType {
  isRecording: boolean;
  transcript: string;
  status: string;
  startRecording: () => void;
  stopRecording: () => void;
  clearTranscript: () => void;
}

const AudioRecorderContext = createContext<
  AudioRecorderContextType | undefined
>(undefined);

export function AudioRecorderProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [status, setStatus] = useState("Chưa kết nối");
  const mediaRecorderRef = useRef<MediaRecorder>(null);
  const socketRef = useRef<WebSocket>(null);
  const streamRef = useRef<MediaStream>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      if (!MediaRecorder.isTypeSupported("audio/webm")) {
        alert("Trình duyệt của bạn không hỗ trợ định dạng âm thanh này");
        return;
      }

      mediaRecorderRef.current = new MediaRecorder(stream, {
        mimeType: "audio/webm",
      });

      // Initialize WebSocket connection to Deepgram API
      socketRef.current = new WebSocket(
        "wss://api.deepgram.com/v1/listen?language=vi&model=nova-2",
        ["token", process.env.NEXT_PUBLIC_DEEPGRAM_API_KEY || ""] // Replace with your API key
      );

      socketRef.current.onopen = () => {
        if (mediaRecorderRef.current != null && socketRef.current != null) {
          setStatus("Đã kết nối");
          mediaRecorderRef.current.addEventListener(
            "dataavailable",
            (event) => {
              if (event.data.size > 0 && socketRef.current?.readyState === 1) {
                socketRef.current.send(event.data);
              }
            }
          );

          mediaRecorderRef.current.start(1000);
          setIsRecording(true);
        }
      };

      socketRef.current.onmessage = (message) => {
        console.log("received message")
        const received = JSON.parse(message.data);
        console.log(received)
        console.log(message)
        const transcriptText = received.channel.alternatives[0].transcript;

        if (transcriptText && received.is_final) {
          console.log(transcriptText);
          setTranscript((prev) => prev + transcriptText + " ");
        }
      };

      socketRef.current.onclose = () => {
        console.log("WebSocket đã đóng");
        setStatus("Đã ngắt kết nối");
        setIsRecording(false);
      };

      socketRef.current.onerror = (error) => {
        console.error("Lỗi WebSocket:", error);
        setStatus("Lỗi kết nối");
        setIsRecording(false);
      };
    } catch (error) {
      console.error("Lỗi:", error);
      alert("Không thể truy cập microphone. Vui lòng kiểm tra quyền truy cập.");
    }
  };

  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
    }

    if (socketRef.current && socketRef.current.readyState === 1) {
      socketRef.current.close();
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }

    setIsRecording(false);
    setStatus("Đã ngắt kết nối");
  };

  const clearTranscript = () => {
    setTranscript("");
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopRecording();
    };
  }, []);

  const value: AudioRecorderContextType = {
    isRecording,
    transcript,
    status,
    startRecording,
    stopRecording,
    clearTranscript,
  };

  return (
    <AudioRecorderContext.Provider value={value}>
      {children}
    </AudioRecorderContext.Provider>
  );
}

// Custom hook to access the context
export function useAudioRecorder() {
  const context = useContext(AudioRecorderContext);
  if (!context) {
    throw new Error(
      "useAudioRecorder must be used within an AudioRecorderProvider"
    );
  }
  return context;
}
