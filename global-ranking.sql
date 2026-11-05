-- MathQuest: ranking global por XP
-- Execute este arquivo uma única vez no SQL Editor do Supabase.
create table if not exists public.global_rankings (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null default 'Matemático',
  xp integer not null default 0 check (xp >= 0),
  correct_answers integer not null default 0 check (correct_answers >= 0),
  updated_at timestamptz not null default now()
);
alter table public.global_rankings enable row level security;
drop policy if exists "Ranking global visivel para todos" on public.global_rankings;
create policy "Ranking global visivel para todos"
  on public.global_rankings for select
  using (true);
drop policy if exists "Jogador cria seu proprio ranking" on public.global_rankings;
create policy "Jogador cria seu proprio ranking"
  on public.global_rankings for insert
  to authenticated
  with check (auth.uid() = user_id);
drop policy if exists "Jogador atualiza seu proprio ranking" on public.global_rankings;
create policy "Jogador atualiza seu proprio ranking"
  on public.global_rankings for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
grant select on public.global_rankings to anon, authenticated;
grant insert, update on public.global_rankings to authenticated;
