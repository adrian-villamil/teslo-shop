export const generatePaginationNumbers = (currentPage: number, totalPages: number) => {
  // Si el número total de páginas es 7 o menos
  // vamos a mostrar todas las páginas sin puntos suspensivos
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // Si la página actual está entre las primeras 4 páginas.
  // mostrar las primeras 5, puntos suspensivos, y la última página.
  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, '...', totalPages];
  }

  // Si la pagina actual esta entre las últimas 4 páginas
  // mostrar las primera página, puntos suspensivos, las últimas 5 páginas.
  if (currentPage >= totalPages - 3) {
    return [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  }

  // Si la página actual está en otro lugar medio
  // mostrar la primera página, puntos suspensivos, la página actual y vecinos,
  // puntos suspensivos y la última página.
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages
  ];
};