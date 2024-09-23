export const getRelativeTime = (date) => {
  const now = new Date();
  const past = new Date(date);
  const diffInSeconds = Math.floor((now - past) / 1000);

  const secondsInMinute = 60;
  const secondsInHour = 60 * secondsInMinute;
  const secondsInDay = 24 * secondsInHour;
  const secondsInWeek = 7 * secondsInDay;
  const secondsInMonth = 30 * secondsInDay;

  if (diffInSeconds < secondsInMinute) {
    return "agora mesmo";
  } else if (diffInSeconds < secondsInHour) {
    const minutes = Math.floor(diffInSeconds / secondsInMinute);
    return `${minutes} minuto${minutes > 1 ? "s" : ""} atrás`;
  } else if (diffInSeconds < secondsInDay) {
    const hours = Math.floor(diffInSeconds / secondsInHour);
    return `${hours} hora${hours > 1 ? "s" : ""} atrás`;
  } else if (diffInSeconds < secondsInWeek) {
    const days = Math.floor(diffInSeconds / secondsInDay);
    return `${days} dia${days > 1 ? "s" : ""} atrás`;
  } else if (diffInSeconds < secondsInMonth) {
    const weeks = Math.floor(diffInSeconds / secondsInWeek);
    return `${weeks} semana${weeks > 1 ? "s" : ""} atrás`;
  } else {
    const months = Math.floor(diffInSeconds / secondsInMonth);
    return `${months} mês${months > 1 ? "es" : ""} atrás`;
  }
};
