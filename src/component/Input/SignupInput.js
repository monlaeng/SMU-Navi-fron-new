import './Input.css';
import React from "react";
import axios from 'axios';
import $ from 'jquery';
import Button from './../Button/Button.js';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function SignupInput(){
    const navigate = useNavigate();

    const [userName, isUserName] = useState('');
    const [sendPw, isSendPw] = useState('');

    // 비밀번호, 비밀번호 확인 정규식 검사
    const [passwordError, setPasswordError] = React.useState("");
    const [confirmPasswordError, setConfirmPasswordError] = React.useState('');

    // 비밀번호, 비밀번호 확인 에러메시지
    const [password, setPassword] = React.useState("");
    const [passwordChk, setPasswordChk] = React.useState("");

    // 이메일
    const [emailChk ,setEmailChk] = React.useState();

    // 인증번호
    const [certificationNum, setCertificationNum] = React.useState("");

    //닉네임 중복확인 여부
    const [sameNameChk, setSameNameChk] = React.useState(false);

    //
    //회원가입 버튼 클릭 여부
    const [signup, setSignup] = useState(false);

    const passwordRegEx = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{4,16}$/;
    const passwordCheck = (e) => {
        const value = e.target.value;
        const pwChangeValue = e.currentTarget.value;
        setPassword(value);
        isSendPw(pwChangeValue);
        if (!passwordRegEx.test(value)) {
            setPasswordError('비밀번호는 영문자 + 숫자 조합이며 특수문자 하나를 포함해야 합니다.(4~12자리)');
        } else {
            setPasswordError('');
        }
    }
    const passwordDoubleCheck = (e) => {
        const value = e.target.value;
        setPasswordChk(value);
        if (value !== password) {
            setConfirmPasswordError('비밀번호와 비밀번호 확인 값이 일치하지 않습니다.');
        } else {
            setConfirmPasswordError('');
        }
    }

    const emailCheck = (e) => {
        const value = e.target.value;
        setEmailChk(value);
    }

    const certificationKey = (e) => {
        const value = e.target.value;
        setCertificationNum(value);
    }

    const userNameCheck = (e) =>{
        isUserName(e.currentTarget.value);
    }

    function sameNameCheck(){
        axios({
            method: 'post',
            url: 'https://www.smnavi.me/api/user/check-duplicate-nickname',
            headers: {
                "Content-Type": `application/json`,
            },
            data: {
                'nickname': userName
            }
        }).then((res) => {
            alert('중복되지 않은 닉네임입니다.');
            setSameNameChk(true);
        })
        .catch((error) => {
            alert('중복되는 닉네임입니다.');
        });
    }
    function signUpSubmit(){
        if(signup == true && sameNameChk == true){
            axios({
                method: 'post',
                url: 'https://www.smnavi.me/api/user/signup',
                headers: {
                    "Content-Type": `application/json`,
                },
                data: {
                    'email' : emailChk + '@sangmyung.kr',
                    'password' : password,
                    'certificationKey' : certificationNum,
                    'nickname': userName
                }
            }).then((res) => {
                alert('회원가입 완료');
                navigate('/login');
            })
            .catch((error) => {
                alert('회원가입 실패');
            });
        }else if(sameNameChk == false){
            alert('닉네임 중복확인을 해주세요');
        }else if(signup == false){
            alert('이메일 인증을 해주세요');
        }

    }

    function emailCertifiCheck() {
        axios({
            method: 'post',
            url: 'https://www.smnavi.me/api/user/send-certification-mail',
            headers: {
                "Content-Type": `application/json`,
            },
            data: {
                'email' : emailChk + '@sangmyung.kr'
            }
        }).then((res) => {
            alert('인증번호가 전송되었습니다.');
        }).catch((error) => {
            alert('인증할 수 없는 메일입니다.')
        })
    }

    function certificationNumCheck() {
        axios({
            method: 'post',
            url: 'https://www.smnavi.me/api/user/certification',
            headers: {
                "Content-Type": `application/json`,
            },
            data: {
                'email' : emailChk + '@sangmyung.kr',
                'certificationCode': certificationNum
            }
        }).then((res) => {
            alert(res.data.message);
            setSignup(true);
        }).catch((data) => {
            alert('인증번호를 다시 입력해주세요');
            setSignup(false);
        })
    }
    return(
        <div className={"signupBox"}>
            <div className={"signupInputBoxWrap"}>
                <p className={"signupInputName"}>닉네임</p>
                <div className={"signupInputNameBox"}>
                    <input type="text" onChange={userNameCheck} id="nameSignupInput"/>
                    <button id="sameNameCheckBt" onClick={sameNameCheck}>중복확인</button>
                    <p id={"redNameTitle"}>이미 등록된 닉네임입니다.</p>
                </div>
            </div>
            <div className={"signupInputBoxWrap"}>
                <p className={"signupInputName"}>비밀번호</p>
                <div>
                    <input type="password" id="pwSignupInput"
                           value={password}
                           onChange={passwordCheck}/>
                </div>
                <p id="redPwTitle">{passwordError}</p>
            </div>
            <div className={"signupInputBoxWrap"}>
                <p className={"signupInputName"}>비밀번호 재확인</p>
                <div style={{ display: 'flex', flexDirection: 'column'}}>
                    <input type="password" id="pwSignupInput"
                           value={passwordChk}
                           onChange={passwordDoubleCheck}/>
                    <p id={"redPwTitle"}>{confirmPasswordError}</p>

                </div>
            </div>
            <div className={"signupInputBoxWrap"}>
                <p className={"signupInputName"}>학번</p>
                <div className={"signupMailInputBox"}>
                    <input type="text" id="mailSignupInput" onChange={emailCheck}/>
                    <p style={{margin: 'auto 5px auto 5px'}}>@</p>
                    <input type="text" id="mailSignupInput" value={"sangmyung.kr"}/>
                    <button id="sameNameCheckBt" onClick={emailCertifiCheck}>전송</button>
                </div>
            </div>
            <div className={"signupInputBoxWrap"}>
                <p className={"signupInputName"}>인증번호 입력</p>
                <div>
                    <input type="text" id="certifyNumInput" onChange={certificationKey}/>
                    <button id="sameNameCheckBt" onClick={certificationNumCheck}>확인</button>
                </div>
                <p id={"redNumTitle"}>잘못된 인증번호입니다.</p>
            </div>
            <button id="signupBt" onClick={signUpSubmit}>가입하기</button>
        </div>
    )
}

export default SignupInput;