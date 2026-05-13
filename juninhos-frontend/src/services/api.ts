import { CONFIG } from '../config';
import type { ApiResponse } from '../types';

const TOKEN_KEY = 'auth_token';

function authHeader(): Record<string, string> {
  const token = localStorage.getItem(TOKEN_KEY);
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function parseJsonSafe<T>(response: Response): Promise<T> {
  const text = await response.text();
  try {
    return JSON.parse(text) as T;
  } catch {
    throw new Error(
      response.ok
        ? 'Resposta inesperada do servidor.'
        : `Servidor respondeu ${response.status}. Verifique se o backend está rodando.`,
    );
  }
}

export const ApiService = {
  // ----- Endpoints públicos (API_BASE_URL) -----
  async fetchData<T>(endpoint: string): Promise<T | null> {
    try {
      const response = await fetch(`${CONFIG.API_BASE_URL}${endpoint}`);
      if (!response.ok) throw new Error('Waking up');
      return (await response.json()) as T;
    } catch {
      return null;
    }
  },

  async postData<T extends ApiResponse>(endpoint: string, data: unknown): Promise<T> {
    const response = await fetch(`${CONFIG.API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await parseJsonSafe<T & { error?: string }>(response);
    if (!response.ok) throw new Error(result.error || 'Erro');
    return result;
  },

  // ----- Endpoints de auth/portal (AUTH_BASE_URL) -----
  async postAuth<T extends ApiResponse>(endpoint: string, data: unknown): Promise<T> {
    const response = await fetch(`${CONFIG.AUTH_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await parseJsonSafe<T & { error?: string }>(response);
    if (!response.ok) throw new Error(result.error || 'Erro');
    return result;
  },

  async fetchAuth<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${CONFIG.AUTH_BASE_URL}${endpoint}`, {
      headers: { ...authHeader() },
    });
    const result = await parseJsonSafe<T & { error?: string }>(response);
    if (!response.ok) throw new Error(result.error || 'Erro');
    return result;
  },
};
