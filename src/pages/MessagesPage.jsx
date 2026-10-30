import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Send, MessageSquare, ArrowLeft, ExternalLink, 
  CheckCheck, Sparkles, User, Clock, Phone 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useMarketplace } from '../context/MarketplaceContext';
import { useLanguage } from '../context/LanguageContext';

export default function MessagesPage() {
  const { user } = useAuth();
  const { conversations, sendMessage } = useMarketplace();
  const { t, formatCurrency } = useLanguage();

  const [activeConvId, setActiveConvId] = useState(conversations[0]?.id || '');
  const [inputText, setInputText] = useState('');

  const activeConv = conversations.find(c => c.id === activeConvId) || conversations[0];

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim() || !activeConv) return;
    sendMessage(activeConv.id, inputText.trim());
    setInputText('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="font-serif text-3xl font-bold text-charcoal-900">
          {t('messages.title')}
        </h1>
        <p className="text-xs text-stone-500 mt-1">
          {t('messages.subtitle')}
        </p>
      </div>

      {/* Main Messaging Container */}
      <div className="bg-white rounded-3xl border border-stone-200/90 shadow-soft overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[620px]">
        
        {/* Left: Conversations List */}
        <div className={`md:col-span-5 lg:col-span-4 border-r border-stone-200 flex flex-col ${activeConvId && 'hidden md:flex'}`}>
          <div className="p-4 border-b border-stone-100 bg-[#FAF8F5]">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
              {t('messages.chatsCount')} ({conversations.length})
            </span>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-stone-100">
            {conversations.length > 0 ? (
              conversations.map(conv => (
                <button
                  key={conv.id}
                  onClick={() => setActiveConvId(conv.id)}
                  className={`w-full text-left p-4 hover:bg-stone-50 transition flex items-start gap-3 ${
                    activeConv?.id === conv.id ? 'bg-emerald-50/70 border-l-4 border-emerald-800' : ''
                  }`}
                >
                  <img
                    src={conv.participantAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=240&auto=format&fit=crop&q=80'}
                    alt={conv.participantName}
                    className="w-12 h-12 rounded-2xl object-cover bg-stone-200 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <h4 className="text-xs font-bold text-charcoal-900 truncate">
                        {conv.participantName}
                      </h4>
                      <span className="text-[10px] text-stone-400">
                        {conv.lastMessageTime}
                      </span>
                    </div>

                    <p className="text-[11px] font-semibold text-emerald-900 truncate">
                      📦 {conv.itemTitle}
                    </p>

                    <p className="text-xs text-stone-500 truncate mt-0.5">
                      {conv.lastMessage}
                    </p>
                  </div>
                </button>
              ))
            ) : (
              <div className="p-8 text-center text-xs text-stone-400">
                {t('messages.noChats')}
              </div>
            )}
          </div>
        </div>

        {/* Right: Active Chat Stream */}
        <div className={`md:col-span-7 lg:col-span-8 flex flex-col ${!activeConvId && 'hidden md:flex'}`}>
          {activeConv ? (
            <>
              {/* Chat Header with Product Context Banner */}
              <div className="p-4 border-b border-stone-200 bg-[#FAF8F5] flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setActiveConvId('')}
                    className="md:hidden p-1.5 rounded-xl text-stone-500 hover:bg-stone-200"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>

                  <img
                    src={activeConv.participantAvatar}
                    alt={activeConv.participantName}
                    className="w-10 h-10 rounded-2xl object-cover"
                  />
                  <div>
                    <h3 className="text-sm font-bold text-charcoal-900">
                      {activeConv.participantName}
                    </h3>
                    <span className="text-[11px] text-emerald-700 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      {t('common.active')}
                    </span>
                  </div>
                </div>

                {/* Product Context Quick Card */}
                {activeConv.itemId && (
                  <Link
                    to={`/product/${activeConv.itemId}`}
                    className="hidden sm:flex items-center gap-2 p-2 rounded-2xl bg-white border border-stone-200 hover:border-emerald-600 shadow-sm transition max-w-xs text-left"
                  >
                    {activeConv.itemImage && (
                      <img
                        src={activeConv.itemImage}
                        alt=""
                        className="w-10 h-10 rounded-xl object-cover bg-stone-100 flex-shrink-0"
                      />
                    )}
                    <div className="min-w-0">
                      <div className="text-[11px] font-bold text-charcoal-900 truncate">
                        {activeConv.itemTitle}
                      </div>
                      <div className="text-[11px] font-bold text-emerald-800">
                        {formatCurrency(activeConv.itemPrice)}
                      </div>
                    </div>
                  </Link>
                )}
              </div>

              {/* Messages Body */}
              <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-cream-50/40">
                {activeConv.messages?.map(msg => {
                  const isMe = msg.senderId === user?.id;
                  return (
                    <div
                      key={msg.id}
                      className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-md rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed shadow-sm ${
                          isMe
                            ? 'bg-emerald-800 text-white rounded-br-none'
                            : 'bg-white text-charcoal-900 border border-stone-200 rounded-bl-none'
                        }`}
                      >
                        <p>{msg.text}</p>
                        <div
                          className={`text-[10px] mt-1 text-right ${
                            isMe ? 'text-emerald-200' : 'text-stone-400'
                          }`}
                        >
                          {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Input Field */}
              <form onSubmit={handleSend} className="p-4 border-t border-stone-200 bg-white flex items-center gap-2">
                <input
                  type="text"
                  placeholder={t('messages.typeMessage')}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="flex-1 bg-[#FAF8F5] focus:bg-white border border-stone-200 focus:border-emerald-600 rounded-2xl px-4 py-3 text-sm text-charcoal-900 focus:outline-none transition"
                />
                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className="p-3 rounded-2xl bg-emerald-800 hover:bg-emerald-900 disabled:opacity-40 text-white shadow-md transition"
                >
                  <Send className="w-5 h-5 text-emerald-200" />
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-stone-400">
              <MessageSquare className="w-12 h-12 mb-2 stroke-1" />
              <p className="text-sm font-semibold">{t('messages.noChats')}</p>
              <p className="text-xs">{t('messages.noChatsDesc')}</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
