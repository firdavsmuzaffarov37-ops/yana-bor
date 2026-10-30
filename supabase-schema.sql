-- ========================================================
-- YANABOR - PREMIUM SECOND-HAND MARKETPLACE UZBEKISTAN
-- Supabase PostgreSQL Schema with Row Level Security (RLS)
-- ========================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES (Users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE,
  phone TEXT,
  avatar_url TEXT,
  city TEXT,
  district TEXT,
  bio TEXT,
  is_verified BOOLEAN DEFAULT FALSE,
  rating NUMERIC(3, 2) DEFAULT 5.0,
  reviews_count INT DEFAULT 0,
  completed_exchanges INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. CATEGORIES
CREATE TABLE IF NOT EXISTS public.categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  name_en TEXT NOT NULL,
  icon_name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. LISTINGS
CREATE TABLE IF NOT EXISTS public.listings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  seller_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  category_id TEXT REFERENCES public.categories(id),
  price BIGINT NOT NULL CHECK (price >= 0),
  original_price BIGINT,
  condition TEXT NOT NULL CHECK (condition IN ('Yangi', 'Yangidek', 'Yaxshi', 'O‘rtacha')),
  condition_score NUMERIC(3, 1) DEFAULT 9.0,
  description TEXT NOT NULL,
  region_id TEXT NOT NULL,
  region_name TEXT NOT NULL,
  district TEXT,
  address_hint TEXT,
  pickup_window TEXT,
  images TEXT[] NOT NULL DEFAULT '{}',
  is_exchangeable BOOLEAN DEFAULT FALSE,
  exchange_preferences TEXT,
  contact_preference TEXT DEFAULT 'YanaBor xabarlar orqali',
  views INT DEFAULT 0,
  is_featured BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. FAVORITES
CREATE TABLE IF NOT EXISTS public.favorites (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  listing_id UUID REFERENCES public.listings(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_id, listing_id)
);

-- 5. PURCHASE INQUIRIES
CREATE TABLE IF NOT EXISTS public.purchase_inquiries (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  listing_id UUID REFERENCES public.listings(id) ON DELETE CASCADE NOT NULL,
  seller_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  buyer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  offer_price BIGINT,
  message TEXT NOT NULL,
  contact_phone TEXT,
  status TEXT DEFAULT 'Pending' CHECK (status IN ('Pending', 'Accepted', 'Declined', 'Completed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. EXCHANGE PROPOSALS
CREATE TABLE IF NOT EXISTS public.exchange_proposals (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  proposer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  target_seller_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  requested_listing_id UUID REFERENCES public.listings(id) ON DELETE CASCADE NOT NULL,
  offered_listing_id UUID REFERENCES public.listings(id) ON DELETE CASCADE NOT NULL,
  message TEXT,
  cash_adjustment BIGINT DEFAULT 0,
  status TEXT DEFAULT 'Pending' CHECK (status IN ('Pending', 'Accepted', 'Declined', 'Cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. CONVERSATIONS & MESSAGES
CREATE TABLE IF NOT EXISTS public.conversations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  participant1_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  participant2_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  listing_id UUID REFERENCES public.listings(id) ON DELETE SET NULL,
  last_message TEXT,
  last_message_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  conversation_id UUID REFERENCES public.conversations(id) ON DELETE CASCADE NOT NULL,
  sender_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  text TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. REVIEWS
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  reviewer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  target_user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  listing_id UUID REFERENCES public.listings(id) ON DELETE SET NULL,
  rating INT CHECK (rating >= 1 AND rating <= 5) NOT NULL,
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ========================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ========================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.purchase_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exchange_proposals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Public can read active listings and public profiles
CREATE POLICY "Public profiles are readable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Active listings are viewable by everyone" ON public.listings FOR SELECT USING (is_active = true OR auth.uid() = seller_id);
CREATE POLICY "Authenticated users can create listings" ON public.listings FOR INSERT WITH CHECK (auth.uid() = seller_id);
CREATE POLICY "Users can update own listings" ON public.listings FOR UPDATE USING (auth.uid() = seller_id);
CREATE POLICY "Users can delete own listings" ON public.listings FOR DELETE USING (auth.uid() = seller_id);

CREATE POLICY "Users can manage own favorites" ON public.favorites FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Inquiries viewable by buyer or seller" ON public.purchase_inquiries FOR SELECT USING (auth.uid() = buyer_id OR auth.uid() = seller_id);
CREATE POLICY "Buyers can insert inquiries" ON public.purchase_inquiries FOR INSERT WITH CHECK (auth.uid() = buyer_id);

CREATE POLICY "Proposals viewable by both parties" ON public.exchange_proposals FOR SELECT USING (auth.uid() = proposer_id OR auth.uid() = target_seller_id);
CREATE POLICY "Proposers can insert exchange" ON public.exchange_proposals FOR INSERT WITH CHECK (auth.uid() = proposer_id);
CREATE POLICY "Parties can update proposal status" ON public.exchange_proposals FOR UPDATE USING (auth.uid() = proposer_id OR auth.uid() = target_seller_id);

CREATE POLICY "Messages readable by conversation participants" ON public.messages FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.conversations c 
    WHERE c.id = conversation_id AND (c.participant1_id = auth.uid() OR c.participant2_id = auth.uid())
  )
);
CREATE POLICY "Messages insertable by sender in conversation" ON public.messages FOR INSERT WITH CHECK (auth.uid() = sender_id);
