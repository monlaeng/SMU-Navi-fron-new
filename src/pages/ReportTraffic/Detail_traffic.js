import React from 'react';
import './ReportTraffic.css';
import MainLogo from '../../component/MainLogo/Main_Logo';
import MenuBar from '../../component/MenuBar/MenuBar';
import Board_list from '../../component/Board_list/Board_list';
import heartLike from '../../img/heartTrue.png';
import heartHate from '../../img/heartFalse.png';
import heartLikeTrue from '../../img/heart.png';
import heartHateTrue from '../../img/heartBreak.png';
import { useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Line from '../../component/Line/Line.js'

function Detail_traffic(){
    const token = localStorage.getItem('token');
    const { id } = useParams();
    const navigate = useNavigate();
    const [contents, setContents] = useState({});
    const [deleteModal, showDeleteModal] = useState(false);
    const [deletePassword, setDeletePassword] = useState('');

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
        })
    }

    useEffect( () => {
        refreshToken();
        axios({
            method: 'get',
            url: 'https://www.smnavi.me/api/info/' + id,
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
        }).then((res) => {
            setContents(res.data.data);
        }).catch((error) => {
            alert("글을 확인할 수 없습니다. 관리자에게 문의하세요.");
        });
    }, [token, id])


    function onHeartLike(){
        refreshToken();
        axios({
            method: 'post',
            url: 'https://www.smnavi.me/api/info/' + id + '/like',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
        }).then((res) => {
            alert("좋아요를 클릭하셨습니다.");
            window.location.replace("/detail_traffic/" + id);
        }).catch((error) => {
            alert("현재 좋아요를 클릭할 수 없습니다.");
        });
    }

    function deletePost() {
        axios({
            url: 'https://www.smnavi.me/api/info/' + id,
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            data: {}
        }).then((res) => {
            alert('제보글이 삭제되었습니다.');
            navigate(-1);
        }).catch((error) => {
            alert(error.response.data.message);
        })
    }

    function deleteAnonyPost() {
        showDeleteModal(true);
    }

    function delAnonyPost(){
        axios({
            url: 'https://www.smnavi.me/api/info/' + id,
            method: 'DELETE',
            headers:{
                'Authorization': 'Bearer ' + token
            },
            data:{
                'password' : deletePassword
            }
        }).then((res) => {
            alert('제보글이 삭제되었습니다.');
            navigate(-1)
        }).catch((error) => {
            alert(error.response.data.message);
        })
    }

    const setPassword = (e) => {
        setDeletePassword(e.target.value);
    }
    function onHeartHate(){
        refreshToken();
        axios({
            method: 'post',
            url: 'https://www.smnavi.me/api/info/' + id + '/hate',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
        }).then((res) => {
            alert("싫어요를 클릭하셨습니다.");
            window.location.replace("/detail_traffic/" + id);
        }).catch((error) => {
            alert("현재 싫어요를 클릭할 수 없습니다.");
        });
    }

    function closeModal(){
        showDeleteModal(false);
    }

    return(
        <div>
            <MainLogo />
            <MenuBar />
            <div className={"Report_big_wrap"}>
                <div className={"reportTitle"}>
                    <div>교통 제보하기 🚨</div>
                    <p>당일 교통 제보를 제공합니다. 허위 사실 제보는 페널티를 받을 수 있습니다. <br/>
                        교통 제보에 동의 하시면 동의하기를, 제보 관련
                        사건이 종료되었거나 발생하지 않은 제보라면
                        <br/>반대하기를 눌러주세요</p>
                </div>
                <div className={"Report_wrap1"}>
                    <div className="reportTitleWrap">
                        <div className={"reportDetailType"}>
                            {contents && contents.kind && (
                            <div>{contents.kind.description}</div>
                            )}
                            {contents && contents.transportation && (
                                <div>{contents.transportation.type}</div>
                            )}
                            {contents && contents.transportation && (
                                <div>{contents.transportation.station}</div>
                            )}
                        </div>
                        <div className={"reportDetailTitle"}>
                            <div>
                                <p>작성자 : {contents.nickname}</p>
                                <p>작성일 : {contents.createdAt}</p>
                            </div>

                            {contents && contents.isAnonymous && (
                                contents.isAnonymous === true ?
                                    <div>
                                        <button type="button" onClick={() => alert('익명이네')}>수정하기</button>
                                        <button type="button" onClick={deleteAnonyPost}>삭제하기</button>
                                    </div>
                             : <></>)
                            }
                            {contents && contents.isMine && (
                                contents.isMine === true ?
                                    <div>
                                        <button type="button" onClick={() => alert('내글이네')}>수정하기</button>
                                        <button type="button" onClick={deletePost}>삭제하기</button>
                                    </div>
                             : <></>)
                            }

                        </div>
                        <div className={"Report_wrap_content_heart"}>
                            <div>
                                <div onClick={onHeartLike}>
                                    <p>좋아요</p>
                                    {contents && contents.likeInfo && (
                                        contents.likeInfo.islLiked  == true ? <img src={heartLikeTrue} /> : <img src={heartLike}/>
                                    )
                                    }
                                    {contents && contents.likeInfo && (
                                        <p>{contents.likeInfo.likeCount}</p>
                                    )}
                                </div>
                                <div onClick={onHeartHate}>
                                    <p>싫어요</p>
                                    {contents && contents.likeInfo && (
                                         contents.likeInfo.isHated  == true ? <img src={heartHateTrue} /> : <img src={heartHate}/>
                                    )
                                    }

                                    {contents && contents.likeInfo && (
                                        <p>{contents.likeInfo.hateCount}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"Report_wrap_content"}>
                        <p>{contents.content}
                        </p>
                    </div>
                </div>
            </div>
            { deleteModal ?
                <div className="deleteModalWrap">
                    <div className="deleteModalCard">
                        <h3 className="closeModal" onClick={closeModal}>x</h3>
                        <h3>비밀번호를 입력하세요</h3>
                        <input type="password"
                               placeholder="비밀번호를 입력하세요"
                               onChange={setPassword} />
                        <button type="button" onClick={delAnonyPost}>삭제하기</button>
                    </div>
                </div>
                : <></>
            }
        </div>
    )
}

export default Detail_traffic;
