// Thin REST client for Emma's Supabase project. The publishable key is
// designed to ship to the browser; row-level security only lets visitors
// read published roles, submit forms and upload a CV — never read them back.
import type { IntroLink, Role } from '../types';

const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL || 'https://yljruntgjvoaobtlpdyd.supabase.co';
const SUPABASE_KEY =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_9M5e_rrofJN2AJs3as2BjA_Ekp2GH7M';

const headers = (extra: Record<string, string> = {}) => ({
  apikey: SUPABASE_KEY,
  ...extra,
});

async function check(res: Response) {
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(body || `Request failed (${res.status})`);
  }
  return res;
}

export async function fetchRoles(): Promise<Role[]> {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/roles?select=slug,title,team,location,employment_type,summary,highlights,requirements&published=eq.true&order=sort.asc`,
    { headers: headers() },
  );
  await check(res);
  return res.json();
}

export async function fetchIntro(slug: string): Promise<IntroLink | null> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/get_intro`, {
    method: 'POST',
    headers: headers({ 'Content-Type': 'application/json' }),
    body: JSON.stringify({ p_slug: slug }),
  });
  await check(res);
  const rows: IntroLink[] = await res.json();
  return rows[0] ?? null;
}

async function insert(table: 'applications' | 'enquiries', row: Record<string, unknown>) {
  const clean = Object.fromEntries(
    Object.entries(row).map(([k, v]) => [k, typeof v === 'string' && v.trim() === '' ? null : v]),
  );
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
    method: 'POST',
    headers: headers({ 'Content-Type': 'application/json', Prefer: 'return=minimal' }),
    body: JSON.stringify(clean),
  });
  await check(res);
}

export const submitApplication = (row: Record<string, unknown>) => insert('applications', row);
export const submitEnquiry = (row: Record<string, unknown>) => insert('enquiries', row);

export async function uploadCv(file: File): Promise<string> {
  const ext = (file.name.split('.').pop() || 'pdf').toLowerCase().replace(/[^a-z]/g, '');
  const path = `${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}.${ext}`;
  const res = await fetch(`${SUPABASE_URL}/storage/v1/object/cvs/${path}`, {
    method: 'POST',
    headers: headers({ 'Content-Type': file.type || 'application/pdf', 'x-upsert': 'false' }),
    body: file,
  });
  await check(res);
  return path;
}
