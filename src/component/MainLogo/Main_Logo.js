import React, { useEffect } from 'react';
import './Main_Logo.css';
import Logo from '../../img/realLogo.svg';
import info from './../../img/information.png';
import speaker from './../../img/speaker.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Main_Logo(){
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const onLogin = (e) => {
        navigate('/login');
    }

    const moveMain = (e) => {
        navigate('/');
    }

    const handleInfoClick = () => {
        window.open('https://www.notion.so/e589d4fd817e4bc39906195be6de7b70?pvs=4', '_blank')
    }

    const handleSpeakerClick = () => {
        window.open('https://forms.gle/F9fp24XeiRdvqiCZ9', '_blank')
    }

    function refreshToken(){
        axios({
            method: 'post',
            url: 'https://www.smnavi.me/api/user/refresh',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
        }).then((res) => {
            localStorage.setItem('token', res.data.data.token)
            onLogout();
        })
    }

    useEffect(() => {
        // console.log(new Date().getTime() + 30 * 60 * 1000);
        // if (new Date().getTime() + 30 * 60 * 1000 >= expiredIn) {
        //     리프레쉬
        // }
    })

    const onLogout = (e) => {
        axios({
            url: 'https://www.smnavi.me/api/user/logout',
            method: 'post',
            headers:{
                "Authorization": "Bearer " + token,
            },
        }).then((res) => {
            alert('로그아웃 되었습니다.');
            localStorage.clear();
            window.location.reload();
            // console.log(res.statusCode)
        }).catch((error) => {
            if(error.response.status === 401){
                refreshToken();
                alert('로그아웃 되었습니다.');
                localStorage.clear();
                window.location.reload();
            }else{
                alert('로그아웃할 수 없습니다.');
            }
        })
    }

    return(
        <div className={"Main_logo_title_wrap"}>
            <div id={"MainLogo"}><img src={Logo} onClick={moveMain}/></div>
            <div id={"LoginIconWrap"}>
                <img src={info} id={"infoIcon"} onClick={handleInfoClick} />
                <img src={speaker} id={"speakerIcon"} onClick={handleSpeakerClick}/>
                { token ?
                    <button id={"loginBtn"} type="button" onClick={onLogout}>로그아웃</button>
                    : <button id={"loginBtn"} type="button" onClick={onLogin}>로그인</button>
                }
            </div>
        </div>
    )
}
