import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const OPEN_LIBRARY_API = 'https://openlibrary.org';

const fetchInitialBooks = async () => {
  const response = await axios.get(`${OPEN_LIBRARY_API}/search.json`, {
    params: {
      q: 'subject:fiction', // 예시: 'fiction' 주제의 책 (다른 기준으로 변경 가능)
      limit: 10, // 10개만 가져오도록 설정
      fields: 'key,title,author_name,first_publish_year,cover_i,isbn', // 필요한 필드 요청
    },
  });
  return {
    books: response.data.docs,
    totalResults: response.data.numFound, // 전체 결과 수는 여전히 유용할 수 있음
  };
};

// 도서 검색하기 (기존과 동일)
const searchBooks = async (query) => {
    if (!query) return { books: [], totalResults: 0 };

    const response = await axios.get(`${OPEN_LIBRARY_API}/search.json`, {
        params: {
          q: query,
          limit: 50, // 검색 결과 제한
          fields: 'key,title,author_name,first_publish_year,cover_i,isbn',
        },
      });
      return {
        books: response.data.docs,
        totalResults: response.data.numFound,
      };
}

export const useBooks = () => {
  return useQuery({
    queryKey: ['initialBooks'], // 고유한 키 사용
    queryFn: fetchInitialBooks,
  });
};


// 도서 검색을 위한 커스텀 훅 (기존과 동일)
export const useSearchBooks = (query) => {
    return useQuery({
        queryKey: ['searchBooks', query],
        queryFn: () => searchBooks(query),
        enabled: !!query,
        staleTime: 5 * 60 * 1000,
    });
}