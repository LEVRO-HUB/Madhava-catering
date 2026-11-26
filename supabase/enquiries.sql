-- Run once in the Supabase SQL editor.
-- RLS is ON and there is deliberately NO public policy: the browser can never
-- read or write this table. Only the Cloudflare function (service-role key)
-- inserts, and only the owner reads leads in the Supabase dashboard.
create table if not exists public.enquiries (
  id          bigint generated always as identity primary key,
  created_at  timestamptz not null default now(),
  source      text not null default 'planner',
  name        text not null,
  phone       text not null,
  occasion    text,
  event_date  date,
  guests      text,
  city        text,
  meals       text,
  diet        text,
  menu        text,
  notes       text,
  page        text,
  lang        text,
  status      text not null default 'new'
);
alter table public.enquiries enable row level security;
