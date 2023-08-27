import React from 'react';
import './Main_Logo.css';
import Logo from '../../img/realLogo.svg';
import { useNavigate } from 'react-router-dom';


export default function Main_Logo(){
    const navigate = useNavigate();
    const onLogin = (e) => {
        navigate('/login');
    }

    const moveMain = (e) => {
        navigate('/');
    }

    return(
        <div className={"Main_logo_title_wrap"}>
            <div id={"MainLogo"}><img src={Logo} onClick={moveMain}/></div>
            <button id={"loginBtn"} type="button" onClick={onLogin}>로그인</button>
        </div>
    )
}
