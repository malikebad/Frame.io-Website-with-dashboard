import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const storedUser = localStorage.getItem('frameio-user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('frameio-users')) || [];
    const foundUser = users.find(u => u.email === email && u.password === password);

    if (foundUser) {
      const userData = { email: foundUser.email, name: foundUser.name };
      localStorage.setItem('frameio-user', JSON.stringify(userData));
      setUser(userData);
      toast({ title: "Login Successful", description: "Welcome back!" });
      navigate('/dashboard');
      return true;
    } else {
      toast({ title: "Login Failed", description: "Invalid email or password.", variant: "destructive" });
      return false;
    }
  };

  const signup = (name, email, password) => {
    let users = JSON.parse(localStorage.getItem('frameio-users')) || [];
    if (users.find(u => u.email === email)) {
      toast({ title: "Signup Failed", description: "Email already exists.", variant: "destructive" });
      return false;
    }
    
    users.push({ name, email, password });
    localStorage.setItem('frameio-users', JSON.stringify(users));
    
    const userData = { email, name };
    localStorage.setItem('frameio-user', JSON.stringify(userData));
    setUser(userData);
    toast({ title: "Signup Successful", description: "Welcome to Frame.io!" });
    navigate('/dashboard');
    return true;
  };

  const logout = () => {
    localStorage.removeItem('frameio-user');
    setUser(null);
    toast({ title: "Logged Out", description: "You have been successfully logged out." });
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);