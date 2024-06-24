export const CtrateDate = (): string => {
  const data = new Date();

  const month = data.toLocaleString('default', { month: 'long' });
  const day = data.getDate();
  const year = data.getFullYear();

  return `${month} ${day}, ${year}`;
};
