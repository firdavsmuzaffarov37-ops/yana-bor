import React, { createContext, useContext, useState, useEffect } from 'react';
import { CURRENT_USER, MOCK_USERS } from '../data/mockUsers';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('yanabor_auth_user');
    return saved ? JSON.parse(saved) : CURRENT_USER;
  });

  const [isDemoMode, setIsDemoMode] = useState(true);

  useEffect(() => {
    if (user) {
      localStorage.setItem('yanabor_auth_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('yanabor_auth_user');
    }
  }, [user]);

  const login = (emailOrPhone, password) => {
    // Demo authentication check
    const matched = MOCK_USERS.find(
      u => u.email === emailOrPhone || u.phone === emailOrPhone || u.phone?.replace(/\s+/g, '') === emailOrPhone?.replace(/\s+/g, '')
    ) || {
      id: 'user-' + Date.now(),
      name: emailOrPhone.includes('@') ? emailOrPhone.split('@')[0] : 'YanaBor Foydalanuvchisi',
      email: emailOrPhone.includes('@') ? emailOrPhone : 'user@yanabor.uz',
      phone: emailOrPhone.includes('+') ? emailOrPhone : '+998 90 123 45 67',
      city: 'Toshkent shahri',
      district: 'Yunusobod tumani',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=240&auto=format&fit=crop&q=80',
      bio: 'YanaBor platformasida yangi a’zo.',
      joinedDate: 'Bugun',
      rating: 5.0,
      reviewsCount: 0,
      completedExchanges: 0,
      isVerified: true
    };

    setUser(matched);
    return { success: true, user: matched };
  };

  const register = (userData) => {
    const newUser = {
      id: 'user-' + Date.now(),
      name: userData.name || 'Yangi Foydalanuvchi',
      email: userData.email,
      phone: userData.phone || '+998 90 000 00 00',
      city: userData.city || 'Toshkent shahri',
      district: userData.district || 'Chilonzor tumani',
      avatar: userData.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=240&auto=format&fit=crop&q=80',
      bio: userData.bio || 'YanaBor platformasida ikkinchi hayot berish tarafdori.',
      joinedDate: 'Bugun',
      rating: 5.0,
      reviewsCount: 0,
      completedExchanges: 0,
      isVerified: true
    };
    setUser(newUser);
    return { success: true, user: newUser };
  };

  const logout = () => {
    setUser(null);
  };

  const switchDemoUser = (userId) => {
    const target = MOCK_USERS.find(u => u.id === userId) || CURRENT_USER;
    setUser(target);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: Boolean(user),
      isDemoMode,
      setIsDemoMode,
      login,
      register,
      logout,
      switchDemoUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
