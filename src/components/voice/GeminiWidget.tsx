// "use client";

// import { useUser } from "@clerk/nextjs";
// import { useEffect, useRef, useState } from "react";
// import { Card } from "../ui/card";
// import Image from "next/image";
// import { Button } from "../ui/button";
// import { Input } from "../ui/input";
// import { Send } from "lucide-react";

// interface Message {
//   id: string;
//   content: string;
//   role: "user" | "assistant";
//   timestamp: Date;
// }

// function GeminiWidget() {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [inputValue, setInputValue] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [sessionActive, setSessionActive] = useState(false);
//   const [sessionEnded, setSessionEnded] = useState(false);

//   const { user, isLoaded } = useUser();
//   const messageContainerRef = useRef<HTMLDivElement | null>(null);

//   // Auto-scroll for messages
//   useEffect(() => {
//     if (messageContainerRef.current) {
//       messageContainerRef.current.scrollTop =
//         messageContainerRef.current.scrollHeight;
//     }
//   }, [messages]);

//   const sendMessage = async () => {
//     if (!inputValue.trim()) return;

//     const userMessage: Message = {
//       id: `${Date.now()}-user`,
//       content: inputValue,
//       role: "user",
//       timestamp: new Date(),
//     };

//     setMessages((prev) => [...prev, userMessage]);
//     setInputValue("");
//     setIsLoading(true);

//     try {
//       const response = await fetch("/api/gemini-chat", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           message: inputValue,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to get response from Gemini");
//       }

//       const data = await response.json();

//       const assistantMessage: Message = {
//         id: `${Date.now()}-assistant`,
//         content: data.reply,
//         role: "assistant",
//         timestamp: new Date(),
//       };

//       setMessages((prev) => [...prev, assistantMessage]);
//     } catch (error) {
//       console.error("Error sending message:", error);
//       const errorMessage: Message = {
//         id: `${Date.now()}-error`,
//         content:
//           "Sorry, I encountered an error. Please try again later.",
//         role: "assistant",
//         timestamp: new Date(),
//       };
//       setMessages((prev) => [...prev, errorMessage]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const toggleSession = () => {
//     if (sessionActive) {
//       setSessionActive(false);
//       setSessionEnded(true);
//       setMessages([]);
//     } else {
//       setSessionActive(true);
//       setSessionEnded(false);
//       setMessages([]);

//       // Initial greeting
//       const greeting: Message = {
//         id: `${Date.now()}-greeting`,
//         content: "Hello! I'm DentWise, your AI dental assistant. How can I help you with your dental health today?",
//         role: "assistant",
//         timestamp: new Date(),
//       };
//       setMessages([greeting]);
//     }
//   };

//   if (!isLoaded) return null;

//   const userImage = user?.imageUrl || "/logo.png";

//   return (
//     <div className="max-w-5xl mx-auto px-4 flex flex-col overflow-hidden pb-20">
//       {/* TITLE */}
//       <div className="text-center mb-8">
//         <h1 className="text-3xl font-bold font-mono">
//           <span>Chat with Your </span>
//           <span className="text-primary uppercase">AI Dental Assistant</span>
//         </h1>
//         <p className="text-muted-foreground mt-2">
//           Ask questions about dental health, treatments, and oral hygiene
//         </p>
//       </div>

//       {/* CHAT AREA */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//         {/* AI ASSISTANT CARD */}
//         <Card className="bg-card/90 backdrop-blur-sm border border-border overflow-hidden">
//           <div className="aspect-video flex flex-col items-center justify-center p-6 relative">
//             {/* AI LOGO */}
//             <div className="relative size-32 mb-4">
//               <div
//                 className={`absolute inset-0 bg-primary opacity-10 rounded-full blur-lg ${
//                   isLoading ? "animate-pulse" : ""
//                 }`}
//               />

//               <div className="relative w-full h-full rounded-full bg-card flex items-center justify-center border border-border overflow-hidden">
//                 <div className="absolute inset-0 bg-linear-to-b from-primary/10 to-primary/5" />
//                 <Image
//                   src="/logo.png"
//                   alt="AI Dental Assistant"
//                   width={80}
//                   height={80}
//                   className="w-20 h-20 object-contain"
//                 />
//               </div>
//             </div>

//             <h2 className="text-xl font-bold text-foreground">DentWise AI</h2>
//             <p className="text-sm text-muted-foreground mt-1">Powered by Google Gemini</p>

//             {/* STATUS INDICATOR */}
//             <div
//               className={`mt-4 flex items-center gap-2 px-3 py-1 rounded-full bg-card border border-border ${
//                 sessionActive ? "border-primary" : ""
//               }`}
//             >
//               <div
//                 className={`w-2 h-2 rounded-full ${
//                   sessionActive
//                     ? "bg-primary animate-pulse"
//                     : "bg-muted"
//                 }`}
//               />
//               <span className="text-xs text-muted-foreground">
//                 {sessionActive
//                   ? "Ready to chat"
//                   : sessionEnded
//                   ? "Session ended"
//                   : "Offline"}
//               </span>
//             </div>
//           </div>
//         </Card>

//         {/* USER CARD */}
//         <Card className="bg-card/90 backdrop-blur-sm border overflow-hidden">
//           <div className="aspect-video flex flex-col items-center justify-center p-6 relative">
//             {/* User Image */}
//             <div className="relative size-32 mb-4">
//               <Image
//                 src={userImage}
//                 alt="User"
//                 width={128}
//                 height={128}
//                 className="rounded-full object-cover"
//               />
//             </div>

//             <h2 className="text-xl font-bold text-foreground">You</h2>
//             <p className="text-sm text-muted-foreground mt-1">
//               {user
//                 ? (user.firstName + " " + (user.lastName || "")).trim()
//                 : "Guest"}
//             </p>

//             {/* User Ready Text */}
//             <div className="mt-4 flex items-center gap-2 px-3 py-1 rounded-full bg-card border">
//               <div className="w-2 h-2 rounded-full bg-muted" />
//               <span className="text-xs text-muted-foreground">Ready</span>
//             </div>
//           </div>
//         </Card>
//       </div>

//       {/* MESSAGE CONTAINER */}
//       {messages.length > 0 && (
//         <div
//           ref={messageContainerRef}
//           className="w-full bg-card/90 backdrop-blur-sm border border-border rounded-xl p-4 mb-6 h-80 overflow-y-auto transition-all duration-300 scroll-smooth"
//         >
//           <div className="space-y-4">
//             {messages.map((msg) => (
//               <div key={msg.id} className="message-item animate-in fade-in duration-300">
//                 <div className="flex gap-3">
//                   {msg.role === "assistant" && (
//                     <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
//                       <div className="w-2 h-2 rounded-full bg-primary" />
//                     </div>
//                   )}
//                   <div className="flex-1">
//                     <p className="font-semibold text-xs text-muted-foreground mb-1">
//                       {msg.role === "assistant" ? "DentWise AI" : "You"}
//                     </p>
//                     <p className="text-foreground text-sm leading-relaxed">
//                       {msg.content}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             ))}

//             {isLoading && (
//               <div className="flex gap-3">
//                 <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
//                   <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
//                 </div>
//                 <div className="text-muted-foreground text-sm">Thinking...</div>
//               </div>
//             )}

//             {sessionEnded && (
//               <div className="message-item animate-in fade-in duration-300">
//                 <p className="text-xs text-muted-foreground text-center py-4">
//                   Session ended. Thank you for using DentWise AI!
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       {/* INPUT AREA */}
//       {sessionActive && !sessionEnded && (
//         <div className="w-full flex gap-2 mb-6">
//           <Input
//             type="text"
//             placeholder="Ask me anything about dental health..."
//             value={inputValue}
//             onChange={(e) => setInputValue(e.target.value)}
//             onKeyPress={(e) => e.key === "Enter" && sendMessage()}
//             disabled={isLoading}
//             className="flex-1"
//           />
//           <Button
//             onClick={sendMessage}
//             disabled={isLoading || !inputValue.trim()}
//             size="icon"
//             className="bg-primary hover:bg-primary/90"
//           >
//             <Send className="w-4 h-4" />
//           </Button>
//         </div>
//       )}

//       {/* CALL CONTROLS */}
//       <div className="w-full flex justify-center gap-4">
//         <Button
//           className={`w-44 text-xl rounded-3xl ${
//             sessionActive
//               ? "bg-destructive hover:bg-destructive/90"
//               : sessionEnded
//               ? "bg-gray-500 hover:bg-gray-600"
//               : "bg-primary hover:bg-primary/90"
//           } text-white`}
//           onClick={toggleSession}
//           disabled={isLoading}
//         >
//           {sessionActive ? "End Session" : sessionEnded ? "Session Ended" : "Start Chat"}
//         </Button>
//       </div>
//     </div>
//   );
// }

// export default GeminiWidget;
