import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { User, Mail, Lock, Bell, Palette, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from "@/components/ui/use-toast";

const SettingsPage = () => {
  const { user, login, signup } = useAuth(); // Assuming signup can also update user or similar logic
  const { toast } = useToast();
  
  const [profileData, setProfileData] = useState({ name: '', email: '' });
  const [passwordData, setPasswordData] = useState({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
  const [notificationSettings, setNotificationSettings] = useState({ emailNewVideo: true, emailComments: true, emailUpdates: false });
  // const [theme, setTheme] = useState('dark'); // Example theme setting

  useEffect(() => {
    if (user) {
      setProfileData({ name: user.name, email: user.email });
    }
  }, [user]);

  const handleProfileChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would call an API. Here, we update localStorage if signup logic handles it.
    // For demo, just show a toast. If your signup/login updates localStorage user, that's better.
    const users = JSON.parse(localStorage.getItem('frameio-users')) || [];
    const userIndex = users.findIndex(u => u.email === user.email);
    if (userIndex !== -1) {
        users[userIndex].name = profileData.name;
        // Email change is complex, usually needs verification. For demo, we can update it if it's not used for login uniqueness check or re-login.
        // users[userIndex].email = profileData.email; // Be cautious with this
        localStorage.setItem('frameio-users', JSON.stringify(users));
        
        // Update current auth context user
        const updatedAuthUser = {...user, name: profileData.name};
        localStorage.setItem('frameio-user', JSON.stringify(updatedAuthUser));
        // This requires auth context to re-read from localStorage or have an update method.
        // For now, we will rely on user re-logging in or a page refresh if AuthContext doesn't auto-update.
        // A proper way: add an updateUser function to AuthContext.
        toast({ title: "Profile Updated", description: "Your profile information has been saved." });

    } else {
         toast({ title: "Error", description: "Could not find user to update.", variant: "destructive" });
    }
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      toast({ title: "Error", description: "New passwords do not match.", variant: "destructive" });
      return;
    }
    if (passwordData.newPassword.length < 6) {
       toast({ title: "Error", description: "New password must be at least 6 characters.", variant: "destructive" });
      return;
    }
    // Simulate password change
    const users = JSON.parse(localStorage.getItem('frameio-users')) || [];
    const userIndex = users.findIndex(u => u.email === user.email); // Add current password check if implemented
    
    if (userIndex !== -1) {
        // Real app: Verify currentPassword against users[userIndex].password
        users[userIndex].password = passwordData.newPassword; // In real app, hash this
        localStorage.setItem('frameio-users', JSON.stringify(users));
        toast({ title: "Password Updated", description: "Your password has been changed successfully." });
        setPasswordData({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
    } else {
        toast({ title: "Error", description: "Password update failed.", variant: "destructive" });
    }
  };
  
  const handleNotificationToggle = (key) => {
    setNotificationSettings(prev => {
        const newSettings = {...prev, [key]: !prev[key]};
        localStorage.setItem('dashboard-notifications', JSON.stringify(newSettings));
        return newSettings;
    });
    toast({ title: "Notification Settings Updated" });
  };

  useEffect(() => {
    const storedNotifications = JSON.parse(localStorage.getItem('dashboard-notifications'));
    if (storedNotifications) {
        setNotificationSettings(storedNotifications);
    }
  }, []);

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
        // Remove user from 'frameio-users'
        let users = JSON.parse(localStorage.getItem('frameio-users')) || [];
        users = users.filter(u => u.email !== user.email);
        localStorage.setItem('frameio-users', JSON.stringify(users));
        // Logout
        localStorage.removeItem('frameio-user');
        toast({ title: "Account Deleted", description: "Your account has been permanently deleted." });
        // Navigate to home or signup, AuthContext logout should handle this
        // For safety, explicitly navigate here:
        window.location.href = "/"; // Force reload and redirect
    }
  };


  return (
    <div className="space-y-8">
      <motion.h1 
        className="text-3xl font-bold text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Account Settings
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Profile Settings */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
          <Card className="bg-card border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center"><User className="mr-2"/> Profile Information</CardTitle>
            </CardHeader>
            <form onSubmit={handleProfileSubmit}>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-gray-400">Full Name</Label>
                  <Input id="name" name="name" type="text" value={profileData.name} onChange={handleProfileChange} className="mt-1 bg-background border-white/20 text-white" />
                </div>
                <div>
                  <Label htmlFor="email" className="text-gray-400">Email Address</Label>
                  <Input id="email" name="email" type="email" value={profileData.email} onChange={handleProfileChange} className="mt-1 bg-background border-white/20 text-white" readOnly/>
                  <p className="text-xs text-muted-foreground mt-1">Email change requires verification and is disabled in this demo.</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="btn-primary">Save Profile</Button>
              </CardFooter>
            </form>
          </Card>
        </motion.div>

        {/* Change Password */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
          <Card className="bg-card border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center"><Lock className="mr-2"/> Change Password</CardTitle>
            </CardHeader>
            <form onSubmit={handlePasswordSubmit}>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="currentPassword" disabled className="text-gray-400">Current Password</Label>
                  <Input id="currentPassword" name="currentPassword" type="password" value={passwordData.currentPassword} onChange={handlePasswordChange} className="mt-1 bg-background border-white/20 text-white" placeholder="Feature disabled in demo" disabled/>
                </div>
                <div>
                  <Label htmlFor="newPassword" className="text-gray-400">New Password</Label>
                  <Input id="newPassword" name="newPassword" type="password" value={passwordData.newPassword} onChange={handlePasswordChange} className="mt-1 bg-background border-white/20 text-white" />
                </div>
                <div>
                  <Label htmlFor="confirmNewPassword" className="text-gray-400">Confirm New Password</Label>
                  <Input id="confirmNewPassword" name="confirmNewPassword" type="password" value={passwordData.confirmNewPassword} onChange={handlePasswordChange} className="mt-1 bg-background border-white/20 text-white" />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="btn-primary">Update Password</Button>
              </CardFooter>
            </form>
          </Card>
        </motion.div>
      </div>

      {/* Notification Settings */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <Card className="bg-card border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center"><Bell className="mr-2"/> Notification Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(notificationSettings).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                    <Label htmlFor={key} className="text-gray-300">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </Label>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" id={key} checked={value} onChange={() => handleNotificationToggle(key)} className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-500 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                </div>
            ))}
          </CardContent>
        </Card>
      </motion.div>
      
      {/* Account Deletion */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <Card className="bg-card border-red-500/50 border-2">
            <CardHeader>
                <CardTitle className="text-red-400 flex items-center"><Trash2 className="mr-2"/> Delete Account</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-gray-400 mb-4">Permanently delete your account and all associated data. This action cannot be undone.</p>
                <Button variant="destructive" onClick={handleDeleteAccount}>Delete My Account</Button>
            </CardContent>
        </Card>
      </motion.div>

    </div>
  );
};

export default SettingsPage;