import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DownloadCloud, FileText, Trash2, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from "@/components/ui/use-toast";
import { Input } from '@/components/ui/input';

// Example: Assume downloads are tracked in localStorage
// Each item: { id: Date.now(), name: 'video.mp4', size: '150MB', status: 'Completed/Failed/Pending', date: new Date() }

const DownloadsPage = () => {
  const [downloads, setDownloads] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    // Mock data, replace with actual localStorage logic if you track downloads
    const mockDownloads = [
      { id: 1, name: 'Project_Alpha_Final.mp4', size: '256MB', status: 'Completed', date: new Date(Date.now() - 86400000) },
      { id: 2, name: 'Marketing_Assets_V2.zip', size: '1.2GB', status: 'Completed', date: new Date(Date.now() - 172800000) },
      { id: 3, name: 'Client_Feedback_Notes.pdf', size: '2.5MB', status: 'Failed', date: new Date(Date.now() - 3600000) },
    ];
    const storedDownloads = JSON.parse(localStorage.getItem('dashboard-downloads')) || mockDownloads;
    setDownloads(storedDownloads);
  }, []);

  const clearDownloadHistory = () => {
    setDownloads([]);
    localStorage.removeItem('dashboard-downloads'); // Or specific logic
    toast({ title: "Download History Cleared", description: "Your download list has been cleared." });
  };
  
  const retryDownload = (downloadItem) => {
     toast({ title: "Retrying Download", description: `Retrying download for ${downloadItem.name}. (Demo)` });
  };

  const filteredDownloads = downloads.filter(download =>
    download.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const formatFileSize = (sizeStr) => sizeStr; // Assuming size is already formatted string

  return (
    <div className="space-y-6">
      <motion.h1 
        className="text-3xl font-bold text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        My Downloads
      </motion.h1>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="relative flex-grow w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search downloads..."
            className="pl-10 bg-card border-white/10 text-white focus:ring-white/50 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="destructive" onClick={clearDownloadHistory} className="w-full sm:w-auto">
          <Trash2 size={16} className="mr-2"/> Clear History
        </Button>
      </div>

      <Card className="bg-card border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Download History</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredDownloads.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">No download history found.</p>
          ) : (
            <ul className="space-y-3">
              {filteredDownloads.map((item, index) => (
                <motion.li 
                  key={item.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="p-3 bg-secondary/50 rounded-md border border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3"
                >
                  <div className="flex items-center gap-3 flex-grow overflow-hidden">
                    <FileText size={24} className="text-white shrink-0" />
                    <div className="overflow-hidden">
                      <p className="text-sm font-medium text-white truncate" title={item.name}>{item.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatFileSize(item.size)} • {new Date(item.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-2 sm:mt-0 self-start sm:self-center">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      item.status === 'Completed' ? 'bg-green-500/20 text-green-400' :
                      item.status === 'Failed' ? 'bg-red-500/20 text-red-400' :
                      'bg-yellow-500/20 text-yellow-400' 
                    }`}>
                      {item.status}
                    </span>
                    {item.status !== 'Completed' && (
                       <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300 hover:bg-white/5 px-2 py-1 h-auto" onClick={() => retryDownload(item)}>
                         Retry
                       </Button>
                    )}
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-white h-7 w-7">
                      <DownloadCloud size={16} />
                    </Button>
                  </div>
                </motion.li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DownloadsPage;