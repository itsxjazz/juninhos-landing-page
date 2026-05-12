import { CONFIG } from '../config';
import type { ApiResponse } from '../types';

export const ApiService = {
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
    const result = (await response.json()) as T;
    if (!response.ok) throw new Error(result.error || 'Erro');
    return result;
  },
};
