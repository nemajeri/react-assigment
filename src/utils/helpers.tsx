export const convertDate = (milis: string): string => {
  if (isNaN(Number(milis))) throw new Error('Parameter is not a number');
  let date = new Date(milis),
    month = '' + (date.getMonth() + 1),
    day = '' + date.getDate(),
    year = date.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [day, month, year].join('/');
};

export const firstLetterUppercase = (s: string): string => {
  if (s.length <= 1) throw new Error('Invalid header');
  return s.charAt(0).toUpperCase() + s.slice(1).replace(/,/g, '');
};
