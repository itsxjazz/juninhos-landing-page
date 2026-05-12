export function maskPhone(value: string): string {
  if (!value) return '';
  let v = value.replace(/\D/g, '');
  v = v.replace(/(\d{2})(\d)/, '($1) $2');
  v = v.replace(/(\d{5})(\d)/, '$1-$2');
  return v.substring(0, 15);
}
