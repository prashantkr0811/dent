// import { GoogleGenerativeAI } from "@google/generative-ai";

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

// const MODEL_NAME = "gemini-1.5-pro";

// const systemPrompt = `You are DentWise, an AI dental assistant. Your role is to provide helpful, accurate, and empathetic dental health advice. 
// You should:
// - Answer questions about oral health, dental hygiene, common dental problems, and treatments
// - Provide general guidance and information (not a substitute for professional dental care)
// - Be friendly, encouraging, and supportive
// - Always recommend seeing a dentist for serious concerns or persistent issues
// - Ask clarifying questions when needed to give better advice
// - Maintain a conversational and helpful tone`;

// interface Message {
//   role: "user" | "assistant";
//   content: string;
// }

// class GeminiDentalChat {
//   private chat: any;
//   private conversationHistory: Message[] = [];

//   constructor() {
//     const model = genAI.getGenerativeModel({ model: MODEL_NAME });
//     this.chat = model.startChat({
//       history: [],
//       generationConfig: {
//         maxOutputTokens: 500,
//         temperature: 0.7,
//       },
//     });
//   }

//   async sendMessage(userMessage: string): Promise<string> {
//     try {
//       // Add system prompt context to the first message
//       let messageToSend = userMessage;
//       if (this.conversationHistory.length === 0) {
//         messageToSend = `${systemPrompt}\n\nUser: ${userMessage}`;
//       }

//       const result = await this.chat.sendMessage(messageToSend);
//       const assistantMessage = result.response.text();

//       // Store conversation history
//       this.conversationHistory.push({
//         role: "user",
//         content: userMessage,
//       });
//       this.conversationHistory.push({
//         role: "assistant",
//         content: assistantMessage,
//       });

//       return assistantMessage;
//     } catch (error) {
//       console.error("Error sending message to Gemini:", error);
//       throw error;
//     }
//   }

//   getHistory(): Message[] {
//     return this.conversationHistory;
//   }

//   clearHistory(): void {
//     this.conversationHistory = [];
//   }
// }

// export const createGeminiChat = () => new GeminiDentalChat();
