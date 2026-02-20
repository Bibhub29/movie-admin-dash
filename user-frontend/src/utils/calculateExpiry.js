export const calculateExpiry = (date) => {
  const now = Date.now();
  const expiry = new Date(date).getTime();
  const days = Math.ceil((expiry - now) / (1000 * 60 * 60 * 24));
  return `${Math.max(days, 0)} day(s) left`;
};
