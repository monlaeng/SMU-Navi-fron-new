import React from 'react';
import styled from 'styled-components';
import MainLogo from '../../component/MainLogo/Main_Logo';
import MenuBar from '../../component/MenuBar/MenuBar';

import heartLike from '../../img/goodBigBtnNot.svg';
import heartHate from '../../img/badBigBtn.svg';
import heartLikeTrue from '../../img/goodBigBtn.svg';
import heartHateTrue from '../../img/badBigBtnNot.svg';

import left from '../../img/leftPicture.svg';
import right from '../../img/rightPicture.svg';
import speaker from '../../img/loudSpeacker.svg';
import edit from '../../img/editButton.svg';
import deleteIcon from '../../img/deleteButton.svg';

import { useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const PostWrap = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`

const Smoong = styled.img`
  width: 100px;
`

const PostBox = styled.div`
  padding: 30px 40px;
  box-sizing: border-box;
  display: flex;
  width: 70%;
  flex-direction: column;
  background-color: white;
  border-radius: 10px;
  position: relative;
`

const PostTypeWrap = styled.div`
  display: flex;
`

const PostType = styled.div`
  margin-right: 5px;
  background-color: #FFB800;
  padding: 5px 10px;
  border-radius: 15px;
  color: white;
`

const PostType2 = styled.div`
  margin: 0 5px;
  background-color: #89B8FF;
  padding: 5px 10px;
  color: white;
  border-radius: 15px;
`

const PostNameWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0 10px 0;
  border-bottom: 1px solid #EBEBEB;
`

const PostNameLeftWrap = styled.div`
  display: flex;
  align-items: center;
`

const SpeakerIcon = styled.img`
  width: 25px;
`

const PostName = styled.p`
  font-weight: bolder;
  font-size: 17px;
  margin: 0 10px;
`

const PostTime = styled.p`
  color: #848484;
  font-size: 15px;
`

const PostNameRightWrap = styled.div`
  display: flex;
`

const BtnWrap = styled.div`
  display: flex;
  margin-left: 10px;
  cursor: pointer;
`

const IconImg = styled.img`
  margin-right: 2px;
`

const IconText = styled.p``

const PostContentWrap = styled.div`
  padding: 20px 0;
  margin-bottom: 150px;
`

const PostNumberWrap = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  width: calc(100% - 80px);
  bottom: 30px;
`

const PostLikeWrap = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  float: bottom;
`

const PostLikeNum = styled.p`
  margin: 0 10px;
`

const NumImg = styled.img`
  margin: 0 10px;
`

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 배경 어두운 정도 조절 가능 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const ModalContentInput = styled.textarea`
  font-weight: bolder;
  background-color: white;
  padding: 10px;
  height: 100px;
`

const ModalPwWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
`

const ModalDeletePwWrap = styled.div`
  display: flex;
  justify-content: space-between;
`

const ModalPasswordInput = styled.input`
  background-color: white;
  border: 1px solid #DBDBDB;
  border-radius: 10px;
  padding: 5px;
`

const ModalButtonWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`

const ModalButton = styled.button`
  padding: 5px 10px;
  margin-left: 10px;
  background-color: #0B097A;
`

const ModalEditButton = styled.button`
  width: 70px;
  background-color: #0B097A;
  margin-left: 5px;
  border-radius: 10px;
  padding: 5px 0;
`


const ModalEditButton2 = styled.button`
  width: 70px;
  background-color: #0B097A;
  margin-top: 5px;
  border-radius: 10px;
  padding: 5px 0;
`

const ModalCard = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: white;
    padding: 50px 30px;
    width: 50%;
    border-radius: 15px;
    position: relative;
`

const ModalCloseBtn = styled.h3`
  position: absolute;
  top: 0;
  right: 20px;
  cursor: pointer;
`

const ModalTypes = styled.div`
  display: flex;
  padding-bottom: 10px;
  border-bottom: 1px solid #DBDBDB;
`

const ModalType1 = styled.div`
  background-color: #FFB800;
  color: white;
  border-radius: 15px;
  padding: 5px 10px;
  font-size: 14px;
  margin-right: 10px;
`

const ModalType2 = styled.div`
  background-color: #89B8FF;
  color: white;
  border-radius: 15px;
  font-size: 14px;
  padding: 5px 10px;
  margin-right: 10px;
`

const ModalInfoWrap = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #DBDBDB;
`

const Medal = styled.img`
  width: 30px;
  height: 30px;
`

const ModalDetailInfoWrap = styled.div`
  margin-left: 10px;
`

const ModalName = styled.div`
  margin: 10px 0;
`

const ModalTime = styled.div`
    padding-bottom: 10px;
`

const ModalTimeAnony = styled.div`
    padding-bottom: 10px;
    border-bottom: 1px solid #DBDBDB;
`

const ModalContent = styled.div`
  font-weight: bolder;
  margin: 10px 0;
`

const ModalBottomWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`

const ModalHeartWrap = styled.div`
  display: flex;
  align-items: center;
`


export default function DetailTraffic(){
    const token = localStorage.getItem('token');
    const { id } = useParams();
    const navigate = useNavigate();
    const [contents, setContents] = useState({});
    const [deleteModal, showDeleteModal] = useState(false);
    const [deletePassword, setDeletePassword] = useState('');

    const [detailModal, setDetailModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [modalId, setModalId] = useState('');
    const [editPw, setEditPw] = useState('');
    const [editContent, setEditContent] = useState('');

    const [editMineModal, setEditMineModal] = useState(false);
    const [deleteAnonyModal, setDeleteAnonyModal] = useState(false);

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
            alert("로그인 후 좋아요를 클릭할 수 있습니다.");
        });
    }

    function deletePost() {
        alert('click');
        axios({
            url: 'https://www.smnavi.me/api/info/' + id,
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            data: {}
        }).then((res) => {
            alert('제보글이 삭제되었습니다.');
            navigate('/report_traffic');
        }).catch((error) => {
            alert(error.response.data.message);
        })
    }

    function deleteAnonyPost() {
        setDeleteAnonyModal(true);
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
            navigate('/report_traffic');
        }).catch((error) => {
            alert(error.response.data.message);
        })
    }

    const setEditPassword = (e) => {
        setEditPw(e.target.value);
    }

    function closeModal(){
        setDetailModal(false);
    }

    function editModalOpen(){
        setModalId(id);
        setEditModal(true);
        setDetailModal(false);
    }

    function editModalClose(){
        setEditModal(false);
    }

    function editMine(){
        setEditMineModal(true);
    }

    function editMineModalClose(){
        setEditMineModal(false);
    }

    function deleteAnonyModalOpen(){
        setEditMineModal(false);
        setDeleteAnonyModal(true);
    }

    function deleteAnonyModalClose(){
        setDeleteAnonyModal(false);
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
            data: {}
        }).then((res) => {
            alert("싫어요를 클릭하셨습니다.");
            window.location.replace("/detail_traffic/" + id);
        }).catch((error) => {
            alert("로그인 후 싫어요를 클릭할 수 있습니다.");
        });
    }

    function closeModal(){
        showDeleteModal(false);
    }

    function moveEditModal(){
        axios({
            url: 'https://www.smnavi.me/api/info/' + id,
            method: 'PUT',
            headers: {
                'Authorization' : 'Bearer ' + token
            },
            data: {
                'password' : editPw,
                'content' : editContent
            }
        }).then((res) => {
            alert('수정되었습니다.');
            setDetailModal(false);
            setEditModal(false);
            window.location.reload();
        }).catch((error) => {
            alert(error.response.data.message);
        })
    }

    return(
        <div>
            <MainLogo />
            <MenuBar />
            <div className={"Report_big_wrap"}>
                <div className={"reportTitle"}>
                    <div>교통 제보하기 🚨</div>
                    <p>당일 교통 제보를 제공하며, 허위 제보는 무통보 삭제 될 수 있습니다.<br/>
                        제보에 동의하면 좋아요를, 허위 제보라면 싫어요를 눌러주세요</p>
                </div>
            </div>
            <PostWrap>
                <Smoong src={left} />
                <PostBox>
                    <PostTypeWrap>
                        {contents && contents.kind && (
                            <PostType>{contents.kind.description}</PostType>
                        )}
                        {contents && contents.transportation && (
                            <PostType2>{contents.transportation.type}</PostType2>
                        )}
                        {contents && contents.transportation && (
                            <PostType2>{contents.transportation.station}</PostType2>
                        )}
                    </PostTypeWrap>
                    <PostNameWrap>
                        <PostNameLeftWrap>
                            <SpeakerIcon src={speaker} />
                            <PostName>{contents.nickname}</PostName>
                            <PostTime>{contents.createdAt}</PostTime>
                        </PostNameLeftWrap>
                        <PostNameRightWrap>
                            {contents && contents.isAnonymous && (
                                contents.isAnonymous === true ?
                                    <>
                                        <BtnWrap onClick={editModalOpen}>
                                            <IconImg src={edit}/>
                                            <IconText>수정하기</IconText>
                                        </BtnWrap>
                                        <BtnWrap onClick={deleteAnonyPost}>
                                            <IconImg src={deleteIcon}/>
                                            <IconText>삭제하기</IconText>
                                        </BtnWrap>
                                    </>
                                    : <></>)
                            }

                            {contents && contents.isMine && (
                                contents.isMine === true ?
                                    <>
                                        <BtnWrap onClick={editMine}>
                                            <IconImg src={edit}/>
                                            <IconText>수정하기</IconText>
                                        </BtnWrap>
                                        <BtnWrap onClick={deletePost}>
                                            <IconImg src={deleteIcon}/>
                                            <IconText>삭제하기</IconText>
                                        </BtnWrap>
                                    </>
                                    : <></>)
                            }
                        </PostNameRightWrap>
                    </PostNameWrap>
                    <PostContentWrap>
                        {contents.content}
                    </PostContentWrap>
                    <PostNumberWrap>
                        <PostLikeWrap onClick={onHeartLike}>
                            {contents && contents.likeInfo && (
                                <PostLikeNum>
                                    {contents.likeInfo.likeCount}
                                </PostLikeNum>
                            )}
                            {contents && contents.likeInfo && (
                                contents.likeInfo.islLiked  == true ? <NumImg src={heartLikeTrue} /> : <NumImg src={heartLike}/>
                            )}
                        </PostLikeWrap>
                        <PostLikeWrap onClick={onHeartHate}>
                            {contents && contents.likeInfo && (
                                contents.likeInfo.isHated  == true ? <NumImg src={heartHate} /> : <NumImg src={heartHateTrue}/>
                            )}
                            {contents && contents.likeInfo && (
                                <PostLikeNum>
                                    {contents.likeInfo.hateCount}
                                </PostLikeNum>
                            )}
                        </PostLikeWrap>
                    </PostNumberWrap>
                </PostBox>
                <Smoong src={right} />
            </PostWrap>
            {
                editModal == true ?
                    <Modal>
                        <ModalCard>
                            <ModalCloseBtn onClick={editModalClose}>x</ModalCloseBtn>
                            <h3>📝 수정하기</h3>
                            <ModalContentInput
                                defaultValue={contents.content}
                                onChange={(e) => setEditContent(e.target.value)}
                            />
                            <ModalPwWrap>
                                <ModalPasswordInput type="password"
                                                    placeholder="비밀번호를 입력하세요"
                                                    onChange={setEditPassword}/>
                                <ModalEditButton onClick={moveEditModal}>수정</ModalEditButton>
                            </ModalPwWrap>
                        </ModalCard>
                    </Modal>
                    : <></>
            }
            {
                editMineModal == true ?
                    <Modal>
                        <ModalCard>
                            <ModalCloseBtn onClick={editMineModalClose}>x</ModalCloseBtn>
                            <h3>📝 수정하기</h3>
                            <ModalContentInput
                                defaultValue={contents.content}
                                onChange={(e) => setEditContent(e.target.value)}
                            />
                            <ModalEditButton2 onClick={moveEditModal}>수정</ModalEditButton2>
                        </ModalCard>
                    </Modal>
                    : <></>
            }
            {
                deleteAnonyModal == true ?
                    <Modal>
                        <ModalCard>
                            <ModalCloseBtn onClick={deleteAnonyModalClose}>x</ModalCloseBtn>
                            <h3>❎ 삭제하기</h3>
                            <ModalDeletePwWrap>
                                <ModalPasswordInput type="password"
                                                    placeholder="비밀번호를 입력하세요"
                                                    onChange={setEditPassword}/>
                                <ModalEditButton onClick={delAnonyPost}>삭제</ModalEditButton>
                            </ModalDeletePwWrap>
                        </ModalCard>
                    </Modal>
                    : <></>
            }
        </div>
    )
}
