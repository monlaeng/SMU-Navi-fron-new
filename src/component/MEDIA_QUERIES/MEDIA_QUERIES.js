import styled from "styled-components";
export const MEDIA_QUERIES = {
    pc : '(min-width: 769px)',
    mobile : '(max-width: 768px)',
}

export const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: hidden;
    text-align: center;
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    margin-top: 0vh;
    -ms-overflow-style: none; // IE에서 스크롤바 감춤
    &::-webkit-scrollbar {
    display: none !important; // 윈도우 크롬 등
  }
`