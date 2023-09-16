import React from "react";
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

  &.active::after {
    border-radius: 50%; /* 수정된 부분: 동그라미 스타일 조정 */
    color: white;
    background-color: #0B097A;
    padding: 0; /* 수정된 부분: 동그라미 스타일 조정 */
    content: "●"; /* 동그라미 표시 */
  }
`;

const Pagination = ({ postsPerPage, totalPosts, currentPage, totalPages, paginate }) => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <div>
            <nav>
                <PageUl className="pagination">
                    <PageLi key="prev" className="page-item">
                        <PageSpan
                            onClick={() => paginate(currentPage - 1)}
                            className={`page-link ${currentPage === 1 ? 'disabled' : ''}`}
                        >
                            {"<"}
                        </PageSpan>
                    </PageLi>
                    {pageNumbers.map((number) => (
                        <PageLi
                            key={number}
                            className={`page-item`}
                            onClick={() => paginate(number)}
                        >
                            <PageSpan
                                className={`page-link ${number === currentPage ? 'active' : ''}`}
                            >
                                {number}
                            </PageSpan>
                        </PageLi>
                    ))}
                    <PageLi key="next" className="page-item">
                        <PageSpan
                            onClick={() => paginate(currentPage + 1)}
                            className={`page-link ${currentPage === totalPages ? 'disabled' : ''}`}
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
