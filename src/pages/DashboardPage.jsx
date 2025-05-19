import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { Calendar as CalendarIcon, MessageSquare, Upload, Download, Mail, Users, Video } from "lucide-react"
import { motion } from 'framer-motion';
import { useToast } from "@/components/ui/use-toast";


const initialVideos = [
  { id: 1, title: 'Project Alpha - Final Cut', client: 'Client A', status: 'Delivered', comments: [{ user: 'Client A', text: 'Looks great!' }], uploadedAt: '2025-05-10T10:00:00Z' },
  { id: 2, title: 'Marketing Campaign - Version 2', client: 'Client B', status: 'Pending Review', comments: [], uploadedAt: '2025-05-15T14:30:00Z' },
];

const DashboardPage = () => {
  const [videos, setVideos] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [selectedVideoId, setSelectedVideoId] = useState(null);
  const [date, setDate] = useState(new Date());
  const { toast } = useToast();

  useEffect(() => {
    const storedVideos = JSON.parse(localStorage.getItem('dashboard-videos'));
    if (storedVideos && storedVideos.length > 0) {
      setVideos(storedVideos);
    } else {
      setVideos(initialVideos);
      localStorage.setItem('dashboard-videos', JSON.stringify(initialVideos));
    }
  }, []);

  const handleAddComment = (videoId) => {
    if (!newComment.trim()) {
      toast({ title: "Error", description: "Comment cannot be empty.", variant: "destructive" });
      return;
    }
    const updatedVideos = videos.map(video =>
      video.id === videoId
        ? { ...video, comments: [...video.comments, { user: 'Current Client', text: newComment }] }
        : video
    );
    setVideos(updatedVideos);
    localStorage.setItem('dashboard-videos', JSON.stringify(updatedVideos));
    setNewComment('');
    setSelectedVideoId(null);
    toast({ title: "Success", description: "Comment added."});
  };
  
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const newVideo = {
        id: videos.length + 1,
        title: file.name,
        client: 'Current Client', 
        status: 'Uploaded',
        comments: [],
        uploadedAt: new Date().toISOString(),
      };
      const updatedVideos = [...videos, newVideo];
      setVideos(updatedVideos);
      localStorage.setItem('dashboard-videos', JSON.stringify(updatedVideos));
      toast({ title: "Success", description: `${file.name} uploaded successfully.`});
    }
  };

  const MotionCard = motion(Card);

  return (
    <div className="space-y-8">
      <motion.h1 
        className="text-3xl font-bold text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Client Dashboard
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <MotionCard 
          className="bg-card border-white/10"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Videos</CardTitle>
            <Video className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{videos.length}</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </MotionCard>

        <MotionCard 
          className="bg-card border-white/10"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Reviews</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{videos.filter(v => v.status === 'Pending Review').length}</div>
            <p className="text-xs text-muted-foreground">Awaiting your feedback</p>
          </CardContent>
        </MotionCard>

         <MotionCard 
          className="bg-card border-white/10"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Upcoming Deadlines</CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">3</div>
            <p className="text-xs text-muted-foreground">Within next 7 days</p>
          </CardContent>
        </MotionCard>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          className="lg:col-span-2 space-y-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="bg-card border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Video Projects</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {videos.map(video => (
                <div key={video.id} className="p-4 bg-secondary/50 rounded-md border border-white/10">
                  <h3 className="text-lg font-semibold text-white">{video.title}</h3>
                  <p className="text-sm text-muted-foreground">Status: {video.status} | Uploaded: {new Date(video.uploadedAt).toLocaleDateString()}</p>
                  <div className="mt-2 space-y-1">
                    {video.comments.map((comment, index) => (
                      <p key={index} className="text-xs text-gray-400"><strong>{comment.user}:</strong> {comment.text}</p>
                    ))}
                  </div>
                  <div className="mt-3">
                    <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 mr-2" onClick={() => setSelectedVideoId(video.id)}>Add Comment</Button>
                    <Button variant="outline" size="sm" className="btn-outline">Download</Button>
                  </div>
                  {selectedVideoId === video.id && (
                    <div className="mt-3 space-y-2">
                      <Textarea
                        placeholder="Write your comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="bg-background border-white/20 text-white focus:ring-white/50"
                      />
                      <Button onClick={() => handleAddComment(video.id)} className="btn-primary text-sm">Submit Comment</Button>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
           <Card className="bg-card border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center"><Upload className="mr-2 h-5 w-5"/>Upload New Video</CardTitle>
            </CardHeader>
            <CardContent>
              <Input type="file" onChange={handleFileUpload} className="bg-background border-white/20 text-white file:text-white"/>
              <p className="text-xs text-muted-foreground mt-2">Max file size: 5GB. Supported formats: MP4, MOV, AVI.</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
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
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-white/10">
            <CardHeader>
                <CardTitle className="text-white flex items-center"><Users className="mr-2 h-5 w-5"/>Team Invitations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                <Input type="email" placeholder="Invite by email" className="bg-background border-white/20 text-white focus:ring-white/50" />
                <Button className="w-full btn-secondary">Send Invitation</Button>
                <p className="text-xs text-muted-foreground">Invite team members or clients to collaborate.</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center"><MessageSquare className="mr-2 h-5 w-5"/>Chat Support</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea placeholder="Type your message to support..." rows={3} className="bg-background border-white/20 text-white focus:ring-white/50" />
              <Button className="w-full mt-3 btn-secondary">Send Message</Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardPage;