import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from 'modelence/client';

export default function LogoutPage() {
  const navigate = useNavigate();

  useEffect(() => {
    logout().then(() => navigate('/login'));
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <p className="text-muted-foreground">Signing out...</p>
    </div>
  );
}
