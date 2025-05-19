import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

const VideoPreviewModal = ({ video, isOpen, onClose }) => {
  if (!video) return null;

  const isPlaceholderUrl = video.fileUrl === '#' || !video.fileUrl;
  const videoSource = isPlaceholderUrl ? "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4" : video.fileUrl;
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-card border-white/10 text-white sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>{video.title}</DialogTitle>
          {isPlaceholderUrl && (
             <DialogDescription className="text-xs text-yellow-400">
              This is a placeholder preview. Actual video content would play here.
            </DialogDescription>
          )}
        </DialogHeader>
        <div className="aspect-video bg-black rounded-md overflow-hidden">
          <video
            key={videoSource} 
            className="w-full h-full"
            controls
            autoPlay
            src={videoSource}
            onError={(e) => {
              console.error("Error playing video. Event type:", e.type);
              e.target.poster = "https://via.placeholder.com/700x394.png?text=Video+Playback+Error";
            }}
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VideoPreviewModal;