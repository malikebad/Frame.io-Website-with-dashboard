import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Mail, PlusCircle, Trash2, RefreshCw, UserX } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from "@/components/ui/use-toast";
import { format } from 'date-fns';

const InvitationsPage = () => {
  const [invitations, setInvitations] = useState([]);
  const [newInvitationEmail, setNewInvitationEmail] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    const storedInvitations = JSON.parse(localStorage.getItem('dashboard-invitations')) || [];
    setInvitations(storedInvitations);
  }, []);

  const handleSendInvitation = () => {
    if (!newInvitationEmail.trim() || !newInvitationEmail.includes('@')) {
      toast({ title: "Error", description: "Please enter a valid email address.", variant: "destructive" });
      return;
    }
    if (invitations.find(inv => inv.email === newInvitationEmail && inv.status !== 'Revoked')) {
      toast({ title: "Error", description: "An active invitation already exists for this email.", variant: "destructive" });
      return;
    }

    const newInvitation = {
      id: Date.now(),
      email: newInvitationEmail,
      date: new Date().toISOString(),
      status: 'Pending' 
    };
    const updatedInvitations = [...invitations, newInvitation];
    setInvitations(updatedInvitations);
    localStorage.setItem('dashboard-invitations', JSON.stringify(updatedInvitations));
    setNewInvitationEmail('');
    toast({ title: "Success", description: `Invitation sent to ${newInvitationEmail}.` });
  };

  const handleRevokeInvitation = (id) => {
    const updatedInvitations = invitations.map(inv => 
      inv.id === id ? { ...inv, status: 'Revoked' } : inv
    );
    setInvitations(updatedInvitations);
    localStorage.setItem('dashboard-invitations', JSON.stringify(updatedInvitations));
    toast({ title: "Invitation Revoked", description: "The invitation has been revoked." });
  };
  
  const handleResendInvitation = (email) => {
     toast({ title: "Invitation Resent", description: `Invitation resent to ${email}. (This is a demo action)` });
  };


  return (
    <div className="space-y-6">
      <motion.h1 
        className="text-3xl font-bold text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Manage Invitations
      </motion.h1>

      <Card className="bg-card border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center"><PlusCircle size={20} className="mr-2"/> Send New Invitation</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row gap-3">
          <Input 
            type="email" 
            placeholder="Enter email address" 
            className="bg-background border-white/20 text-white focus:ring-white/50 flex-grow"
            value={newInvitationEmail}
            onChange={(e) => setNewInvitationEmail(e.target.value)}
          />
          <Button className="btn-primary" onClick={handleSendInvitation}>
            <Mail size={18} className="mr-2"/> Send Invitation
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-card border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Sent Invitations</CardTitle>
        </CardHeader>
        <CardContent>
          {invitations.length === 0 ? (
            <p className="text-muted-foreground">No invitations sent yet.</p>
          ) : (
            <ul className="space-y-3">
              {invitations.map((invitation) => (
                <motion.li 
                  key={invitation.id} 
                  className="p-4 bg-secondary/50 rounded-md border border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div>
                    <p className="font-semibold text-white">{invitation.email}</p>
                    <p className="text-sm text-muted-foreground">
                      Sent: {format(new Date(invitation.date), "PPP p")}
                    </p>
                    <p className={`text-sm font-medium ${
                      invitation.status === 'Pending' ? 'text-yellow-400' :
                      invitation.status === 'Accepted' ? 'text-green-400' :
                      'text-red-400' 
                    }`}>
                      Status: {invitation.status}
                    </p>
                  </div>
                  <div className="flex gap-2 mt-2 sm:mt-0 self-start sm:self-center">
                    {invitation.status === 'Pending' && (
                       <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300 hover:bg-white/5 px-2 py-1" onClick={() => handleResendInvitation(invitation.email)}>
                        <RefreshCw size={14} className="mr-1"/> Resend
                      </Button>
                    )}
                    {invitation.status !== 'Revoked' && invitation.status !== 'Accepted' && (
                      <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-400 hover:bg-white/5 px-2 py-1" onClick={() => handleRevokeInvitation(invitation.id)}>
                        <UserX size={14} className="mr-1"/> Revoke
                      </Button>
                    )}
                     {invitation.status === 'Revoked' && (
                      <Button variant="ghost" size="sm" disabled className="text-gray-500 px-2 py-1">
                        Revoked
                      </Button>
                    )}
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

export default InvitationsPage;