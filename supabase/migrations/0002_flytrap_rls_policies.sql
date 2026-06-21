alter table public.component_registry enable row level security;
alter table public.component_adoption enable row level security;
alter table public.apca_audit enable row level security;
alter table public.ds_context enable row level security;

create policy "registry public read" on public.component_registry
  for select to anon, authenticated using (true);
create policy "adoption public read" on public.component_adoption
  for select to anon, authenticated using (true);
create policy "apca public read" on public.apca_audit
  for select to anon, authenticated using (true);

-- ds_context: sem policy = sem acesso anon. RAG só via Edge (service_role).
-- escrita em todas as tabelas: só via Edge (service_role ignora RLS).
