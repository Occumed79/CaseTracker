import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import { Send, Paperclip, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const initialMessages = [
  { id: 1, text: "Hi Alex, we've reviewed your initial medical packet. The reviewing physician has requested some additional information regarding your cardiology history.", sender: "admin", time: "10:00 AM", date: "May 10" },
  { id: 2, text: "Okay, what specifically do they need?", sender: "applicant", time: "10:15 AM", date: "May 10" },
  { id: 3, text: "They need a clearance letter from your cardiologist stating you have no restrictions, along with your last 30 days of blood pressure logs. You can upload these in the Uploads tab.", sender: "admin", time: "10:20 AM", date: "May 10" },
];

export default function Messages() {
  const { role } = useAuth();
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    setMessages([...messages, {
      id: Date.now(),
      text: newMessage,
      sender: role as string,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: "Today"
    }]);
    setNewMessage("");
  };

  return (
    <div className="h-full flex flex-col pt-4">
      <div className="px-4 pb-2 border-b border-white/10 shrink-0">
        <h1 className="text-xl font-bold text-white">Messages</h1>
        <p className="text-xs text-primary">{role === 'applicant' ? 'Morgan (Case Manager)' : 'Alex (Applicant)'}</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="text-center">
          <span className="text-[10px] text-white/40 uppercase font-bold tracking-wider bg-black/20 px-3 py-1 rounded-full">May 10, 2026</span>
        </div>
        
        {messages.map((msg, i) => {
          const isMe = msg.sender === role;
          return (
            <motion.div 
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-2 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {!isMe && (
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 border border-white/10">
                  {msg.sender === 'admin' ? <img src="/occu-med-logo.png" className="w-5 h-5" alt="Logo" /> : <User className="w-4 h-4 text-white/60" />}
                </div>
              )}
              <div className={`max-w-[75%] ${isMe ? 'items-end' : 'items-start'} flex flex-col`}>
                <div className={`p-3 rounded-2xl text-sm ${isMe ? 'bg-primary text-primary-foreground rounded-tr-sm glow-blue' : 'glass-card border-white/10 text-white rounded-tl-sm'}`}>
                  {msg.text}
                </div>
                <span className="text-[10px] text-white/40 mt-1 px-1">{msg.time}</span>
              </div>
            </motion.div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      <div className="p-3 border-t border-white/10 glass-card mb-safe shrink-0">
        <form onSubmit={handleSend} className="flex items-center gap-2">
          <Button type="button" variant="ghost" size="icon" className="shrink-0 text-white/50 hover:text-white hover:bg-white/10 rounded-full">
            <Paperclip className="w-5 h-5" />
          </Button>
          <Input 
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..." 
            className="flex-1 bg-black/20 border-white/10 rounded-full h-10 px-4 text-white focus-visible:ring-primary"
          />
          <Button type="submit" size="icon" className="shrink-0 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full h-10 w-10 glow-blue">
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
