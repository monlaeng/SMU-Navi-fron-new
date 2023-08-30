import React, { useState } from 'react';
import styled from 'styled-components';
import listBt from './../../img/originHamburger.svg';
import clickedHam from './../../img/hamburger.svg';
import logo from './../../img/mobileLogo.svg';
import { useNavigate } from 'react-router-dom';
import profile from './../../img/profileIcon.svg';

const Container = styled.div`
  width: 100vw;
  height: auto;
  margin: 0;
  padding: 10px 10px 0 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
`;

const ListImage = styled.img`
  width: 30px;
  margin-left: 10px;
  height: auto;
  cursor: pointer;
`;

const ListOpenImage = styled.img`
  width: 40px;
  margin-top: 5px;
  height: auto;
  cursor: pointer;
`

const LogoImage = styled.img`
  width: 110px;
  height: 60px;
  cursor: pointer;
`;

const ProfileImage = styled.img`
  width: 30px;
  height: 30px;
  cursor: pointer;
`;

const NavContainer = styled.div`
  position: absolute;
  top: 60px;
  left: ${({ isOpen }) => (isOpen ? '0' : '-100%')};
  width: 100%;
  height: calc(100% - 60px);
  background-color: #F1F4FF;
  transition: left 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; 
  z-index: 1;
`;

const NavLink = styled.div`
  font-size: 25px;
  font-weight: bolder;
  padding: 20px 10px;
  color: #57558C;
`;

const NavLine = styled.div`
  width: 70%;
  background-color: #57558C;
  height: 2px;
`;

const Mobile_Main_Logo = () => {
    const navigate = useNavigate();
    const [isNavOpen, setIsNavOpen] = useState(false);
    const onLogin = (e) => {
        navigate('/login');
    }

    const toCCTV = (e) => {
        navigate('/CCTV');
    }
    const handleListImageClick = () => {
        setIsNavOpen((prev) => !prev);
    };

    const handleLogoClick = () => {
        setIsNavOpen(false);
    };

    return (
        <Container>
            { isNavOpen ?
                <ListOpenImage
                    src={clickedHam}
                    onClick={handleListImageClick}
                /> : <ListImage
                    src={listBt}
                    onClick={handleListImageClick}
                />
            }

            <LogoImage src={logo} onClick={handleLogoClick} />
            <ProfileImage src={profile} onClick={onLogin}/>
            {/* 스르륵 열리는 내비게이션 바 */}
            <NavContainer isOpen={isNavOpen}>
                <NavLink>시위 확인하기</NavLink>
                <NavLine></NavLine>
                <NavLink>교통 제보하기</NavLink>
                <NavLine></NavLine>
                <NavLink>꿀팁 확인하기</NavLink>
                <NavLine></NavLine>
                <NavLink onClick={toCCTV}>CCTV 확인하기</NavLink>
            </NavContainer>
        </Container>
    );
};

export default Mobile_Main_Logo;
