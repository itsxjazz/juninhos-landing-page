// Remove combining diacritical marks (U+0300 to U+036F)
const DIACRITICS = new RegExp('[̀-ͯ]', 'g');

export function formatStatusClass(status?: string): string {
  if (!status) return 'default';
  return status
    .toLowerCase()
    .replace(/\s+/g, '-')
    .normalize('NFD')
    .replace(DIACRITICS, '');
}
