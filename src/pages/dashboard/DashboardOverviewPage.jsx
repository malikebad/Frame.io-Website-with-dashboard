import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useToast } from "@/components/ui/use-toast";
import DashboardStats from '@/components/dashboard/overview/DashboardStats';
import RecentVideos from '@/components/dashboard/overview/RecentVideos';
import QuickActionsWidget from '@/components/dashboard/overview/QuickActionsWidget';

const initialVideosData = [
  { id: 1, title: 'Project Alpha - Final Cut', client: 'Client A', status: 'Delivered', comments: [{ user: 'Client A', text: 'Looks great!' }], uploadedAt: '2025-05-10T10:00:00Z', fileUrl: '#', source: 'local' },
  { id: 2, title: 'Marketing Campaign - Version 2', client: 'Client B', status: 'Pending Review', comments: [], uploadedAt: '2025-05-15T14:30:00Z', fileUrl: '#', source: 'local' },
];

const DashboardOverviewPage = () => {
  const [videos, setVideos] = useState([]);
  const { toast } = useToast();

  useEffect(() => {
    const storedVideos = JSON.parse(localStorage.getItem('dashboard-videos'));
    if (storedVideos && storedVideos.length > 0) {
      setVideos(storedVideos.map(v => ({...v, fileUrl: (v.source === 'local' && v.fileUrl && v.fileUrl.startsWith('blob:')) ? '#' : (v.fileUrl || '#'), source: v.source || 'local' })));
    } else {
      setVideos(initialVideosData);
      localStorage.setItem('dashboard-videos', JSON.stringify(initialVideosData));
    }
  }, []);

  const updateLocalStorageVideos = (updatedVideos) => {
     localStorage.setItem('dashboard-videos', JSON.stringify(updatedVideos.map(v => ({...v, fileUrl: (v.source === 'local' && v.fileUrl && v.fileUrl.startsWith('blob:')) ? '#' : v.fileUrl }))));
  };

  const handleAddComment = (videoId, commentText) => {
    const updatedVideos = videos.map(video =>
      video.id === videoId
        ? { ...video, comments: [...video.comments, { user: 'Current Client', text: commentText }] }
        : video
    );
    setVideos(updatedVideos);
    updateLocalStorageVideos(updatedVideos);
    toast({ title: "Success", description: "Comment added." });
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const newVideo = {
        id: videos.length > 0 ? Math.max(...videos.map(v => v.id)) + 1 : 1,
        title: file.name,
        client: 'Current Client',
        status: 'Uploaded',
        comments: [],
        uploadedAt: new Date().toISOString(),
        fileUrl: URL.createObjectURL(file), 
        source: 'local',
      };
      const updatedVideos = [...videos, newVideo];
      setVideos(updatedVideos);
      updateLocalStorageVideos(updatedVideos);
      toast({ title: "Success", description: `${file.name} uploaded successfully.` });
    }
  };

  const handleDownloadVideo = (video) => {
    if (video.fileUrl && video.fileUrl !== '#' && video.fileUrl.startsWith('blob:')) {
      const a = document.createElement('a');
      a.href = video.fileUrl;
      a.download = video.title;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      toast({ title: "Download Started", description: `Downloading ${video.title}.` });
    } else if (video.fileUrl && video.fileUrl !== '#') {
       window.open(video.fileUrl, '_blank');
       toast({ title: "Download Started", description: `Downloading ${video.title}. This is a demo external link.` });
    }
     else {
      toast({ title: "Download Not Available", description: `No downloadable file for ${video.title}.`, variant: "destructive" });
    }
  };

  const handleSendInvitation = (email) => {
    if (!email.trim() || !email.includes('@')) {
      toast({ title: "Error", description: "Please enter a valid email address.", variant: "destructive" });
      return;
    }
    const invitations = JSON.parse(localStorage.getItem('dashboard-invitations')) || [];
    invitations.push({ email, date: new Date().toISOString(), status: 'Pending' });
    localStorage.setItem('dashboard-invitations', JSON.stringify(invitations));
    toast({ title: "Success", description: `Invitation sent to ${email}.` });
  };

  const handleSendChatMessage = (message) => {
    if (!message.trim()) {
      toast({ title: "Error", description: "Chat message cannot be empty.", variant: "destructive" });
      return;
    }
    const messages = JSON.parse(localStorage.getItem('dashboard-chat-messages')) || [];
    messages.push({ user: 'Current Client', text: message, date: new Date().toISOString() });
    localStorage.setItem('dashboard-chat-messages', JSON.stringify(messages));
    toast({ title: "Success", description: "Chat message sent." });
  };

  return (
    <div className="space-y-8">
      <motion.h1
        className="text-3xl font-bold text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Dashboard Overview
      </motion.h1>

      <DashboardStats
        videosCount={videos.length}
        pendingReviewsCount={videos.filter(v => v.status === 'Pending Review').length}
        upcomingDeadlinesCount={3} // Placeholder
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          className="lg:col-span-2 space-y-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <RecentVideos
            videos={videos}
            onCommentSubmit={handleAddComment}
            onVideoDownload={handleDownloadVideo}
          />
        </motion.div>

        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <QuickActionsWidget
            onFileUpload={handleFileUpload}
            onSendInvitation={handleSendInvitation}
            onSendChatMessage={handleSendChatMessage}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardOverviewPage;