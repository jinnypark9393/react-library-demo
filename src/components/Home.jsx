import React, { useState } from 'react';
import { useBooks, useSearchBooks } from '../hooks/useBooks'; // useInfiniteBooks 대신 useBooks 임포트
import { CircularProgress, Box } from '@mui/material'; // CircularProgress, Box 임포트 추가

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [query, setQuery] = useState('');

  // 초기 도서 목록 (useBooks 훅 사용)
  const {
    data: initialBookData,
    isLoading: isLoadingBooks,
    isError: isErrorBooks,
    error: errorBooks,
  } = useBooks();

  // 도서 검색 (기존과 동일)
  const {
      data: searchResults,
      isLoading: isLoadingSearch,
      isError: isErrorSearch,
      error: errorSearch,
  } = useSearchBooks(query);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setQuery(searchTerm);
  };

  // 초기 로딩 상태 처리
  if (isLoadingBooks && !query) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }
  if (isErrorBooks && !query) return <div>오류 발생: {errorBooks.message}</div>;

  // 검색 결과 또는 초기 도서 목록 렌더링
  // query가 있으면 검색 결과, 없으면 초기 로딩된 도서 목록 사용
  const booksToDisplay = query ? searchResults?.books : initialBookData?.books;
  const totalResults = query ? searchResults?.totalResults : initialBookData?.totalResults;
  const listTitle = query ? `"${query}" 검색 결과 (${totalResults || 0}건)` : `추천 도서 목록 (${booksToDisplay?.length || 0}건)`; // 초기 목록은 실제 표시된 개수 표시

  const renderBook = (book) => (
    <li key={book.key || book.isbn?.[0]} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px', listStyle: 'none', display: 'flex', alignItems: 'center' }}>
      {book.cover_i && (
        <img
          src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
          alt={`${book.title} cover`}
          style={{ width: '60px', height:'auto', marginRight: '15px', flexShrink: 0 }} // 이미지 크기 조정
          onError={(e) => { e.target.style.display = 'none'; }}
        />
      )}
      <div>
        <h4 style={{ marginTop: 0, marginBottom: '5px' }}>{book.title}</h4>
        <p style={{ margin: '0 0 5px 0' }}>저자: {book.author_name?.join(', ') || '정보 없음'}</p>
        <p style={{ margin: 0 }}>첫 출판년도: {book.first_publish_year || '정보 없음'}</p>
      </div>
    </li>
  );


  return (
    <div>
      <form onSubmit={handleSearchSubmit} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="도서 검색..."
          value={searchTerm}
          onChange={handleSearchChange}
          style={{ padding: '8px', marginRight: '5px' }}
        />
        <button type="submit" style={{ padding: '8px 12px' }} disabled={isLoadingSearch}>
          {isLoadingSearch ? '검색 중...' : '검색'}
        </button>
        {query && (
            <button type="button" onClick={() => { setQuery(''); setSearchTerm(''); }} style={{ padding: '8px 12px', marginLeft: '5px' }}>
                목록 보기
            </button>
        )}
      </form>

      {/* 로딩 스피너 표시 */} 
      {isLoadingSearch && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}> {/* 중앙 정렬 및 마진 추가 */} 
          <CircularProgress />
        </Box>
      )}
      {isErrorSearch && <div>검색 오류: {errorSearch.message}</div>}

      <h2>{listTitle}</h2>
       {booksToDisplay && booksToDisplay.length > 0 ? (
           <ul style={{ padding: 0 }}>
                {booksToDisplay.map(renderBook)}
           </ul>
        ) : (
             !(isLoadingBooks && !query) && !(isLoadingSearch && query) &&
             <div>{query ? '검색 결과가 없습니다.' : '도서를 찾을 수 없습니다.'}</div>
        )
       }

    </div>
  );
};

export default Home;
