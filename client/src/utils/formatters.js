/**
 * Форматирует продолжительность видео из секунд в формат ЧЧ:ММ:СС или ММ:СС
 * @param {number} seconds - Продолжительность в секундах
 * @returns {string} - Отформатированная строка времени
 */
export const formatDuration = (seconds) => {
  if (!seconds) return "00:00";

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(secs).padStart(2, "0");

  if (hours > 0) {
    const formattedHours = String(hours).padStart(2, "0");
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }

  return `${formattedMinutes}:${formattedSeconds}`;
};

/**
 * Форматирует дату создания видео
 * @param {string} dateString - Строка даты
 * @returns {string} - Отформатированная дата
 */
export const formatDate = (dateString) => {
  if (!dateString) return "";

  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return "Сегодня";
  } else if (diffDays === 1) {
    return "Вчера";
  } else if (diffDays < 7) {
    return `${diffDays} дн. назад`;
  } else if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return `${weeks} нед. назад`;
  } else if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return `${months} мес. назад`;
  } else {
    const years = Math.floor(diffDays / 365);
    return `${years} г. назад`;
  }
};
