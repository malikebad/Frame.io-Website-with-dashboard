import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon, Users, MessageSquare, Upload } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"

const QuickActionsWidget = ({
  onFileUpload,
  onSendInvitation,
  onSendChatMessage,
}) => {
  const [date, setDate] = useState(new Date());
  const [invitationEmail, setInvitationEmail] = useState('');
  const [chatMessage, setChatMessage] = useState('');

  const handleInvitation = () => {
    onSendInvitation(invitationEmail);
    setInvitationEmail('');
  };

  const handleChat = () => {
    onSendChatMessage(chatMessage);
    setChatMessage('');
  };

  return (
    <div className="space-y-6">
       <Card className="bg-card border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center"><Upload className="mr-2 h-5 w-5"/>Upload New Video</CardTitle>
        </CardHeader>
        <CardContent>
          <Input type="file" onChange={onFileUpload} className="bg-background border-white/20 text-white file:text-white" accept="video/*"/>
          <p className="text-xs text-muted-foreground mt-2">Max file size: 5GB. Supported formats: MP4, MOV, AVI.</p>
        </CardContent>
      </Card>
      <Card className="bg-card border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center"><CalendarIcon className="mr-2 h-5 w-5"/>Project Calendar</CardTitle>
        </CardHeader>
        <CardContent>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className="w-full justify-start text-left font-normal btn-outline"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-card border-white/10 text-white" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                className="[&_button]:text-white [&_button:hover]:bg-secondary/80 [&_button[aria-selected]]:bg-secondary"
              />
            </PopoverContent>
          </Popover>
          <div className="mt-4 space-y-2">
            <p className="text-sm text-muted-foreground">No events for selected date.</p>
            <Link to="/dashboard/calendar" className="text-sm text-white hover:underline">View Full Calendar</Link>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-card border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center"><Users className="mr-2 h-5 w-5"/>Team Invitations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Input
            type="email"
            placeholder="Invite by email"
            className="bg-background border-white/20 text-white focus:ring-white/50"
            value={invitationEmail}
            onChange={(e) => setInvitationEmail(e.target.value)}
          />
          <Button className="w-full btn-secondary" onClick={handleInvitation}>Send Invitation</Button>
          <Link to="/dashboard/invitations" className="text-sm text-white hover:underline block text-center mt-2">Manage Invitations</Link>
        </CardContent>
      </Card>
      <Card className="bg-card border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center"><MessageSquare className="mr-2 h-5 w-5"/>Chat Support</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Type your message to support..."
            rows={3}
            className="bg-background border-white/20 text-white focus:ring-white/50"
            value={chatMessage}
            onChange={(e) => setChatMessage(e.target.value)}
          />
          <Button className="w-full mt-3 btn-secondary" onClick={handleChat}>Send Message</Button>
          <Link to="/dashboard/chat" className="text-sm text-white hover:underline block text-center mt-2">Open Chat</Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuickActionsWidget;