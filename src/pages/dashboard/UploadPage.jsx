import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { UploadCloud, FileText, XCircle, CheckCircle, CloudLightning, Database } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from "@/components/ui/use-toast";

const UploadPage = () => {
  const [filesToUpload, setFilesToUpload] = useState([]);
  const { toast } = useToast();

  const handleFileDrop = useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
    const newFiles = Array.from(event.dataTransfer.files).map(file => ({
      id: Date.now() + Math.random(), 
      file,
      status: 'pending', 
      progress: 0,
      source: 'local'
    }));
    setFilesToUpload(prevFiles => [...prevFiles, ...newFiles]);
  }, []);

  const handleFileSelect = (event) => {
    const newFiles = Array.from(event.target.files).map(file => ({
      id: Date.now() + Math.random(),
      file,
      status: 'pending',
      progress: 0,
      source: 'local'
    }));
    setFilesToUpload(prevFiles => [...prevFiles, ...newFiles]);
  };

  const removeFile = (fileId) => {
    setFilesToUpload(prevFiles => prevFiles.filter(f => f.id !== fileId));
  };

  const simulateUpload = (fileWrapper) => {
    setFilesToUpload(prev => prev.map(f => f.id === fileWrapper.id ? {...f, status: 'uploading', progress: 0} : f));
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      if (progress <= 100) {
        setFilesToUpload(prev => prev.map(f => f.id === fileWrapper.id ? {...f, progress} : f));
      } else {
        clearInterval(interval);
        const success = Math.random() > 0.2; 
        setFilesToUpload(prev => prev.map(f => f.id === fileWrapper.id ? {...f, status: success ? 'success' : 'error', progress: 100} : f));
        
        if (success) {
          if (fileWrapper.file.type.startsWith('video/')) {
            const videos = JSON.parse(localStorage.getItem('dashboard-videos')) || [];
            const newVideoEntry = {
              id: videos.length > 0 ? Math.max(...videos.map(v => v.id)) + 1 : 1,
              title: fileWrapper.file.name,
              client: 'Current Client',
              status: 'Uploaded',
              comments: [],
              uploadedAt: new Date().toISOString(),
              fileUrl: fileWrapper.source === 'local' ? '#' : 'cloud-placeholder-url', // Store placeholder for local blobs
              source: fileWrapper.source,
            };
            videos.push(newVideoEntry);
            localStorage.setItem('dashboard-videos', JSON.stringify(videos));
          }
          toast({ title: "Upload Complete", description: `${fileWrapper.file.name} uploaded successfully from ${fileWrapper.source}.` });
        } else {
          toast({ title: "Upload Failed", description: `Error uploading ${fileWrapper.file.name}.`, variant: "destructive" });
        }
      }
    }, 200);
  };

  const startAllUploads = () => {
    filesToUpload.filter(f => f.status === 'pending').forEach(simulateUpload);
  };

  const handleCloudUpload = (service) => {
    toast({
      title: `Upload from ${service}`,
      description: `This would typically open the ${service} file picker. This feature is a placeholder.`,
    });
    // Simulate adding a cloud file
    const dummyFile = { name: `sample_video_from_${service.toLowerCase()}.mp4`, size: 1024*1024*50, type: 'video/mp4' }; // 50MB dummy
    const newFile = {
      id: Date.now() + Math.random(),
      file: dummyFile,
      status: 'pending',
      progress: 0,
      source: service
    };
    setFilesToUpload(prev => [...prev, newFile]);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      <motion.h1 
        className="text-3xl font-bold text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Upload Files
      </motion.h1>
      
      <Card className="bg-card border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Connect Cloud Storage</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row gap-4">
          <Button variant="outline" className="btn-outline w-full sm:w-auto justify-center group" onClick={() => handleCloudUpload('Google Drive')}>
            <Database size={18} className="mr-2 text-blue-400 group-hover:text-blue-300 transition-colors" /> Google Drive
          </Button>
          <Button variant="outline" className="btn-outline w-full sm:w-auto justify-center group" onClick={() => handleCloudUpload('Dropbox')}>
            <CloudLightning size={18} className="mr-2 text-sky-400 group-hover:text-sky-300 transition-colors" /> Dropbox
          </Button>
        </CardContent>
      </Card>

      <Card 
        className="bg-card border-2 border-dashed border-white/20 p-8 text-center hover:border-white/40 transition-colors"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleFileDrop}
      >
        <CardContent className="flex flex-col items-center justify-center space-y-4">
          <UploadCloud size={48} className="text-muted-foreground" />
          <p className="text-lg text-white">Drag & drop files here from your computer</p>
          <p className="text-muted-foreground">or</p>
          <Button className="btn-secondary" onClick={() => document.getElementById('fileUploadInput')?.click()}>
            Browse Local Files
          </Button>
          <Input type="file" id="fileUploadInput" multiple className="hidden" onChange={handleFileSelect} accept="video/*,image/*,audio/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,text/plain" />
          <p className="text-xs text-muted-foreground">Max file size: 5GB per file. Supports common video, image, and document formats.</p>
        </CardContent>
      </Card>

      {filesToUpload.length > 0 && (
        <Card className="bg-card border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Upload Queue ({filesToUpload.filter(f=> f.status === 'pending' || f.status === 'uploading').length})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <AnimatePresence>
              {filesToUpload.map(fileWrapper => (
                <motion.div 
                  key={fileWrapper.id}
                  layout
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-3 bg-secondary/50 rounded-md border border-white/10 flex items-center gap-3"
                >
                  {fileWrapper.source === 'Google Drive' ? <Database size={24} className="text-blue-400 shrink-0" /> :
                   fileWrapper.source === 'Dropbox' ? <CloudLightning size={24} className="text-sky-400 shrink-0" /> :
                   <FileText size={24} className="text-white shrink-0" />}
                  <div className="flex-grow overflow-hidden">
                    <p className="text-sm font-medium text-white truncate" title={fileWrapper.file.name}>{fileWrapper.file.name}</p>
                    <p className="text-xs text-muted-foreground">{formatFileSize(fileWrapper.file.size)} {fileWrapper.source !== 'local' && `(from ${fileWrapper.source})`}</p>
                    {fileWrapper.status === 'uploading' && (
                      <div className="w-full bg-gray-600 rounded-full h-1.5 mt-1">
                        <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${fileWrapper.progress}%` }}></div>
                      </div>
                    )}
                     {fileWrapper.status === 'success' && <p className="text-xs text-green-400 mt-0.5">Upload successful!</p>}
                     {fileWrapper.status === 'error' && <p className="text-xs text-red-400 mt-0.5">Upload failed.</p>}
                  </div>
                  {fileWrapper.status === 'pending' && (
                    <Button variant="ghost" size="icon" className="text-blue-400 hover:text-blue-300 h-7 w-7" onClick={() => simulateUpload(fileWrapper)}>
                      <UploadCloud size={16} />
                    </Button>
                  )}
                  {fileWrapper.status === 'success' && (
                     <CheckCircle size={20} className="text-green-400 shrink-0" />
                  )}
                  {fileWrapper.status === 'error' && (
                     <XCircle size={20} className="text-red-400 shrink-0" />
                  )}
                  {(fileWrapper.status !== 'uploading' && fileWrapper.status !== 'success') && (
                     <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-red-500 h-7 w-7" onClick={() => removeFile(fileWrapper.id)}>
                        <XCircle size={16} />
                     </Button>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
            {filesToUpload.some(f => f.status === 'pending') && (
              <Button className="btn-primary w-full mt-4" onClick={startAllUploads}>Start All Uploads</Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UploadPage;