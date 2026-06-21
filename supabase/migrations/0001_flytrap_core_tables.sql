create extension if not exists vector with schema extensions;

create table public.component_registry (
  name text primary key,
  layer text not null check (layer in ('base','chart','ai')),
  status text not null default 'alpha' check (status in ('alpha','beta','stable','deprecated')),
  shadcn_base text[] default '{}',
  tokens text[] default '{}',
  description text,
  updated_at timestamptz not null default now()
);

create table public.component_adoption (
  id uuid primary key default gen_random_uuid(),
  squad text not null,
  component text not null references public.component_registry(name) on delete cascade,
  version text,
  usages int not null default 0,
  hardcoded_values int not null default 0,
  adherence numeric(5,2) check (adherence between 0 and 100),
  measured_at timestamptz not null default now()
);
create index on public.component_adoption (component);
create index on public.component_adoption (squad);

create table public.apca_audit (
  id bigserial primary key,
  token_pair text not null,
  mode text not null check (mode in ('light','dark','vibrant')),
  role text not null check (role in ('body','ui','large','nontext')),
  lc numeric(5,1) not null,
  target numeric(5,1) not null,
  passed boolean not null,
  run_at timestamptz not null default now()
);
create index on public.apca_audit (passed);

create table public.ds_context (
  id bigserial primary key,
  source text not null,
  chunk text not null,
  embedding extensions.vector(1024),
  created_at timestamptz not null default now()
);
