create table if not exists public.cityquest_sessions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  edition_id text not null,
  team_name text not null,
  level text not null default 'A2/B1',
  duration_minutes integer not null default 20,
  current_mission integer not null default 0,
  state jsonb not null default '{}'::jsonb,
  is_active boolean not null default true
);

create table if not exists public.cityquest_events (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  session_id uuid references public.cityquest_sessions(id) on delete cascade,
  event_type text not null,
  payload jsonb not null default '{}'::jsonb
);
