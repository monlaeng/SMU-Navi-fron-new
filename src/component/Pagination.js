import React, { useState, useEffect } from "react";
import styled from "styled-components";

const PageUl = styled.ul`
  list-style: none;
  text-align: center;
  border-radius: 3px;
  color: white;
  padding: 1px;
  color: #0B097A;
`;

const PageLi = styled.li`
  display: inline-block;
  font-size: 17px;
  font-weight: 600;
  padding: 5px;
  width: 25px;
  border-radius: 50%;
  &:hover {
    cursor: pointer;
    color: white;
    background-color: #0B097A;
  }
  &:focus::after {
    color: white;
    background-color: #0B097A;
  }
`;

const PageSpan = styled.span`
  &:hover::after,
  &:focus::after {
    border-radius: 100%;
    color: white;
    background-color: #0B097A;
  }
`;

const Pagination = ({ postsPerPage, totalPosts, currentPage, totalPages, paginate }) => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    // 페이지 범위 설정
    const [pageRange, setPageRange] = useState([1, 1]);
    const [currentPageNum, setCurrentPageNum] = useState(currentPage);

    useEffect(() => {
        setPageRange([1, Math.min(totalPages, 3)]);
    }, [totalPages]);

    const handleNextClick = () => {
        setCurrentPageNum(currentPageNum - 1)
        if (pageRange[1] < totalPages) {
            const newRangeStart = pageRange[1] + 1;
            const newRangeEnd = Math.min(totalPages, newRangeStart + 2); // 최대 세 개의 페이지를 표시
            setPageRange([newRangeStart, newRangeEnd]);
            const newCurrentPage = currentPageNum + 3; // 새로운 현재 페이지 계산
            paginate(newCurrentPage); // 업데이트된 현재 페이지로 업데이트
        }
    };

    const handlePrevClick = () => {
        setCurrentPageNum(currentPageNum + 1)
        if (pageRange[0] > 1) {
            const newRangeEnd = pageRange[0] - 1;
            const newRangeStart = Math.max(1, newRangeEnd - 2); // 최대 세 개의 페이지를 표시
            setPageRange([newRangeStart, newRangeEnd]);
            const newCurrentPage = currentPageNum - 1; // 새로운 현재 페이지 계산
            paginate(newCurrentPage); // 업데이트된 현재 페이지로 업데이트
        }
    };


    return (
        <div>
            <nav>
                <PageUl className="pagination">
                    <PageLi key="prev" className="page-item">
                        <PageSpan
                            onClick={() => {
                                    handlePrevClick();
                            }}
                            className={`page-link ${currentPageNum === 1 ? 'disabled' : ''}`}
                        >
                            {"<"}
                        </PageSpan>
                    </PageLi>
                    {pageNumbers.map((number) => (
                        (number >= pageRange[0] && number <= pageRange[1]) && (
                            <PageLi
                                key={number}
                                className={`page-item`}
                                onClick={() => paginate(number)}
                            >
                                <PageSpan
                                    className={`page-link ${number === currentPageNum ? 'active' : ''}`}
                                >
                                    {number}
                                </PageSpan>
                            </PageLi>
                        )
                    ))}
                    <PageLi key="next" className="page-item">
                        <PageSpan
                            onClick={() => {
                                    handleNextClick();
                            }}
                            className={`page-link ${currentPageNum === totalPages ? 'disabled' : ''}`}
                        >
                            {">"}
                        </PageSpan>
                    </PageLi>
                </PageUl>
            </nav>
        </div>
    );
};

export default Pagination;
