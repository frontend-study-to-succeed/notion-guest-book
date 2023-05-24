import { useState, useCallback } from 'react';

const usePage = (initialPage) => {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const nextPage = useCallback(() => {
    setCurrentPage((prevPage) => prevPage + 1);
  }, []);

  return { currentPage, nextPage };
};

export default usePage;
