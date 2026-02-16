-- ============================================================
-- VIRTUAL PASSPORT — DATABASE SCHEMA
-- Run this in Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- TABLE 1: passports
-- One row per user who has a virtual passport
-- Think of this as the "passport booklet" record
create table passports (
  id          uuid primary key default gen_random_uuid(),
  user_id     text unique not null,          -- ixigo user ID (or any unique identifier)
  slug        text unique not null,          -- URL-friendly ID e.g. "neeraj-kumar"
  passport_number text unique not null,      -- e.g. "VP-2024-83721"
  name        text not null,                 -- full name
  bio         text default '',               -- one-liner bio
  traveler_adjective text default 'The Traveler',
  nationality text default 'Indian',
  profile_photo_url text,                    -- photo URL
  theme       text default 'navy',           -- cover theme: navy/maroon/white
  is_public   boolean default true,          -- can others view this?
  issued_at   timestamptz default now(),
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

-- TABLE 2: trips
-- Each row is one trip (one stamp in the passport)
-- Linked to a passport via passport_id
create table trips (
  id            uuid primary key default gen_random_uuid(),
  passport_id   uuid references passports(id) on delete cascade,
  origin_city          text not null,
  origin_country       text not null,
  origin_country_code  text not null,        -- ISO 2-letter e.g. "IN"
  dest_city            text not null,
  dest_country         text not null,
  dest_country_code    text not null,
  departure_date       date not null,
  return_date          date,                 -- NULL for one-way trips
  flight_number        text,
  airline              text,
  trip_type            text default 'return', -- "one_way" or "return"
  stay_duration        integer default 1,     -- days
  stamp_variant        text default 'circle', -- circle/rectangle/oval/diamond
  is_visible           boolean default true,  -- user can hide specific trips
  created_at           timestamptz default now()
);

-- TABLE 3: passport_views (analytics — track who views which passport)
create table passport_views (
  id           uuid primary key default gen_random_uuid(),
  passport_id  uuid references passports(id) on delete cascade,
  viewed_at    timestamptz default now(),
  referrer     text                           -- "whatsapp", "twitter", "direct"
);

-- TABLE 4: passport_shares (analytics — track share actions)
create table passport_shares (
  id           uuid primary key default gen_random_uuid(),
  passport_id  uuid references passports(id) on delete cascade,
  platform     text not null,                 -- "whatsapp", "twitter", "clipboard"
  shared_at    timestamptz default now()
);

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- This controls WHO can read/write data
-- Since passports are public (shareable links), we allow
-- anyone to READ, but restrict WRITE to authenticated users
-- ============================================================

-- Enable RLS on all tables
alter table passports enable row level security;
alter table trips enable row level security;
alter table passport_views enable row level security;
alter table passport_shares enable row level security;

-- PUBLIC READ: anyone can view public passports
create policy "Public passports are viewable by everyone"
  on passports for select
  using (is_public = true);

-- PUBLIC READ: anyone can view trips for public passports
create policy "Trips are viewable for public passports"
  on trips for select
  using (
    passport_id in (select id from passports where is_public = true)
  );

-- ANYONE can insert views and shares (analytics tracking)
create policy "Anyone can log a view"
  on passport_views for insert
  with check (true);

create policy "Anyone can log a share"
  on passport_shares for insert
  with check (true);

-- ============================================================
-- INDEXES — make common queries fast
-- ============================================================
create index idx_passports_slug on passports(slug);
create index idx_trips_passport_id on trips(passport_id);
create index idx_views_passport_id on passport_views(passport_id);

-- ============================================================
-- SEED DATA — Dummy users and trips
-- ============================================================

-- User 1: Neeraj Kumar
insert into passports (user_id, slug, passport_number, name, bio, traveler_adjective, nationality, theme)
values (
  'user-neeraj-001',
  'neeraj-kumar',
  'VP-2024-83721',
  'Neeraj Kumar',
  'Software engineer by day, globe-trotter by night.',
  'The Wanderer',
  'Indian',
  'navy'
);

-- User 2: Priya Sharma
insert into passports (user_id, slug, passport_number, name, bio, traveler_adjective, nationality, theme)
values (
  'user-priya-002',
  'demo-user',
  'VP-2024-41052',
  'Priya Sharma',
  'Collecting sunsets across continents.',
  'The Explorer',
  'Indian',
  'navy'
);

-- Neeraj's trips (6 trips)
insert into trips (passport_id, origin_city, origin_country, origin_country_code, dest_city, dest_country, dest_country_code, departure_date, return_date, flight_number, airline, trip_type, stay_duration, stamp_variant)
select p.id, t.*
from passports p,
(values
  ('Delhi',     'India', 'IN', 'Paris',   'France',               'FR', '2024-03-15'::date, '2024-03-22'::date, 'AI-142',  'Air India',       'return',  7, 'circle'),
  ('Mumbai',    'India', 'IN', 'Tokyo',   'Japan',                'JP', '2024-06-10'::date, '2024-06-17'::date, '6E-8401', 'IndiGo',          'return',  7, 'rectangle'),
  ('Delhi',     'India', 'IN', 'Dubai',   'United Arab Emirates', 'AE', '2024-08-05'::date, '2024-08-10'::date, 'EK-511',  'Emirates',        'return',  5, 'oval'),
  ('Bangalore', 'India', 'IN', 'Bali',    'Indonesia',            'ID', '2024-10-20'::date, '2024-10-28'::date, 'SG-946',  'SpiceJet',        'return',  8, 'diamond'),
  ('Mumbai',    'India', 'IN', 'London',  'United Kingdom',       'GB', '2025-01-12'::date, '2025-01-20'::date, 'BA-138',  'British Airways',  'return', 8, 'circle'),
  ('Delhi',     'India', 'IN', 'Bangkok', 'Thailand',             'TH', '2025-04-01'::date, null,               'TG-316',  'Thai Airways',    'one_way', 5, 'rectangle')
) as t(origin_city, origin_country, origin_country_code, dest_city, dest_country, dest_country_code, departure_date, return_date, flight_number, airline, trip_type, stay_duration, stamp_variant)
where p.slug = 'neeraj-kumar';

-- Priya's trips (4 trips)
insert into trips (passport_id, origin_city, origin_country, origin_country_code, dest_city, dest_country, dest_country_code, departure_date, return_date, flight_number, airline, trip_type, stay_duration, stamp_variant)
select p.id, t.*
from passports p,
(values
  ('Chennai', 'India', 'IN', 'Singapore', 'Singapore',     'SG', '2024-05-20'::date, '2024-05-25'::date, 'SQ-529',  'Singapore Airlines', 'return', 5, 'circle'),
  ('Kochi',   'India', 'IN', 'Maldives',  'Maldives',      'MV', '2024-09-14'::date, '2024-09-19'::date, 'IX-414',  'Air India Express',  'return', 5, 'oval'),
  ('Delhi',   'India', 'IN', 'New York',  'United States',  'US', '2025-02-10'::date, '2025-02-22'::date, 'AI-101',  'Air India',          'return', 12, 'rectangle'),
  ('Mumbai',  'India', 'IN', 'Istanbul',  'Turkey',         'TR', '2025-06-05'::date, '2025-06-12'::date, 'TK-720',  'Turkish Airlines',   'return', 7, 'diamond')
) as t(origin_city, origin_country, origin_country_code, dest_city, dest_country, dest_country_code, departure_date, return_date, flight_number, airline, trip_type, stay_duration, stamp_variant)
where p.slug = 'demo-user';
