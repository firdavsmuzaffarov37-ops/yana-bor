import { MOCK_LISTINGS } from '../data/mockListings';
import { CURRENT_USER } from '../data/mockUsers';
import { supabase, isSupabaseConfigured } from './supabaseClient';

const STORAGE_KEYS = {
  LISTINGS: 'yanabor_listings_v1',
  FAVORITES: 'yanabor_favorites_v1',
  INQUIRIES: 'yanabor_inquiries_v1',
  EXCHANGES: 'yanabor_exchanges_v1',
  CONVERSATIONS: 'yanabor_conversations_v1',
  USER: 'yanabor_current_user_v1',
};

// Initialize default data into localStorage
export const initializeStorage = () => {
  if (!localStorage.getItem(STORAGE_KEYS.LISTINGS)) {
    localStorage.setItem(STORAGE_KEYS.LISTINGS, JSON.stringify(MOCK_LISTINGS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.FAVORITES)) {
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(['item-101', 'item-104']));
  }
  if (!localStorage.getItem(STORAGE_KEYS.USER)) {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(CURRENT_USER));
  }
  if (!localStorage.getItem(STORAGE_KEYS.EXCHANGES)) {
    const initialExchanges = [
      {
        id: 'exch-1',
        createdAt: '2026-10-27T14:00:00Z',
        status: 'Pending', // Pending, Accepted, Declined, Cancelled
        proposerId: CURRENT_USER.id,
        proposerName: CURRENT_USER.name,
        offeredItemId: 'item-103',
        offeredItemTitle: 'Apple iPhone 14 Pro 128GB Deep Purple',
        offeredItemPrice: 8400000,
        offeredItemImage: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&auto=format&fit=crop&q=80',
        requestedItemId: 'item-108',
        requestedItemTitle: 'Fujifilm X-T30 II + XF 18-55mm F2.8-4',
        requestedItemPrice: 9900000,
        requestedItemImage: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&auto=format&fit=crop&q=80',
        targetSellerId: 'user-3',
        targetSellerName: 'Jasur Temirov',
        message: 'Assalomu alaykum, iPhone 14 Pro holati a’lo darajada. Fuji kamerasiga almashtirishni taklif qilaman, qo‘shimcha to‘lovni gaplashsak bo‘ladi.'
      }
    ];
    localStorage.setItem(STORAGE_KEYS.EXCHANGES, JSON.stringify(initialExchanges));
  }
  if (!localStorage.getItem(STORAGE_KEYS.INQUIRIES)) {
    const initialInquiries = [
      {
        id: 'inq-1',
        createdAt: '2026-10-27T16:30:00Z',
        itemId: 'item-101',
        itemTitle: 'Sony WH-1000XM4 Shovqinni So‘ndiruvchi Quloqchin',
        itemPrice: 2650000,
        itemImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&auto=format&fit=crop&q=80',
        sellerId: 'user-3',
        sellerName: 'Jasur Temirov',
        buyerId: CURRENT_USER.id,
        buyerName: CURRENT_USER.name,
        offerPrice: 2400000,
        message: 'Assalomu alaykum! Agar 2 400 000 so‘mga bersangiz bugun oqshom Buyuk Ipak Yo‘lidan olib ketardim.',
        contactPhone: '+998 90 123 45 67',
        status: 'Javob kutilmoqda'
      }
    ];
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(initialInquiries));
  }
  if (!localStorage.getItem(STORAGE_KEYS.CONVERSATIONS)) {
    const initialConversations = [
      {
        id: 'conv-1',
        participantId: 'user-3',
        participantName: 'Jasur Temirov',
        participantAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=240&auto=format&fit=crop&q=80',
        itemId: 'item-101',
        itemTitle: 'Sony WH-1000XM4 Shovqinni So‘ndiruvchi Quloqchin',
        itemPrice: 2650000,
        itemImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&auto=format&fit=crop&q=80',
        unreadCount: 1,
        lastMessage: 'Va alaykum assalom! 2 500 000 so‘m qilib berishim mumkin, kelishsak uchrashamiz.',
        lastMessageTime: 'Bugun 11:42',
        messages: [
          {
            id: 'm1',
            senderId: CURRENT_USER.id,
            text: 'Assalomu alaykum Jasur aka! Sony quloqchin hali sotuvdami?',
            createdAt: '2026-10-28T10:15:00Z'
          },
          {
            id: 'm2',
            senderId: 'user-3',
            text: 'Va alaykum assalom! Ha, hali bor. Qutisi va hamma narsasi butun.',
            createdAt: '2026-10-28T10:20:00Z'
          },
          {
            id: 'm3',
            senderId: CURRENT_USER.id,
            text: 'Agar 2 400 000 so‘mga bersangiz bugun oqshom Buyuk Ipak Yo‘lidan olib ketardim.',
            createdAt: '2026-10-28T11:30:00Z'
          },
          {
            id: 'm4',
            senderId: 'user-3',
            text: 'Va alaykum assalom! 2 500 000 so‘m qilib berishim mumkin, kelishsak uchrashamiz.',
            createdAt: '2026-10-28T11:42:00Z'
          }
        ]
      },
      {
        id: 'conv-2',
        participantId: 'user-2',
        participantName: 'Madina Karimova',
        participantAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=240&auto=format&fit=crop&q=80',
        itemId: 'item-102',
        itemTitle: 'Skandinav Uslubidagi Yumshoq Kreslo (Bouclé)',
        itemPrice: 1850000,
        itemImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&auto=format&fit=crop&q=80',
        unreadCount: 0,
        lastMessage: 'Kresloni ko‘rish uchun shanba kuni Samarqand markaziga kela olasizmi?',
        lastMessageTime: 'Kecha 17:15',
        messages: [
          {
            id: 'm21',
            senderId: CURRENT_USER.id,
            text: 'Salom Madina! Kreslo matosi dog‘ bo‘lmaganmi?',
            createdAt: '2026-10-27T16:00:00Z'
          },
          {
            id: 'm22',
            senderId: 'user-2',
            text: 'Salom! Yo‘q mutlaqo toza, studiyada ko‘rgazma sifatida turgan.',
            createdAt: '2026-10-27T16:45:00Z'
          },
          {
            id: 'm23',
            senderId: 'user-2',
            text: 'Kresloni ko‘rish uchun shanba kuni Samarqand markaziga kela olasizmi?',
            createdAt: '2026-10-27T17:15:00Z'
          }
        ]
      }
    ];
    localStorage.setItem(STORAGE_KEYS.CONVERSATIONS, JSON.stringify(initialConversations));
  }
};

export const storageService = {
  // LISTINGS
  getListings: async () => {
    initializeStorage();
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('listings')
          .select('*, seller:profiles(*)')
          .order('created_at', { ascending: false });
        if (!error && data && data.length > 0) return data;
      } catch (e) {
        console.warn('Supabase fetch failed, falling back to local storage', e);
      }
    }
    const raw = localStorage.getItem(STORAGE_KEYS.LISTINGS);
    return raw ? JSON.parse(raw) : MOCK_LISTINGS;
  },

  getListingById: async (id) => {
    initializeStorage();
    const listings = await storageService.getListings();
    return listings.find(item => String(item.id) === String(id)) || null;
  },

  createListing: async (listingData) => {
    initializeStorage();
    const newListing = {
      id: 'item-' + Date.now(),
      createdAt: new Date().toISOString(),
      views: 1,
      favoritesCount: 0,
      isFeatured: false,
      ...listingData,
    };

    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase.from('listings').insert([newListing]).select();
        if (!error && data) return data[0];
      } catch (e) {
        console.warn('Supabase insert failed, falling back to local storage', e);
      }
    }

    const listings = JSON.parse(localStorage.getItem(STORAGE_KEYS.LISTINGS) || '[]');
    listings.unshift(newListing);
    localStorage.setItem(STORAGE_KEYS.LISTINGS, JSON.stringify(listings));
    return newListing;
  },

  updateListing: async (id, updatedFields) => {
    initializeStorage();
    const listings = JSON.parse(localStorage.getItem(STORAGE_KEYS.LISTINGS) || '[]');
    const index = listings.findIndex(item => String(item.id) === String(id));
    if (index === -1) throw new Error('E’lon topilmadi');

    listings[index] = { ...listings[index], ...updatedFields, updatedAt: new Date().toISOString() };
    localStorage.setItem(STORAGE_KEYS.LISTINGS, JSON.stringify(listings));
    return listings[index];
  },

  deleteListing: async (id) => {
    initializeStorage();
    const listings = JSON.parse(localStorage.getItem(STORAGE_KEYS.LISTINGS) || '[]');
    const filtered = listings.filter(item => String(item.id) !== String(id));
    localStorage.setItem(STORAGE_KEYS.LISTINGS, JSON.stringify(filtered));
    return true;
  },

  // FAVORITES
  getFavorites: () => {
    initializeStorage();
    const raw = localStorage.getItem(STORAGE_KEYS.FAVORITES);
    return raw ? JSON.parse(raw) : [];
  },

  toggleFavorite: (listingId) => {
    initializeStorage();
    let favs = storageService.getFavorites();
    const idStr = String(listingId);
    const isFav = favs.includes(idStr);

    if (isFav) {
      favs = favs.filter(id => id !== idStr);
    } else {
      favs.push(idStr);
    }
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favs));
    return !isFav;
  },

  // PURCHASE INQUIRIES
  getInquiries: () => {
    initializeStorage();
    const raw = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
    return raw ? JSON.parse(raw) : [];
  },

  createInquiry: (inquiryData) => {
    initializeStorage();
    const newInquiry = {
      id: 'inq-' + Date.now(),
      createdAt: new Date().toISOString(),
      status: 'Javob kutilmoqda',
      ...inquiryData
    };
    const inquiries = storageService.getInquiries();
    inquiries.unshift(newInquiry);
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(inquiries));
    return newInquiry;
  },

  // EXCHANGE PROPOSALS
  getExchangeProposals: () => {
    initializeStorage();
    const raw = localStorage.getItem(STORAGE_KEYS.EXCHANGES);
    return raw ? JSON.parse(raw) : [];
  },

  createExchangeProposal: (proposalData) => {
    initializeStorage();
    const newProposal = {
      id: 'exch-' + Date.now(),
      createdAt: new Date().toISOString(),
      status: 'Pending',
      ...proposalData
    };
    const proposals = storageService.getExchangeProposals();
    proposals.unshift(newProposal);
    localStorage.setItem(STORAGE_KEYS.EXCHANGES, JSON.stringify(proposals));
    return newProposal;
  },

  updateExchangeStatus: (proposalId, newStatus) => {
    initializeStorage();
    const proposals = storageService.getExchangeProposals();
    const index = proposals.findIndex(p => p.id === proposalId);
    if (index !== -1) {
      proposals[index].status = newStatus;
      proposals[index].updatedAt = new Date().toISOString();
      localStorage.setItem(STORAGE_KEYS.EXCHANGES, JSON.stringify(proposals));
      return proposals[index];
    }
    return null;
  },

  // MESSAGING
  getConversations: () => {
    initializeStorage();
    const raw = localStorage.getItem(STORAGE_KEYS.CONVERSATIONS);
    return raw ? JSON.parse(raw) : [];
  },

  sendMessage: (conversationId, messageText, senderId) => {
    initializeStorage();
    const convs = storageService.getConversations();
    const index = convs.findIndex(c => c.id === conversationId);
    if (index !== -1) {
      const newMsg = {
        id: 'msg-' + Date.now(),
        senderId,
        text: messageText,
        createdAt: new Date().toISOString()
      };
      convs[index].messages.push(newMsg);
      convs[index].lastMessage = messageText;
      convs[index].lastMessageTime = 'Hozirgina';
      localStorage.setItem(STORAGE_KEYS.CONVERSATIONS, JSON.stringify(convs));
      return convs[index];
    }
    return null;
  },

  createConversation: (participant, item, initialMessage, currentUserId) => {
    initializeStorage();
    const convs = storageService.getConversations();
    const existing = convs.find(c => c.participantId === participant.id && c.itemId === item.id);
    if (existing) {
      if (initialMessage) {
        return storageService.sendMessage(existing.id, initialMessage, currentUserId);
      }
      return existing;
    }

    const newConv = {
      id: 'conv-' + Date.now(),
      participantId: participant.id,
      participantName: participant.name,
      participantAvatar: participant.avatar,
      itemId: item.id,
      itemTitle: item.title,
      itemPrice: item.price,
      itemImage: item.images?.[0] || '',
      unreadCount: 0,
      lastMessage: initialMessage || 'Yangi suhbat boshlandi',
      lastMessageTime: 'Hozirgina',
      messages: initialMessage ? [
        {
          id: 'msg-' + Date.now(),
          senderId: currentUserId,
          text: initialMessage,
          createdAt: new Date().toISOString()
        }
      ] : []
    };
    convs.unshift(newConv);
    localStorage.setItem(STORAGE_KEYS.CONVERSATIONS, JSON.stringify(convs));
    return newConv;
  },

  // RESET TO DEFAULT DEMO STATE
  resetDemoData: () => {
    localStorage.removeItem(STORAGE_KEYS.LISTINGS);
    localStorage.removeItem(STORAGE_KEYS.FAVORITES);
    localStorage.removeItem(STORAGE_KEYS.INQUIRIES);
    localStorage.removeItem(STORAGE_KEYS.EXCHANGES);
    localStorage.removeItem(STORAGE_KEYS.CONVERSATIONS);
    localStorage.removeItem(STORAGE_KEYS.USER);
    initializeStorage();
  }
};
