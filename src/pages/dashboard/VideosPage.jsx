import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Upload, Search, Filter, Video as VideoIconLucide, PlayCircle, Download, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from "@/components/ui/use-toast";
import VideoPreviewModal from '@/components/VideoPreviewModal';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Share2, ExternalLink } from 'lucide-react';

const VideosPage = () => {
  const [videos, setVideos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newComment, setNewComment] = useState('');
  const [selectedVideoIdForComment, setSelectedVideoIdForComment] = useState(null);
  const [previewVideo, setPreviewVideo] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    const storedVideos = JSON.parse(localStorage.getItem('dashboard-videos')) || [];
    setVideos(storedVideos.map(v => ({...v, fileUrl: v.fileUrl || '#', source: v.source || 'local' })));
  }, []);

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
      localStorage.setItem('dashboard-videos', JSON.stringify(updatedVideos.map(v => ({...v, fileUrl: (v.source === 'local' && v.fileUrl.startsWith('blob:')) ? '#' : v.fileUrl }))));
      toast({ title: "Success", description: `${file.name} uploaded successfully.` });
    }
  };

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
    localStorage.setItem('dashboard-videos', JSON.stringify(updatedVideos.map(v => ({...v, fileUrl: (v.source === 'local' && v.fileUrl.startsWith('blob:')) ? '#' : v.fileUrl }))));
    setNewComment('');
    setSelectedVideoIdForComment(null);
    toast({ title: "Success", description: "Comment added." });
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
    } else {
      toast({ title: "Download Not Available", description: `No downloadable file for ${video.title}.`, variant: "destructive" });
    }
  };
  
  const handleSaveToCloud = (service) => {
    toast({
      title: `Save to ${service}`,
      description: `This feature to save directly to ${service} is coming soon!`,
    });
  };

  const filteredVideos = videos.filter(video =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row justify-between items-center gap-4"
      >
        <h1 className="text-3xl font-bold text-white">My Videos</h1>
        <div className="flex gap-2">
          <Button className="btn-primary" onClick={() => document.getElementById('videoUploadInput')?.click()}>
            <Upload size={18} className="mr-2" /> Upload Video
          </Button>
          <Input type="file" id="videoUploadInput" className="hidden" onChange={handleFileUpload} accept="video/*" />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search videos..."
            className="pl-10 bg-card border-white/10 text-white focus:ring-white/50"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="btn-outline">
          <Filter size={18} className="mr-2" /> Filter
        </Button>
      </motion.div>

      {filteredVideos.length === 0 && (
        <p className="text-muted-foreground text-center py-8">No videos found. Try adjusting your search or upload a new video.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map((video, index) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Card className="bg-card border-white/10 h-full flex flex-col">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-white text-lg truncate flex-grow" title={video.title}>
                    <VideoIconLucide className="inline-block mr-2 h-5 w-5 align-middle" />{video.title}
                  </CardTitle>
                   <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-white">
                        <Share2 size={16} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-card border-white/10 text-white">
                      <DropdownMenuItem onClick={() => handleSaveToCloud('Google Drive')} className="hover:bg-secondary/80 cursor-pointer">
                        <ExternalLink size={14} className="mr-2" /> Save to Google Drive
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleSaveToCloud('Dropbox')} className="hover:bg-secondary/80 cursor-pointer">
                         <ExternalLink size={14} className="mr-2" /> Save to Dropbox
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground">Status: {video.status}</p>
                <p className="text-sm text-muted-foreground">Uploaded: {new Date(video.uploadedAt).toLocaleDateString()}</p>
                <p className="text-xs text-gray-500">Source: {video.source || 'N/A'}</p>
                <div className="mt-2 space-y-1 max-h-20 overflow-y-auto">
                  {video.comments.map((comment, idx) => (
                    <p key={idx} className="text-xs text-gray-400 truncate"><strong>{comment.user}:</strong> {comment.text}</p>
                  ))}
                  {video.comments.length === 0 && <p className="text-xs text-gray-500">No comments yet.</p>}
                </div>
              </CardContent>
              <CardContent className="border-t border-white/10 pt-4">
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 flex-1" onClick={() => setPreviewVideo(video)}>
                    <PlayCircle size={16} className="mr-1.5"/> Preview
                  </Button>
                  <Button variant="outline" size="sm" className="btn-outline flex-1" onClick={() => handleDownloadVideo(video)}>
                    <Download size={16} className="mr-1.5"/> Download
                  </Button>
                </div>
                 <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 w-full mt-2" onClick={() => setSelectedVideoIdForComment(video.id)}>
                    <MessageSquare size={16} className="mr-1.5"/> 
                    {selectedVideoIdForComment === video.id ? 'Close Comments' : 'Add Comment'}
                </Button>
                {selectedVideoIdForComment === video.id && (
                  <div className="mt-3 space-y-2">
                    <Textarea
                      placeholder="Write your comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="bg-background border-white/20 text-white focus:ring-white/50 text-sm"
                    />
                    <Button onClick={() => handleAddComment(video.id)} className="btn-primary text-sm w-full">Submit Comment</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      {previewVideo && (
        <VideoPreviewModal 
          video={previewVideo} 
          isOpen={!!previewVideo} 
          onClose={() => setPreviewVideo(null)} 
        />
      )}
    </div>
  );
};

export default VideosPage;