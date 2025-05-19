import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { PlayCircle, Download as DownloadIcon, MessageSquare } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import VideoPreviewModal from '@/components/VideoPreviewModal';

const RecentVideos = ({ videos, onCommentSubmit, onVideoDownload }) => {
  const { toast } = useToast();
  const [newComment, setNewComment] = useState('');
  const [selectedVideoIdForComment, setSelectedVideoIdForComment] = useState(null);
  const [previewVideo, setPreviewVideo] = useState(null);

  const handleAddComment = (videoId) => {
    if (!newComment.trim()) {
      toast({ title: "Error", description: "Comment cannot be empty.", variant: "destructive" });
      return;
    }
    onCommentSubmit(videoId, newComment);
    setNewComment('');
    setSelectedVideoIdForComment(null);
  };

  return (
    <>
      <Card className="bg-card border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Recent Video Projects</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {videos.slice(0, 3).map(video => (
            <div key={video.id} className="p-4 bg-secondary/50 rounded-md border border-white/10">
              <h3 className="text-lg font-semibold text-white">{video.title}</h3>
              <p className="text-sm text-muted-foreground">Status: {video.status} | Uploaded: {new Date(video.uploadedAt).toLocaleDateString()}</p>
              <div className="mt-2 space-y-1 max-h-20 overflow-y-auto">
                {video.comments.map((comment, index) => (
                  <p key={index} className="text-xs text-gray-400"><strong>{comment.user}:</strong> {comment.text}</p>
                ))}
                 {video.comments.length === 0 && <p className="text-xs text-gray-500">No comments yet.</p>}
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/10" onClick={() => setPreviewVideo(video)}>
                   <PlayCircle size={16} className="mr-1.5"/> Preview
                </Button>
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/10" onClick={() => setSelectedVideoIdForComment(prevId => prevId === video.id ? null : video.id)}>
                  <MessageSquare size={16} className="mr-1.5"/> 
                  {selectedVideoIdForComment === video.id ? 'Hide Comment' : 'Add Comment'}
                </Button>
                <Button variant="outline" size="sm" className="btn-outline" onClick={() => onVideoDownload(video)}>
                  <DownloadIcon size={16} className="mr-1.5"/> Download
                </Button>
              </div>
              {selectedVideoIdForComment === video.id && (
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
          {videos.length === 0 && <p className="text-muted-foreground">No videos uploaded yet.</p>}
        </CardContent>
      </Card>
      {previewVideo && (
        <VideoPreviewModal 
          video={previewVideo} 
          isOpen={!!previewVideo} 
          onClose={() => setPreviewVideo(null)} 
        />
      )}
    </>
  );
};

export default RecentVideos;