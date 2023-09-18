import React, { useState } from 'react';
import styled from 'styled-components';
import listBt from './../../img/originHamburger.svg';
import clickedHam from './../../img/hamburger.svg';
import logo from './../../img/mobileLogo.svg';
import { useNavigate } from 'react-router-dom';
import profile from './../../img/profileIcon.svg';
import info from './../../img/information.png';
import sound from './../../img/speaker.png';

const Container = styled.div`
  width: 100vw;
  height: 50px;
  margin: 0;
  padding: 10px 10px 0 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
`;

const ListImage = styled.img`
  width: 20px;
  margin-left: 10px;
  height: auto;
  cursor: pointer;
`;

const ListOpenImage = styled.img`
  width: 40px;
  margin-top: 7px;
  height: auto;
  cursor: pointer;
`

const LogoImage = styled.img`
  position: absolute;
  left: 40%;
  top: 0;
  width: 90px;
  height: 50px;
  cursor: pointer;
`;

const ProfileIconWrap = styled.div`
  display: flex;
`

const InfoImage = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
  margin-right: 10px;
`

const ProfileImage = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const NavContainer = styled.div`
  position: absolute;
  top: 50px;
  left: ${({ isOpen }) => (isOpen ? '0' : '-100%')};
  width: 100%;
  height: calc(100% - 50px);
  background-color: #F1F4FF;
  transition: left 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; 
  z-index: 100;
`;

const NavLink = styled.div`
  font-size: 20px;
  font-weight: bolder;
  padding: 20px 10px;
  color: #57558C;
  cursor: pointer;
`;

const NavLine = styled.div`
  width: 60%;
  background-color: #57558C;
  height: 1.5px;
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

    const toMain = (e) => {
        navigate('/')
    }

    const toTip = (e) => {
        navigate('/tip')
    }

    const toTraffic = (e) => {
        navigate('/report_traffic');
    }
    const handleListImageClick = () => {
        setIsNavOpen((prev) => !prev);
    };

    const handleInfoClick = () => {
        window.open('https://www.notion.so/e589d4fd817e4bc39906195be6de7b70?pvs=4', '_blank')
    }

    const handleSpeakerClick = () => {
        window.open('https://forms.gle/F9fp24XeiRdvqiCZ9', '_blank')
    }

    const handleLogoClick = () => {
        setIsNavOpen(false);
        navigate('/')
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
            <ProfileIconWrap>
                <InfoImage src={info} onClick={handleInfoClick} />
                <ProfileImage src={profile} onClick={onLogin}/>
            </ProfileIconWrap>
            {/* 스르륵 열리는 내비게이션 바 */}
            <NavContainer isOpen={isNavOpen}>
                <NavLink onClick={toMain}>지도 확인하기</NavLink>
                <NavLine></NavLine>
                <NavLink onClick={toTraffic}>교통 제보하기</NavLink>
                <NavLine></NavLine>
                <NavLink onClick={toTip}>꿀팁 확인하기</NavLink>
                <NavLine></NavLine>
                <NavLink onClick={toCCTV}>CCTV 확인하기</NavLink>
                <NavLine></NavLine>
                <NavLink onClick={handleSpeakerClick}>피드백 하러 가기</NavLink>
            </NavContainer>
        </Container>
    );
};

export default Mobile_Main_Logo;
