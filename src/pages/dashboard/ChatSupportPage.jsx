import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Send, Paperclip, Smile } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from '@/contexts/AuthContext'; // To get current user's name

// Utility to load/save chat data grouped by client
const loadAllChats = () => JSON.parse(localStorage.getItem('dashboard-chat-messages-v2')) || {};
const saveAllChats = (chats) => localStorage.setItem('dashboard-chat-messages-v2', JSON.stringify(chats));

/** Client chat window: only sees their own chat */
function ClientChat({ clientEmail, user }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const { toast } = useToast();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const allChats = loadAllChats();
    setMessages(allChats[clientEmail] || []);
  }, [clientEmail]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) {
      toast({ title: "Error", description: "Message cannot be empty.", variant: "destructive" });
      return;
    }
    const msg = {
      id: Date.now(),
      user: user?.name || 'You',
      text: newMessage,
      timestamp: new Date().toISOString(),
      senderType: 'client'
    };
    const allChats = loadAllChats();
    const updated = [...(allChats[clientEmail] || []), msg];
    allChats[clientEmail] = updated;
    saveAllChats(allChats);
    setMessages(updated);
    setNewMessage('');

    // Simulate support reply
    setTimeout(() => {
      const reply = {
        id: Date.now() + 1,
        user: 'Support Agent',
        text: "Thanks for your message! We'll get back to you shortly.",
        timestamp: new Date().toISOString(),
        senderType: 'support'
      };
      const allChats2 = loadAllChats();
      const updated2 = [...(allChats2[clientEmail] || []), reply];
      allChats2[clientEmail] = updated2;
      saveAllChats(allChats2);
      setMessages(updated2);
    }, 1500);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-[calc(100vh-10rem)] flex flex-col">
      <motion.h1 
        className="text-3xl font-bold text-white mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >Chat Support</motion.h1>
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
}

/** Support dashboard: see all clients, chat with any */
function SupportChatDashboard({ user }) {
  const [clientList, setClientList] = useState([]);
  const [selectedClient, setSelectedClient] = useState('');
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const { toast } = useToast();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const allChats = loadAllChats();
    setClientList(Object.keys(allChats));
    // Auto select first client if none selected
    if (Object.keys(allChats).length && !selectedClient) {
      setSelectedClient(Object.keys(allChats)[0]);
    }
  }, []);

  useEffect(() => {
    if (selectedClient) {
      const allChats = loadAllChats();
      setMessages(allChats[selectedClient] || []);
    }
  }, [selectedClient]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) {
      toast({ title: "Error", description: "Message cannot be empty.", variant: "destructive" });
      return;
    }
    if (!selectedClient) return;
    const msg = {
      id: Date.now(),
      user: user?.name || 'Support Agent',
      text: newMessage,
      timestamp: new Date().toISOString(),
      senderType: 'support'
    };
    const allChats = loadAllChats();
    const updated = [...(allChats[selectedClient] || []), msg];
    allChats[selectedClient] = updated;
    saveAllChats(allChats);
    setMessages(updated);
    setNewMessage('');
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-[calc(100vh-10rem)] flex flex-col">
      <motion.h1 
        className="text-3xl font-bold text-white mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >Support Chat Dashboard</motion.h1>
      <div className="flex flex-row h-full gap-4">
        <div className="w-64 bg-card border-white/10 rounded-lg p-4 flex-shrink-0">
          <h2 className="font-bold text-lg mb-2 text-white">Clients</h2>
          <ul>
            {clientList.length === 0 && <li className="text-gray-400">No clients yet</li>}
            {clientList.map(email => (
              <li key={email}>
                <button
                  className={`block w-full text-left px-2 py-1 rounded ${
                    selectedClient === email ? 'bg-blue-700 text-white' : 'hover:bg-secondary/30 text-gray-200'
                  }`}
                  onClick={() => setSelectedClient(email)}
                >
                  {email}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <Card className="flex-grow flex flex-col bg-card border-white/10">
          <CardHeader>
            <CardTitle className="text-white">
              {selectedClient ? `Chat with ${selectedClient}` : "Select a client"}
            </CardTitle>
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
                disabled={!selectedClient}
              />
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-white"><Smile size={20}/></Button>
              <Button className="btn-primary" onClick={handleSendMessage} disabled={!selectedClient}><Send size={18}/></Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

const ChatSupportPage = () => {
  const { user } = useAuth();

  if (!user) return <div>Loading...</div>;

  if (user.role === 'client') {
    return <ClientChat clientEmail={user.email} user={user} />;
  } else if (user.role === 'superadmin' || user.role === 'subadmin') {
    return <SupportChatDashboard user={user} />;
  } else {
    return <div>Access denied</div>;
  }
};

export default ChatSupportPage;
