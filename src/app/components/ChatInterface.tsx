"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Loader2, Copy, Check, Mic, Image as ImageIcon, X, Shield, Camera, Trash2, MoreVertical, Save, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
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
import { MessageCircle, Heart, Users, Briefcase, Target } from "lucide-react";
import { 
  saveMessageHybrid, 
  loadMessagesHybrid, 
  saveConversation,
  markConversationAsSaved 
} from "@/lib/chat-storage";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  type?: "text" | "audio" | "image";
  mediaUrl?: string;
  isStreaming?: boolean;
}

interface ChatInterfaceProps {
  activeTab: string;
  onCreateCustomTab: (tabName: string) => void;
  userId?: string;
  activeTheme: string;
  onThemeChange: (theme: string) => void;
  onBack?: () => void;
  isDemo?: boolean;
  onDemoAction?: (context?: string) => void;
  initialMessage?: string;
  demoMessageLimit?: number; // Limite customizado de mensagens no modo demo (padrão: 3)
  isReflectionChat?: boolean; // Flag para indicar que é um chat de reflexão (para avisos)
}

const themeConfig: Record<string, { icon: any; name: string; color: string; seedMessage?: string }> = {
  "espaco-livre": {
    icon: MessageCircle,
    name: "Espaço Livre",
    color: "text-blue-400"
  },
  "relacionamento": {
    icon: Heart,
    name: "Relacionamento",
    color: "text-pink-400",
    seedMessage: "Oi! Aqui você pode falar sobre seus relacionamentos, sejam eles amorosos, de amizade ou qualquer outro tipo. Como você está se sentindo hoje?"
  },
  "familia": {
    icon: Users,
    name: "Família",
    color: "text-emerald-400",
    seedMessage: "Olá! Este é o seu espaço para conversar sobre família. Pode ser sobre seus pais, irmãos, filhos ou qualquer pessoa da sua família. O que você gostaria de compartilhar?"
  },
  "trabalho": {
    icon: Briefcase,
    name: "Trabalho",
    color: "text-amber-400",
    seedMessage: "Oi! Vamos falar sobre trabalho? Seja sobre desafios, conquistas, colegas ou qualquer coisa relacionada à sua vida profissional. Como estão as coisas?"
  },
  "tomada-decisao": {
    icon: Target,
    name: "Tomada de decisão",
    color: "text-purple-400",
    seedMessage: "Olá! Aqui você pode pensar junto comigo sobre decisões importantes. Vamos explorar suas opções e sentimentos. Qual decisão está te ocupando?"
  }
};

export function ChatInterface({ activeTab, onCreateCustomTab, userId, activeTheme, onThemeChange, onBack, isDemo = false, onDemoAction, initialMessage, demoMessageLimit = 3, isReflectionChat = false }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [userAvatar, setUserAvatar] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showExitWarning, setShowExitWarning] = useState(false);
  const [conversationName, setConversationName] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // Extrair o tema do ID do chat (formato: tema-uuid ou tema-composto-uuid)
  const extractThemeId = (chatId: string): string => {
    if (chatId.startsWith("tomada-decisao")) return "tomada-decisao";
    if (chatId.startsWith("espaco-livre")) return "espaco-livre";
    if (chatId.startsWith("relacionamento")) return "relacionamento";
    if (chatId.startsWith("familia")) return "familia";
    if (chatId.startsWith("trabalho")) return "trabalho";
    return chatId.split("-")[0];
  };
  
  const themeId = extractThemeId(activeTheme);
  
  // Verificar se é um chat de tema específico (relacionamento, família, trabalho, tomada-decisao)
  const isThemeChat = ["relacionamento", "familia", "trabalho", "tomada-decisao"].includes(themeId);
  
  // Verificar se é Espaço Livre
  const isEspacoLivre = themeId === "espaco-livre" || themeId === "espaco";
  
  // Verificar se é um chat iniciado por quiz ou reflexão (contém "quiz" ou "reflexao" no ID)
  const isQuizOrReflectionChat = activeTheme.includes("quiz") || activeTheme.includes("reflexao");
  
  // Mostrar opção de salvar para: Espaço Livre, Quizzes e Reflexões (mas NÃO para temas específicos)
  const canSaveConversation = (isEspacoLivre || isQuizOrReflectionChat) && !isThemeChat;
  
  const currentTheme = themeConfig[themeId] || {
    icon: MessageCircle,
    name: "Chat",
    color: "text-purple-400"
  };
  const ThemeIcon = currentTheme.icon;
  const themeName = currentTheme.name;
  const themeColor = currentTheme.color;
  const seedMessage = currentTheme.seedMessage;

  // Carregar avatar do usuário
  useEffect(() => {
    if (isDemo) return; // Não carregar avatar no modo demo
    
    const savedAvatar = localStorage.getItem("lumia-user-avatar");
    if (savedAvatar) {
      setUserAvatar(savedAvatar);
    }
  }, [isDemo]);

  // Carregar histórico do chat ativo (SEMPRE - persistência total)
  useEffect(() => {
    const loadHistory = async () => {
      if (!userId) return;

      setIsInitialized(false);

      // Para temas fixos, usar o themeId como conversationId (garantir 1 conversa por tema)
      const conversationId = isThemeChat ? themeId : activeTheme;

      // No modo demo, carregar mensagens salvas localmente se existirem
      if (isDemo) {
        const demoStorageKey = `demo-chat-${conversationId}`;
        const savedDemoChat = localStorage.getItem(demoStorageKey);

        if (savedDemoChat) {
          try {
            const parsed = JSON.parse(savedDemoChat);
            setMessages(parsed.messages || []);
            setIsInitialized(true);
            return;
          } catch (e) {
            console.error("Erro ao carregar chat demo:", e);
          }
        }

        // Se não há chat salvo, criar mensagem inicial
        let greeting = "";

        // ✅ FIX: Mensagem inicial do quiz APENAS para Espaço Livre
        if (initialMessage && isEspacoLivre) {
          greeting = initialMessage;
        } else {
          // Caso contrário, usar mensagem seed padrão do tema
          greeting = themeConfig[themeId]?.seedMessage || "Esse é seu espaço. Me conta o que você está sentindo.";
        }

        const initialMsg: Message = {
          role: "assistant",
          content: greeting,
          timestamp: new Date()
        };
        setMessages([initialMsg]);

        // Salvar mensagem inicial no localStorage do demo
        localStorage.setItem(demoStorageKey, JSON.stringify({ messages: [initialMsg] }));

        setIsInitialized(true);
        return;
      }

      // Carregar mensagens do banco ou localStorage
      const loadedMessages = await loadMessagesHybrid(conversationId, userId);
      
      if (loadedMessages.length > 0) {
        // Histórico existe - carregar tudo
        setMessages(loadedMessages);
        
        // Verificar se já está salvo (apenas para chats que podem ser salvos)
        if (canSaveConversation) {
          const storageKey = `lumia-saved-conversations-${userId}`;
          const savedConvs = localStorage.getItem(storageKey);
          if (savedConvs) {
            try {
              const parsed = JSON.parse(savedConvs);
              const conv = parsed.find((c: any) => c.id === conversationId);
              if (conv && conv.isSaved) {
                setIsSaved(true);
                setConversationName(conv.name || "");
              }
            } catch (e) {
              console.error("Erro ao verificar status de salvamento:", e);
            }
          }
        } else {
          // Chats de tema são sempre considerados salvos
          setIsSaved(true);
        }
      } else if (isThemeChat && seedMessage) {
        // Primeira vez no tema fixo - mostrar mensagem seed
        const initialMsg: Message = {
          role: "assistant",
          content: seedMessage,
          timestamp: new Date()
        };
        setMessages([initialMsg]);
        
        // Salvar mensagem seed
        await saveMessageHybrid(conversationId, userId, initialMsg, [initialMsg]);
        
        // Criar conversa no banco
        await saveConversation(conversationId, userId, themeId, themeName, true);
      } else if (initialMessage && isEspacoLivre) {
        // ✅ FIX: Mensagem inicial do quiz APENAS para Espaço Livre (primeira vez)
        const initialMsg: Message = {
          role: "assistant",
          content: initialMessage,
          timestamp: new Date()
        };
        setMessages([initialMsg]);
        
        // Salvar mensagem inicial
        await saveMessageHybrid(conversationId, userId, initialMsg, [initialMsg]);
      }

      setIsInitialized(true);
    };

    loadHistory();
  }, [activeTheme, userId, canSaveConversation, isThemeChat, themeId, seedMessage, themeName, isDemo, initialMessage, isEspacoLivre]);

  // Criar/atualizar conversa automaticamente para TODOS os tipos de chat
  useEffect(() => {
    if (isDemo) return; // Não salvar no modo demo
    
    if (messages.length > 0 && userId && isInitialized) {
      const conversationId = isThemeChat ? themeId : activeTheme;
      const chatName = isSaved ? conversationName || `Conversa em ${themeName}` : `Conversa em ${themeName}`;
      // Para temas específicos, sempre marcar como salvo
      // Para Espaço Livre, Quizzes e Reflexões, salvar mas não marcar como "saved" até usuário clicar
      saveConversation(conversationId, userId, themeId, chatName, isThemeChat);
    }
  }, [messages, activeTheme, userId, themeId, themeName, isThemeChat, isSaved, conversationName, isInitialized, isDemo]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

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
    if (isDemo && onDemoAction) {
      onDemoAction();
      return;
    }
    
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
    if (isDemo && onDemoAction) {
      onDemoAction();
      return;
    }
    
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
    if (isDemo && onDemoAction) {
      onDemoAction();
      return;
    }
    
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

    // MODO DEMO: Verificar limite de mensagens do usuário (padrão 5, ou customizado)
    if (isDemo) {
      const userMessageCount = messages.filter(m => m.role === "user").length;

      if (userMessageCount >= demoMessageLimit) {
        // Bloquear ao tentar enviar mensagem além do limite
        const context = isReflectionChat ? "reflexao-continue" : "chat-limit";
        if (onDemoAction) {
          onDemoAction(context);
        }
        return;
      }
    }


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

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    handleRemoveFile();
    setIsLoading(true);
    setIsTyping(true);

    // Para temas fixos, usar o themeId como conversationId
    const conversationId = isThemeChat ? themeId : activeTheme;

    // MODO DEMO: Salvar no localStorage
    if (isDemo) {
      const demoStorageKey = `demo-chat-${conversationId}`;
      localStorage.setItem(demoStorageKey, JSON.stringify({ messages: newMessages }));
    }

    // Salvar mensagem do usuário no banco E localStorage (SEMPRE) - Modo normal
    if (!isDemo && userId) {
      await saveMessageHybrid(conversationId, userId, userMessage, newMessages);

      // Criar conversa se não existir (para TODOS os tipos de chat)
      await saveConversation(conversationId, userId, themeId, `Conversa em ${themeName}`, isThemeChat);
    }

    try {
      const formData = new FormData();
      formData.append("messages", JSON.stringify(newMessages));
      formData.append("tabContext", themeId);
      if (userId) {
        formData.append("userId", userId);
      }
      
      if (selectedFile) {
        formData.append("file", selectedFile);
        formData.append("fileType", messageType);
      }

      const response = await fetch("/api/chat", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Erro na resposta da API");
      }

      const contentType = response.headers.get("content-type");
      
      if (contentType?.includes("text/event-stream")) {
        const reader = response.body?.getReader();
        const decoder = new TextDecoder();
        
        if (!reader) {
          throw new Error("Não foi possível ler o stream");
        }

        const naturalDelay = 1000 + Math.random() * 1000;
        await new Promise(resolve => setTimeout(resolve, naturalDelay));

        setIsTyping(false);

        const assistantMessage: Message = {
          role: "assistant",
          content: "",
          timestamp: new Date(),
          isStreaming: true,
        };

        setMessages((prev) => [...prev, assistantMessage]);
        const messageIndex = newMessages.length;

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
                setMessages((prev) => {
                  const newMessages = [...prev];
                  if (newMessages[messageIndex]) {
                    newMessages[messageIndex] = {
                      ...newMessages[messageIndex],
                      isStreaming: false,
                    };

                    // MODO DEMO: Salvar no localStorage
                    if (isDemo) {
                      const demoStorageKey = `demo-chat-${conversationId}`;
                      localStorage.setItem(demoStorageKey, JSON.stringify({ messages: newMessages }));
                    }

                    // Salvar mensagem da assistente no banco E localStorage (SEMPRE) - Modo normal
                    if (!isDemo && userId) {
                      saveMessageHybrid(conversationId, userId, newMessages[messageIndex], newMessages);
                    }
                  }
                  return newMessages;
                });
                break;
              }
              
              try {
                const parsed = JSON.parse(data);
                if (parsed.content) {
                  fullContent += parsed.content;
                  
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
        const data = await response.json();

        const naturalDelay = 1000 + Math.random() * 1000;
        await new Promise(resolve => setTimeout(resolve, naturalDelay));

        setIsTyping(false);

        const assistantMessage: Message = {
          role: "assistant",
          content: data.message || "Desculpe, não consegui processar sua mensagem. Pode tentar novamente?",
          timestamp: new Date(),
        };

        const finalMessages = [...newMessages, assistantMessage];
        setMessages(finalMessages);

        // MODO DEMO: Salvar no localStorage
        if (isDemo) {
          const demoStorageKey = `demo-chat-${conversationId}`;
          localStorage.setItem(demoStorageKey, JSON.stringify({ messages: finalMessages }));
        }

        // Salvar mensagem da assistente no banco E localStorage (SEMPRE) - Modo normal
        if (!isDemo && userId) {
          await saveMessageHybrid(conversationId, userId, assistantMessage, finalMessages);
        }
      }

    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);

      setIsTyping(false);

      const errorMessage: Message = {
        role: "assistant",
        content: "Tive um problema agora, mas já estou aqui de novo. Pode tentar mais uma vez?",
        timestamp: new Date(),
      };

      const finalMessages = [...newMessages, errorMessage];
      setMessages(finalMessages);

      // MODO DEMO: Salvar no localStorage
      if (isDemo) {
        const demoStorageKey = `demo-chat-${conversationId}`;
        localStorage.setItem(demoStorageKey, JSON.stringify({ messages: finalMessages }));
      }

      // Salvar mensagem de erro no banco E localStorage (SEMPRE) - Modo normal
      if (!isDemo && userId) {
        await saveMessageHybrid(conversationId, userId, errorMessage, finalMessages);
      }
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

  const handleClearHistory = () => {
    if (isDemo && onDemoAction) {
      onDemoAction();
      return;
    }
    
    if (confirm("Tem certeza que deseja limpar todo o histórico desta conversa? Esta ação não pode ser desfeita.")) {
      setMessages([]);
      const conversationId = isThemeChat ? themeId : activeTheme;
      const storageKey = userId ? `lumia-chat-history-${conversationId}-${userId}` : `lumia-chat-history-${conversationId}`;
      localStorage.removeItem(storageKey);
    }
  };

  const handleSaveConversation = () => {
    if (isDemo && onDemoAction) {
      onDemoAction();
      return;
    }
    
    if (messages.length === 0) {
      alert("Não há mensagens para salvar.");
      return;
    }
    setShowSaveDialog(true);
  };

  const handleConfirmSave = async () => {
    if (!conversationName.trim() || !userId) return;

    const conversationId = isThemeChat ? themeId : activeTheme;

    // Marcar como salva no banco
    await markConversationAsSaved(conversationId, userId, conversationName.trim());

    // Atualizar localStorage
    const storageKey = `lumia-saved-conversations-${userId}`;
    const savedConvs = localStorage.getItem(storageKey);
    let convList = [];
    
    if (savedConvs) {
      try {
        convList = JSON.parse(savedConvs);
      } catch (e) {
        convList = [];
      }
    }

    const convIndex = convList.findIndex((c: any) => c.id === conversationId);
    if (convIndex !== -1) {
      convList[convIndex].name = conversationName.trim();
      convList[convIndex].isSaved = true;
      convList[convIndex].updatedAt = new Date().toISOString();
    } else {
      convList.push({
        id: conversationId,
        name: conversationName.trim(),
        isSaved: true,
        themeId: themeId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    }

    localStorage.setItem(storageKey, JSON.stringify(convList));

    setIsSaved(true);
    setShowSaveDialog(false);
    setConversationName("");
    
    // Forçar reload da lista de conversas salvas
    window.dispatchEvent(new Event('storage'));
  };

  const handleBackClick = () => {
    // Lembrete de salvar APENAS para Espaço Livre, Quiz e Reflexão não salvos
    if (canSaveConversation && messages.length > 0 && !isSaved && !isDemo) {
      setShowExitWarning(true);
    } else {
      onBack?.();
    }
  };

  const handleExitWithoutSaving = () => {
    setShowExitWarning(false);
    onBack?.();
  };

  const handleSaveAndExit = async () => {
    setShowExitWarning(false);
    setShowSaveDialog(true);
  };

  return (
    <div className="flex flex-col h-full bg-[#1a1a1a]">
      {/* Header */}
      <div className="border-b border-gray-800 px-4 sm:px-6 py-3 flex items-center justify-between bg-[#212121]">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gray-800/50">
            <ThemeIcon className={`w-5 h-5 ${themeColor}`} />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-100">
              {isSaved && conversationName ? conversationName : themeName}
            </h2>
            <p className="text-xs text-gray-400">
              {isDemo ? "Modo demonstração" : isThemeChat ? "Conversa permanente" : isSaved ? "Conversa salva" : "Histórico automático"}
            </p>
          </div>
        </div>
        
        {!isDemo && (
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-gray-800">
                  <MoreVertical className="w-4 h-4 text-gray-400" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-[#212121] border-gray-800">
                {/* Botão Salvar (APENAS para Espaço Livre, Quizzes e Reflexões - NÃO para temas específicos) */}
                {canSaveConversation && !isSaved && messages.length > 0 && (
                  <DropdownMenuItem 
                    onClick={handleSaveConversation} 
                    className="text-purple-400 focus:text-purple-300 focus:bg-purple-900/20"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Salvar e nomear chat
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={handleClearHistory} className="text-red-400 focus:text-red-300 focus:bg-red-900/20">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Limpar histórico
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>

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
                        className="w-7 h-7 rounded-full object-cover ring-2 ring-gray-700"
                      />
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-gray-700 text-gray-300 flex items-center justify-center text-xs font-medium">
                        V
                      </div>
                    )}
                    {!isDemo && (
                      <>
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
                      </>
                    )}
                  </div>
                ) : (
                  <LumAvatar className="w-7 h-7" />
                )}
                <span className="text-sm font-medium text-gray-100">
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
                  <div className="flex items-center gap-2 mb-2 text-sm text-gray-400">
                    <Mic className="w-4 h-4" />
                    <span>Áudio enviado</span>
                  </div>
                )}
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p className="text-[15px] leading-[1.7] text-gray-100 whitespace-pre-wrap m-0">
                    {message.content}
                    {message.isStreaming && <span className="inline-block w-1 h-4 bg-purple-400 ml-1 animate-pulse"></span>}
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
                        className="h-8 px-2 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-800"
                      >
                        {copiedIndex === index ? (
                          <Check className="w-4 h-4 text-purple-400" />
                        ) : (
                          <Copy className="w-4 h-4 text-gray-400" />
                        )}
                      </Button>
                    )}
                    <span className="text-xs text-gray-500">
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
                <span className="text-sm font-medium text-gray-100">Lum</span>
              </div>
              <div className="ml-9">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Privacy Message */}
      <div className="border-t border-gray-800 bg-purple-500/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-2">
          <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
            <Shield className="w-3.5 h-3.5 text-purple-400" />
            <span>Suas conversas são privadas e seguras. Ninguém tem acesso ao que você escreve aqui.</span>
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-800 bg-[#212121]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4">
          {/* File Preview */}
          {(selectedFile || filePreview) && (
            <div className="mb-3 p-3 bg-purple-500/10 rounded-lg flex items-center gap-3 animate-fade-in border border-purple-500/20">
              {filePreview ? (
                <img src={filePreview} alt="Preview" className="w-12 h-12 rounded object-cover" />
              ) : (
                <div className="w-12 h-12 rounded bg-purple-500/20 flex items-center justify-center">
                  {selectedFile?.type.startsWith("audio/") ? (
                    <Mic className="w-5 h-5 text-purple-400" />
                  ) : (
                    <ImageIcon className="w-5 h-5 text-purple-400" />
                  )}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-100 truncate">
                  {selectedFile?.name}
                </p>
                <p className="text-xs text-gray-400">
                  {selectedFile?.type.startsWith("image/") ? "Imagem" : "Áudio"}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRemoveFile}
                className="hover:bg-purple-500/20"
              >
                <X className="w-4 h-4 text-gray-400" />
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
              onClick={() => isDemo && onDemoAction ? onDemoAction() : fileInputRef.current?.click()}
              disabled={isLoading || isRecording}
              className="h-10 w-10 rounded-lg hover:bg-gray-800 shrink-0"
            >
              <ImageIcon className="w-5 h-5 text-gray-400" />
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
              className={`h-10 w-10 rounded-lg hover:bg-gray-800 shrink-0 ${
                isRecording ? "bg-red-900/20" : ""
              }`}
            >
              <Mic className={`w-5 h-5 ${isRecording ? "text-red-400 animate-pulse" : "text-gray-400"}`} />
            </Button>

            {/* Text Input */}
            <div className="flex-1 relative">
              <Textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Digite sua mensagem..."
                className="min-h-[44px] max-h-[200px] resize-none border-gray-700 bg-gray-800 text-gray-100 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded-xl text-[15px] py-3 pr-12"
                disabled={isLoading}
              />
              <Button
                onClick={handleSend}
                disabled={(!input.trim() && !selectedFile) || isLoading}
                size="icon"
                className="absolute right-2 bottom-2 h-8 w-8 rounded-lg bg-purple-500 hover:bg-purple-600 text-white disabled:opacity-30 disabled:hover:bg-purple-500 shadow-sm"
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

      {/* Dialog para salvar conversa */}
      {!isDemo && (
        <>
          <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
            <DialogContent className="bg-[#212121] border-gray-800">
              <DialogHeader>
                <DialogTitle className="text-gray-100">Salvar e nomear chat</DialogTitle>
                <DialogDescription className="text-gray-400">
                  Dê um nome para esta conversa para encontrá-la facilmente depois.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <Input
                  value={conversationName}
                  onChange={(e) => setConversationName(e.target.value)}
                  placeholder="Ex: Desabafo de hoje, Sobre meu relacionamento..."
                  className="bg-gray-800 border-gray-700 text-gray-100"
                  autoFocus
                />
              </div>
              <DialogFooter>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setShowSaveDialog(false);
                    setConversationName("");
                  }}
                  className="text-gray-400 hover:text-gray-300"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleConfirmSave}
                  disabled={!conversationName.trim()}
                  className="bg-purple-500 hover:bg-purple-600 text-white"
                >
                  Salvar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Dialog de aviso ao sair sem salvar (APENAS Espaço Livre, Quiz e Reflexão) */}
          <Dialog open={showExitWarning} onOpenChange={setShowExitWarning}>
            <DialogContent className="bg-[#212121] border-gray-800">
              <DialogHeader>
                <DialogTitle className="text-gray-100 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-amber-400" />
                  Essa conversa será excluída se você não salvar
                </DialogTitle>
                <DialogDescription className="text-gray-400">
                  Você pode continuar essa conversa depois se salvar agora. Deseja salvar?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="gap-2">
                <Button
                  variant="ghost"
                  onClick={handleExitWithoutSaving}
                  className="text-gray-400 hover:text-gray-300"
                >
                  Não salvar
                </Button>
                <Button
                  onClick={handleSaveAndExit}
                  className="bg-purple-500 hover:bg-purple-600 text-white"
                >
                  Salvar e nomear
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  );
}
