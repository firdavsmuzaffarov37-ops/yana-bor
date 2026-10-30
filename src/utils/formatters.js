/**
 * Formats a numeric price into Uzbekistani So'm (UZS) with space separators
 * e.g. 2650000 -> "2 650 000 so‘m"
 */
export const formatUZS = (price) => {
  if (price === undefined || price === null || isNaN(price)) return '0 so‘m';
  return new Intl.NumberFormat('ru-RU').format(Math.round(price)) + ' so‘m';
};

/**
 * Returns color classes and labels for conditions
 */
export const getConditionStyle = (condition) => {
  switch (condition) {
    case 'Yangi':
      return {
        bg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
        dot: 'bg-emerald-500',
        badge: 'Yangi',
        labelRu: 'Новый'
      };
    case 'Yangidek':
      return {
        bg: 'bg-teal-50 text-teal-800 border-teal-200',
        dot: 'bg-teal-500',
        badge: 'Yangidek (A’lo)',
        labelRu: 'Как новый'
      };
    case 'Yaxshi':
      return {
        bg: 'bg-amber-50 text-amber-900 border-amber-200',
        dot: 'bg-amber-500',
        badge: 'Yaxshi',
        labelRu: 'Хорошее'
      };
    case 'O‘rtacha':
    case 'Ortacha':
      return {
        bg: 'bg-stone-100 text-stone-700 border-stone-300',
        dot: 'bg-stone-500',
        badge: 'O‘rtacha',
        labelRu: 'Среднее'
      };
    default:
      return {
        bg: 'bg-gray-100 text-gray-700 border-gray-200',
        dot: 'bg-gray-400',
        badge: condition || 'Ikkinchi qo‘l',
        labelRu: 'Б/У'
      };
  }
};

/**
 * Formats date into readable localized Uzbek string
 */
export const formatListingDate = (isoString) => {
  if (!isoString) return '';
  const date = new Date(isoString);
  const now = new Date();
  const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Bugun';
  if (diffDays === 1) return 'Kecha';
  if (diffDays < 7) return `${diffDays} kun oldin`;

  return date.toLocaleDateString('uz-UZ', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
};
