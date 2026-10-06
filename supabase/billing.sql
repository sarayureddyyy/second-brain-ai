-- Run once in your Supabase project's SQL Editor.
-- Only server-side service-role requests can read/write billing identities.
create table if not exists public.billing_customers (
  user_id uuid not null references auth.users(id) on delete cascade,
  livemode boolean not null default false,
  stripe_customer_id text not null unique,
  created_at timestamptz not null default now(),
  primary key (user_id, livemode)
);
alter table public.billing_customers enable row level security;
revoke all on public.billing_customers from anon, authenticated;
grant all on public.billing_customers to service_role;
