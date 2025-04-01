
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export const useGuestMode = () => {
  const { user } = useAuth();
  const [isGuestMode, setIsGuestMode] = useState(false);

  useEffect(() => {
    // If user is authenticated, guest mode should be off
    if (user) {
      setIsGuestMode(false);
      localStorage.removeItem('guestMode');
      return;
    }

    // Check local storage for guest mode setting
    const storedGuestMode = localStorage.getItem('guestMode') === 'true';
    setIsGuestMode(storedGuestMode);
  }, [user]);

  const enableGuestMode = () => {
    setIsGuestMode(true);
    localStorage.setItem('guestMode', 'true');
  };

  const disableGuestMode = () => {
    setIsGuestMode(false);
    localStorage.removeItem('guestMode');
  };

  return {
    isGuestMode,
    enableGuestMode,
    disableGuestMode,
    // Guest users have limited access
    canCreate: !!user,
    canEdit: !!user,
    canPublish: !!user,
    canManagePayments: !!user
  };
};
