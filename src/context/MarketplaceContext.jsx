import React, { createContext, useContext, useState, useEffect } from 'react';
import { storageService } from '../services/storageService';
import { useAuth } from './AuthContext';

const MarketplaceContext = createContext();

export const MarketplaceProvider = ({ children }) => {
  const { user } = useAuth();
  const [listings, setListings] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [proposals, setProposals] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [toastMessage, setToastMessage] = useState(null);

  // Load all data on mount
  const refreshData = async () => {
    setIsLoading(true);
    try {
      const loadedListings = await storageService.getListings();
      setListings(loadedListings);
      setFavorites(storageService.getFavorites());
      setInquiries(storageService.getInquiries());
      setProposals(storageService.getExchangeProposals());
      setConversations(storageService.getConversations());
    } catch (e) {
      console.error('Error loading data:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage(prev => (prev?.message === message ? null : prev));
    }, 4000);
  };

  // FAVORITES
  const toggleFavorite = (itemId) => {
    const isNowFav = storageService.toggleFavorite(itemId);
    setFavorites(storageService.getFavorites());
    // Also update count on item in state
    setListings(prev => prev.map(item => {
      if (item.id === itemId) {
        return {
          ...item,
          favoritesCount: Math.max(0, (item.favoritesCount || 0) + (isNowFav ? 1 : -1))
        };
      }
      return item;
    }));
    showToast(isNowFav ? 'Sevimlilarga qo‘shildi' : 'Sevimlilardan olib tashlandi', 'info');
    return isNowFav;
  };

  const isFavorite = (itemId) => favorites.includes(String(itemId));

  // LISTINGS
  const createListing = async (listingData) => {
    const newListing = await storageService.createListing({
      ...listingData,
      sellerId: user?.id || 'guest',
      seller: {
        id: user?.id || 'guest',
        name: user?.name || 'YanaBor A’zosi',
        avatar: user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=240&auto=format&fit=crop&q=80',
        phone: user?.phone || '+998 90 123 45 67',
        city: user?.city || 'Toshkent shahri',
        rating: user?.rating || 5.0,
        reviewsCount: user?.reviewsCount || 0,
        isVerified: true
      }
    });
    setListings(prev => [newListing, ...prev]);
    showToast('E’lon muvaffaqiyatli chop etildi!', 'success');
    return newListing;
  };

  const updateListing = async (id, updatedFields) => {
    const updated = await storageService.updateListing(id, updatedFields);
    setListings(prev => prev.map(item => item.id === id ? updated : item));
    showToast('E’lon yangilandi!', 'success');
    return updated;
  };

  const deleteListing = async (id) => {
    await storageService.deleteListing(id);
    setListings(prev => prev.filter(item => item.id !== id));
    showToast('E’lon o‘chirildi', 'info');
  };

  // INQUIRIES
  const sendInquiry = (inquiryData) => {
    const newInq = storageService.createInquiry({
      ...inquiryData,
      buyerId: user?.id || 'guest',
      buyerName: user?.name || 'Mehmon',
      contactPhone: user?.phone || inquiryData.contactPhone
    });
    setInquiries(prev => [newInq, ...prev]);

    // Also auto-create a conversation in messages
    if (inquiryData.seller && inquiryData.item) {
      const msg = `Assalomu alaykum! E’loningiz bo‘yicha taklif: ${inquiryData.offerPrice ? `${inquiryData.offerPrice.toLocaleString('ru-RU')} so‘m.` : ''} ${inquiryData.message}`;
      storageService.createConversation(inquiryData.seller, inquiryData.item, msg, user?.id || 'guest');
      setConversations(storageService.getConversations());
    }

    showToast('Sotuvchiga so‘rov yuborildi!', 'success');
    return newInq;
  };

  // EXCHANGE PROPOSALS
  const sendExchangeProposal = (proposalData) => {
    const newProp = storageService.createExchangeProposal({
      ...proposalData,
      proposerId: user?.id || 'guest',
      proposerName: user?.name || 'Mehmon'
    });
    setProposals(prev => [newProp, ...prev]);

    // Auto-create chat notification message
    if (proposalData.targetSeller && proposalData.requestedItem) {
      const msg = `🔄 Ayirboshlash (obmen) taklifi: "${proposalData.offeredItemTitle}" buyumini sizning "${proposalData.requestedItemTitle}" buyumingizga almashtirish taklif qilindi. Xabar: ${proposalData.message || 'Kelishamizmi?'}`;
      storageService.createConversation(
        proposalData.targetSeller,
        proposalData.requestedItem,
        msg,
        user?.id || 'guest'
      );
      setConversations(storageService.getConversations());
    }

    showToast('Ayirboshlash taklifi yuborildi!', 'success');
    return newProp;
  };

  const updateProposalStatus = (proposalId, status) => {
    const updated = storageService.updateExchangeStatus(proposalId, status);
    if (updated) {
      setProposals(prev => prev.map(p => p.id === proposalId ? updated : p));
      showToast(`Taklif holati o‘zgartirildi: ${status}`, 'info');
    }
    return updated;
  };

  // MESSAGES
  const sendMessage = (conversationId, text) => {
    const updated = storageService.sendMessage(conversationId, text, user?.id || 'guest');
    if (updated) {
      setConversations(storageService.getConversations());
    }
    return updated;
  };

  const startConversation = (seller, item, initialText) => {
    const conv = storageService.createConversation(seller, item, initialText, user?.id || 'guest');
    setConversations(storageService.getConversations());
    return conv;
  };

  const resetAllData = () => {
    storageService.resetDemoData();
    refreshData();
    showToast('Barcha demo ma’lumotlar dastlabki holatga qaytarildi', 'info');
  };

  return (
    <MarketplaceContext.Provider value={{
      listings,
      favorites,
      inquiries,
      proposals,
      conversations,
      isLoading,
      searchTerm,
      setSearchTerm,
      toggleFavorite,
      isFavorite,
      createListing,
      updateListing,
      deleteListing,
      sendInquiry,
      sendExchangeProposal,
      updateProposalStatus,
      sendMessage,
      startConversation,
      resetAllData,
      refreshData,
      showToast,
      toastMessage
    }}>
      {children}
    </MarketplaceContext.Provider>
  );
};

export const useMarketplace = () => useContext(MarketplaceContext);
