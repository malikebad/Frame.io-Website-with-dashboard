import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Send, Paperclip, Smile } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from '@/contexts/AuthContext'; // To get current user's name

const ChatSupportPage = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const { user } = useAuth(); // Get user info
  const { toast } = useToast();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const storedMessages = JSON.parse(localStorage.getItem('dashboard-chat-messages')) || [];
    setMessages(storedMessages);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) {
      toast({ title: "Error", description: "Message cannot be empty.", variant: "destructive" });
      return;
    }
    const messageToSend = {
      id: Date.now(),
      user: user?.name || 'You', // Use authenticated user's name or default
      text: newMessage,
      timestamp: new Date().toISOString(),
      senderType: 'client' // 'client' or 'support'
    };
    const updatedMessages = [...messages, messageToSend];
    setMessages(updatedMessages);
    localStorage.setItem('dashboard-chat-messages', JSON.stringify(updatedMessages));
    setNewMessage('');
    
    // Simulate support reply
    setTimeout(() => {
        const supportReply = {
            id: Date.now() + 1,
            user: 'Support Agent',
            text: "Thanks for your message! We'll get back to you shortly.",
            timestamp: new Date().toISOString(),
            senderType: 'support'
        };
        const messagesWithReply = [...updatedMessages, supportReply];
        setMessages(messagesWithReply);
        localStorage.setItem('dashboard-chat-messages', JSON.stringify(messagesWithReply));
    }, 1500);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-[calc(100vh-10rem)] flex flex-col"> {/* Adjust height based on your layout */}
      <motion.h1 
        className="text-3xl font-bold text-white mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Chat Support
      </motion.h1>

      <Card className="bg-card border-white/10 flex-grow flex flex-col">
        <CardHeader>
          <CardTitle className="text-white">Live Chat with Support</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow overflow-y-auto p-4 space-y-4">
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div 
                key={msg.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className={`flex ${msg.senderType === 'client' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  msg.senderType === 'client' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-secondary text-gray-200 rounded-bl-none'
                }`}>
                  <p className="text-sm font-semibold">{msg.user}</p>
                  <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                  <p className="text-xs opacity-70 mt-1 text-right">{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </CardContent>
        <CardFooter className="p-4 border-t border-white/10">
          <div className="flex w-full items-center gap-2">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-white"><Paperclip size={20}/></Button>
            <Input 
              type="text"
              placeholder="Type your message..."
              className="flex-grow bg-background border-white/20 text-white focus:ring-white/50"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-white"><Smile size={20}/></Button>
            <Button className="btn-primary" onClick={handleSendMessage}><Send size={18}/></Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ChatSupportPage;