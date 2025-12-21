"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Loader2, Copy, Check, Mic, Image as ImageIcon, X, Shield, Camera, Save, Trash2, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { TabType } from "../page";
import { LumAvatar } from "@/components/LumIcons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  type?: "text" | "audio" | "image";
  mediaUrl?: string;
  isStreaming?: boolean;
}

interface ChatInterfaceProps {
  activeTab: TabType;
  onCreateCustomTab: (tabName: string) => void;
  userId?: string;
}

const tabGreetings: Record<string, string> = {
  inicio: "Esse é seu espaço. Me conta o que você está sentindo.",
  trabalho: "O que está acontecendo no trabalho?",
  relacionamento: "O que você quer compartilhar sobre seus relacionamentos?",
  familia: "O que está na sua cabeça sobre sua família?",
  estudos: "Como posso te ajudar com os estudos?",
  pessoal: "Esse é seu espaço pessoal. O que você quer conversar?",
  "tomada-decisao": "Estou aqui para te ajudar a pensar com clareza. Qual decisão está te travando?",
};

export function ChatInterface({ activeTab, onCreateCustomTab, userId }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [userAvatar, setUserAvatar] = useState<string | null>(null);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [newTabName, setNewTabName] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const greeting = tabGreetings[activeTab] || tabGreetings.inicio;
  const isFixedTab = ["trabalho", "relacionamento", "familia", "estudos", "pessoal", "tomada-decisao"].includes(activeTab);
  const isInicio = activeTab === "inicio";

  // Carregar avatar do usuário
  useEffect(() => {
    const savedAvatar = localStorage.getItem("lumia-user-avatar");
    if (savedAvatar) {
      setUserAvatar(savedAvatar);
    }
  }, []);

  // Mostrar mensagem inicial da Lum quando não há histórico
  useEffect(() => {
    // Para "Início", NUNCA carregar histórico - sempre começar novo
    if (isInicio) {
      setMessages([]);
      setIsTyping(true);
      
      const typingDelay = 1500 + Math.random() * 1000;
      
      const typingTimer = setTimeout(() => {
        setIsTyping(false);
        const initialMessage: Message = {
          role: "assistant",
          content: greeting,
          timestamp: new Date(),
        };
        setMessages([initialMessage]);
      }, typingDelay);

      return () => clearTimeout(typingTimer);
    }
    
    // Para temas fixos, carregar histórico normalmente
    const storageKey = userId ? `lumia-chat-history-${activeTab}-${userId}` : `lumia-chat-history-${activeTab}`;
    const savedHistory = localStorage.getItem(storageKey);
    
    if (!savedHistory || savedHistory === "[]") {
      setIsTyping(true);
      
      const typingDelay = 1500 + Math.random() * 1000;
      
      const typingTimer = setTimeout(() => {
        setIsTyping(false);
        const initialMessage: Message = {
          role: "assistant",
          content: greeting,
          timestamp: new Date(),
        };
        setMessages([initialMessage]);
      }, typingDelay);

      return () => clearTimeout(typingTimer);
    } else {
      try {
        const parsed = JSON.parse(savedHistory);
        if (parsed.length > 0) {
          const converted = parsed.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp),
          }));
          setMessages(converted);
        }
      } catch (e) {
        console.error("Erro ao carregar histórico:", e);
        setMessages([]);
      }
    }
  }, [activeTab, greeting, isInicio, userId]);

  // Salvar histórico APENAS para temas fixos (não para "Início")
  useEffect(() => {
    if (messages.length > 0 && !isInicio && userId) {
      const storageKey = `lumia-chat-history-${activeTab}-${userId}`;
      localStorage.setItem(storageKey, JSON.stringify(messages));
    }
  }, [messages, activeTab, isInicio, userId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    textareaRef.current?.focus();
  }, [activeTab]);

  const handleCopy = async (content: string, index: number) => {
    try {
      if (navigator.clipboard && document.hasFocus()) {
        await navigator.clipboard.writeText(content);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = content;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
          const successful = document.execCommand('copy');
          if (successful) {
            setCopiedIndex(index);
            setTimeout(() => setCopiedIndex(null), 2000);
          }
        } catch (err) {
          console.error("Fallback de cópia falhou:", err);
        } finally {
          document.body.removeChild(textArea);
        }
      }
    } catch (err) {
      console.error("Erro ao copiar:", err);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFilePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleAvatarSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setUserAvatar(result);
        localStorage.setItem("lumia-user-avatar", result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setFilePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (audioInputRef.current) audioInputRef.current.value = "";
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        const audioFile = new File([audioBlob], "audio.webm", { type: "audio/webm" });
        setSelectedFile(audioFile);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Erro ao iniciar gravação:", error);
      alert("Não foi possível acessar o microfone. Verifique as permissões.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleSend = async () => {
    if ((!input.trim() && !selectedFile) || isLoading) return;

    let messageContent = input.trim();
    let messageType: "text" | "audio" | "image" = "text";
    let mediaUrl: string | undefined;

    if (selectedFile) {
      if (selectedFile.type.startsWith("image/")) {
        messageType = "image";
        messageContent = input.trim() || "Enviou uma imagem";
        mediaUrl = filePreview || undefined;
      } else if (selectedFile.type.startsWith("audio/")) {
        messageType = "audio";
        messageContent = input.trim() || "Enviou um áudio";
      }
    }

    const userMessage: Message = {
      role: "user",
      content: messageContent,
      timestamp: new Date(),
      type: messageType,
      mediaUrl,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    handleRemoveFile();
    setIsLoading(true);
    
    // Mostrar indicador de digitação IMEDIATAMENTE
    setIsTyping(true);

    try {
      const formData = new FormData();
      formData.append("messages", JSON.stringify([...messages, userMessage]));
      formData.append("tabContext", activeTab);
      if (userId) {
        formData.append("userId", userId);
      }
      
      if (selectedFile) {
        formData.append("file", selectedFile);
        formData.append("fileType", messageType);
      }

      // Fazer requisição
      const response = await fetch("/api/chat", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Erro na resposta da API");
      }

      // Verificar se é streaming ou JSON
      const contentType = response.headers.get("content-type");
      
      if (contentType?.includes("text/event-stream")) {
        // Processar streaming
        const reader = response.body?.getReader();
        const decoder = new TextDecoder();
        
        if (!reader) {
          throw new Error("Não foi possível ler o stream");
        }

        // Delay natural para simular "pensamento" (1-2 segundos)
        const naturalDelay = 1000 + Math.random() * 1000;
        await new Promise(resolve => setTimeout(resolve, naturalDelay));

        // Remover indicador de digitação
        setIsTyping(false);

        // Criar mensagem vazia que será preenchida gradualmente
        const assistantMessage: Message = {
          role: "assistant",
          content: "",
          timestamp: new Date(),
          isStreaming: true,
        };

        setMessages((prev) => [...prev, assistantMessage]);
        const messageIndex = messages.length + 1;

        let fullContent = "";
        
        while (true) {
          const { done, value } = await reader.read();
          
          if (done) break;
          
          const chunk = decoder.decode(value);
          const lines = chunk.split("\n");
          
          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6);
              
              if (data === "[DONE]") {
                // Finalizar streaming
                setMessages((prev) => {
                  const newMessages = [...prev];
                  if (newMessages[messageIndex]) {
                    newMessages[messageIndex] = {
                      ...newMessages[messageIndex],
                      isStreaming: false,
                    };
                  }
                  return newMessages;
                });
                break;
              }
              
              try {
                const parsed = JSON.parse(data);
                if (parsed.content) {
                  fullContent += parsed.content;
                  
                  // Atualizar mensagem com novo conteúdo
                  setMessages((prev) => {
                    const newMessages = [...prev];
                    if (newMessages[messageIndex]) {
                      newMessages[messageIndex] = {
                        ...newMessages[messageIndex],
                        content: fullContent,
                      };
                    }
                    return newMessages;
                  });
                }
              } catch (e) {
                // Ignorar erros de parsing
              }
            }
          }
        }
      } else {
        // Processar resposta JSON (fallback ou limite atingido)
        const data = await response.json();

        // Delay natural para simular "pensamento"
        const naturalDelay = 1000 + Math.random() * 1000;
        await new Promise(resolve => setTimeout(resolve, naturalDelay));

        // Remover indicador de digitação
        setIsTyping(false);

        const assistantMessage: Message = {
          role: "assistant",
          content: data.message || "Desculpe, não consegui processar sua mensagem. Pode tentar novamente?",
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, assistantMessage]);
      }

    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      
      setIsTyping(false);
      
      // Garantir que SEMPRE haja uma resposta, mesmo em caso de erro
      const errorMessage: Message = {
        role: "assistant",
        content: "Tive um problema agora, mas já estou aqui de novo. Pode tentar mais uma vez?",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSaveConversation = () => {
    if (newTabName.trim() && isInicio) {
      // Salvar histórico do Início como uma nova aba customizada
      const newTabId = `custom-${Date.now()}`;
      const storageKey = userId ? `lumia-chat-history-${newTabId}-${userId}` : `lumia-chat-history-${newTabId}`;
      localStorage.setItem(storageKey, JSON.stringify(messages));
      
      onCreateCustomTab(newTabName.trim());
      setShowSaveDialog(false);
      setNewTabName("");
      
      // Limpar o Início após salvar
      setMessages([]);
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const initialMessage: Message = {
          role: "assistant",
          content: greeting,
          timestamp: new Date(),
        };
        setMessages([initialMessage]);
      }, 1500);
    }
  };

  const handleClearHistory = () => {
    if (confirm("Tem certeza que deseja limpar todo o histórico desta conversa? Esta ação não pode ser desfeita.")) {
      setMessages([]);
      const storageKey = userId ? `lumia-chat-history-${activeTab}-${userId}` : `lumia-chat-history-${activeTab}`;
      localStorage.removeItem(storageKey);
      
      // Mostrar mensagem inicial novamente
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const initialMessage: Message = {
          role: "assistant",
          content: greeting,
          timestamp: new Date(),
        };
        setMessages([initialMessage]);
      }, 1500);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#212121]">
      {/* Header with Actions */}
      {messages.length > 0 && (
        <div className="border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 py-3 flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
            {activeTab === "inicio" ? "Início" : 
             activeTab === "trabalho" ? "Trabalho" :
             activeTab === "relacionamento" ? "Relacionamento" :
             activeTab === "familia" ? "Família" :
             activeTab === "estudos" ? "Estudos" :
             activeTab === "pessoal" ? "Pessoal" :
             activeTab === "tomada-decisao" ? "Tomada de decisão" : "Conversa"}
          </h2>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {isInicio && messages.length > 1 && (
                <DropdownMenuItem onClick={() => setShowSaveDialog(true)}>
                  <Save className="w-4 h-4 mr-2" />
                  Salvar conversa
                </DropdownMenuItem>
              )}
              {isFixedTab && (
                <DropdownMenuItem onClick={handleClearHistory} className="text-red-600 dark:text-red-400">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Limpar histórico
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`group mb-8 animate-fade-in ${
                message.role === "user" ? "ml-auto max-w-[80%]" : ""
              }`}
            >
              {/* Avatar/Label */}
              <div className="flex items-center gap-2 mb-2">
                {message.role === "user" ? (
                  <div className="relative group/avatar">
                    {userAvatar ? (
                      <img 
                        src={userAvatar} 
                        alt="Você" 
                        className="w-7 h-7 rounded-full object-cover ring-2 ring-gray-200 dark:ring-gray-700"
                      />
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 flex items-center justify-center text-xs font-medium">
                        V
                      </div>
                    )}
                    <button
                      onClick={() => avatarInputRef.current?.click()}
                      className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover/avatar:opacity-100 transition-opacity flex items-center justify-center"
                    >
                      <Camera className="w-3 h-3 text-white" />
                    </button>
                    <input
                      ref={avatarInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarSelect}
                      className="hidden"
                    />
                  </div>
                ) : (
                  <LumAvatar className="w-7 h-7" />
                )}
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {message.role === "user" ? "Você" : "Lum"}
                </span>
              </div>

              {/* Message Content */}
              <div className="ml-9">
                {message.type === "image" && message.mediaUrl && (
                  <img
                    src={message.mediaUrl}
                    alt="Imagem enviada"
                    className="rounded-lg mb-3 max-w-full h-auto"
                  />
                )}
                {message.type === "audio" && (
                  <div className="flex items-center gap-2 mb-2 text-sm text-gray-600 dark:text-gray-400">
                    <Mic className="w-4 h-4" />
                    <span>Áudio enviado</span>
                  </div>
                )}
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p className="text-[15px] leading-[1.7] text-gray-900 dark:text-gray-100 whitespace-pre-wrap m-0">
                    {message.content}
                    {message.isStreaming && <span className="inline-block w-1 h-4 bg-purple-500 ml-1 animate-pulse"></span>}
                  </p>
                </div>

                {/* Actions */}
                {!message.isStreaming && (
                  <div className="flex items-center gap-2 mt-3">
                    {message.role === "assistant" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopy(message.content, index)}
                        className="h-8 px-2 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-purple-50 dark:hover:bg-purple-900/20"
                      >
                        {copiedIndex === index ? (
                          <Check className="w-4 h-4 text-purple-600" />
                        ) : (
                          <Copy className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        )}
                      </Button>
                    )}
                    <span className="text-xs text-gray-400 dark:text-gray-500">
                      {message.timestamp.toLocaleTimeString("pt-BR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {/* Typing Indicator */}
          {isTyping && (
            <div className="group mb-8 animate-fade-in">
              <div className="flex items-center gap-2 mb-2">
                <LumAvatar className="w-7 h-7" />
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Lum</span>
              </div>
              <div className="ml-9">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Privacy Message */}
      <div className="border-t border-gray-200 dark:border-gray-700 bg-purple-50/30 dark:bg-purple-900/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-2">
          <div className="flex items-center justify-center gap-2 text-xs text-gray-600 dark:text-gray-400">
            <Shield className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
            <span>Suas conversas são privadas e seguras. Ninguém tem acesso ao que você escreve aqui.</span>
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-[#212121]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4">
          {/* File Preview */}
          {(selectedFile || filePreview) && (
            <div className="mb-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg flex items-center gap-3 animate-fade-in border border-purple-200 dark:border-purple-800">
              {filePreview ? (
                <img src={filePreview} alt="Preview" className="w-12 h-12 rounded object-cover" />
              ) : (
                <div className="w-12 h-12 rounded bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                  {selectedFile?.type.startsWith("audio/") ? (
                    <Mic className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  ) : (
                    <ImageIcon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  )}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                  {selectedFile?.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {selectedFile?.type.startsWith("image/") ? "Imagem" : "Áudio"}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRemoveFile}
                className="hover:bg-purple-100 dark:hover:bg-purple-900/30"
              >
                <X className="w-4 h-4 text-gray-500" />
              </Button>
            </div>
          )}

          {/* Input Row */}
          <div className="flex items-end gap-2">
            {/* Image Upload */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => fileInputRef.current?.click()}
              disabled={isLoading || isRecording}
              className="h-10 w-10 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 shrink-0"
            >
              <ImageIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </Button>

            {/* Audio Recording */}
            <input
              ref={audioInputRef}
              type="file"
              accept="audio/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={isRecording ? stopRecording : startRecording}
              disabled={isLoading}
              className={`h-10 w-10 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 shrink-0 ${
                isRecording ? "bg-red-50 dark:bg-red-900/20" : ""
              }`}
            >
              <Mic className={`w-5 h-5 ${isRecording ? "text-red-600 animate-pulse" : "text-gray-600 dark:text-gray-400"}`} />
            </Button>

            {/* Text Input */}
            <div className="flex-1 relative">
              <Textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Digite sua mensagem..."
                className="min-h-[44px] max-h-[200px] resize-none border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 focus:border-purple-400 dark:focus:border-purple-500 focus:ring-1 focus:ring-purple-400 dark:focus:ring-purple-500 rounded-xl text-[15px] py-3 pr-12"
                disabled={isLoading}
              />
              <Button
                onClick={handleSend}
                disabled={(!input.trim() && !selectedFile) || isLoading}
                size="icon"
                className="absolute right-2 bottom-2 h-8 w-8 rounded-lg bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white disabled:opacity-30 disabled:hover:bg-purple-600 dark:disabled:hover:bg-purple-500 shadow-sm"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Save Conversation Dialog */}
      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Salvar conversa</DialogTitle>
            <DialogDescription>
              Dê um nome para esta conversa. Ela aparecerá no menu como uma nova aba.
            </DialogDescription>
          </DialogHeader>
          <Input
            value={newTabName}
            onChange={(e) => setNewTabName(e.target.value)}
            placeholder="Ex: Minha decisão importante"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSaveConversation();
              }
            }}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSaveDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveConversation} disabled={!newTabName.trim()}>
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
