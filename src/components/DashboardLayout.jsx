import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Video, Calendar, MessageSquare, Settings, LogOut, Menu, X, UploadCloud, DownloadCloud, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const sidebarVariants = {
  open: { width: "16rem", transition: { type: "spring", stiffness: 300, damping: 30 } },
  closed: { width: "4rem", transition: { type: "spring", stiffness: 300, damping: 30 } },
};

const navItemVariants = {
  open: { opacity: 1, x: 0, display: "flex" },
  closed: { opacity: 0, x: -10, transitionEnd: { display: "none" } },
};

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { name: 'Dashboard', icon: <Home size={20} />, path: '/dashboard' },
    { name: 'Videos', icon: <Video size={20} />, path: '/dashboard/videos' },
    { name: 'Calendar', icon: <Calendar size={20} />, path: '/dashboard/calendar' },
    { name: 'Invitations', icon: <Mail size={20} />, path: '/dashboard/invitations' },
    { name: 'Chat Support', icon: <MessageSquare size={20} />, path: '/dashboard/chat' },
    { name: 'Upload', icon: <UploadCloud size={20} />, path: '/dashboard/upload' },
    { name: 'Downloads', icon: <DownloadCloud size={20} />, path: '/dashboard/downloads' },
    { name: 'Settings', icon: <Settings size={20} />, path: '/dashboard/settings' },
  ];

  return (
    <div className="flex h-screen bg-background text-foreground">
      <motion.aside 
        className="bg-card border-r border-border flex flex-col justify-between overflow-x-hidden"
        animate={isSidebarOpen ? "open" : "closed"}
        variants={sidebarVariants}
      >
        <div>
          <div className={`flex items-center p-4 border-b border-border ${isSidebarOpen ? 'justify-between' : 'justify-center'}`}>
            {isSidebarOpen && (
              <Link to="/dashboard" className="text-xl font-bold text-white">Client Portal</Link>
            )}
            <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-white hover:bg-white/10">
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
          <nav className="mt-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center py-3 px-4 text-sm hover:bg-secondary/80 transition-colors ${
                  location.pathname === item.path ? 'bg-secondary text-white' : 'text-muted-foreground hover:text-white'
                } ${!isSidebarOpen && 'justify-center'}`}
                title={isSidebarOpen ? '' : item.name}
              >
                {item.icon}
                <AnimatePresence>
                  {isSidebarOpen && (
                    <motion.span 
                      className="ml-3"
                      variants={navItemVariants}
                      initial="closed"
                      animate="open"
                      exit="closed"
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            ))}
          </nav>
        </div>
        <div className="p-4 border-t border-border">
           <Button
            onClick={handleLogout}
            variant="ghost"
            className={`w-full flex items-center text-muted-foreground hover:text-white hover:bg-secondary/80 ${!isSidebarOpen && 'justify-center'}`}
            title={isSidebarOpen ? '' : 'Sign Out'}
          >
            <LogOut size={20} />
            <AnimatePresence>
              {isSidebarOpen && (
                <motion.span 
                  className="ml-3"
                  variants={navItemVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                >
                  Sign Out
                </motion.span>
              )}
            </AnimatePresence>
          </Button>
        </div>
      </motion.aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-card border-b border-border p-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-white">Welcome, {user?.name || 'Client'}</h1>
          {/* Add other header elements like notifications, user avatar here */}
        </header>
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;