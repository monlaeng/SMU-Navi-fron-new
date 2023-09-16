import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MainLogo from '../../component/MainLogo/Mobile_Main_Logo.js'
import TrafficList from '../../component/TrafficList';
import axios from 'axios';
import heartLike from '../../img/heartTrue.png';
import heartHate from '../../img/heartFalse.png';
import heartLikeTrue from '../../img/heart.png';
import heartHateTrue from '../../img/heartBreak.png';

const Container = styled.div`
  width: 100%;
`

const TitleBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`

const Title = styled.h3`
  font-size: 19px;
  font-weight: 1000;
`

const BodyBox = styled.div`
  background-color: #F1F4FF;
  padding: 10px;
`

const ExplainBox = styled.div`
  background-color: white;
  border: 2px solid #9EB9FF;
  border-radius: 10px;
  padding: 10px;
  margin: 0 10px;
`

const Explain = styled.p`
  font-size: 15px;
`

const MoveBox = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
`

const Select = styled.select`
  padding: 5px;
  border-radius: 10px;
  margin-right: 10px;
`

const Button = styled.button`
  background-color: #5282FF;
  border-radius: 10px;
  border: 0;
  padding: 10px 15px;
  font-size: 15px;
  cursor: pointer;
`

const ListBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
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

const ModalCard = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: white;
    padding: 50px 30px;
    width: 60%;
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

const ModalName = styled.div`
  margin: 10px 0;
`

const ModalTime = styled.div`
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

const HeartNum = styled.p`
  margin: 0 5px 0 7px;
`

const HeartImg = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
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

export default function Mobile_Traffic(){
    const host = 'https://www.smnavi.me';
    const token = localStorage.getItem('token');
    const [items, setItems] = useState([]);
    const [contents, setContents] = useState([]);
    const [detailModal, setDetailModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [modalId, setModalId] = useState('');
    const [editPw, setEditPw] = useState('');
    const [editContent, setEditContent] = useState('');

    const [editMineModal, setEditMineModal] = useState(false);
    const [deleteAnonyModal, setDeleteAnonyModal] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
        axios({
            url: host + '/api/info?isMine=0',
            method: 'GET',
            headers:{
                'Authorization': 'Bearer ' + token
            }
        }).then(function(response){
            setItems(response.data.data.itemList);
        })
    }, [])

    function moveWriteTraffic(){
        navigate('/write_traffic');
    }

    const setEditPassword = (e) => {
        setEditPw(e.target.value);
    }

    function closeModal(){
        setDetailModal(false);
    }

    function editModalOpen(){
        setEditModal(true);
        setDetailModal(false);
    }

    function editModalClose(){
        setEditModal(false);
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
        })
    }

    function moveEditModal(){
        axios({
            url: 'https://www.smnavi.me/api/info/' + modalId,
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

    function showDetailModal(num){
        setModalId(num);
        setDetailModal(true);
        axios({
            url: 'https://www.smnavi.me/api/info/' + num,
            method: 'GET',
            headers:{
                'Authorization': 'Bearer ' + token
            }
        }).then((res) => {
            setContents(res.data.data);
        })
    }

    function onHeartHate(){
        refreshToken();
        axios({
            method: 'post',
            url: 'https://www.smnavi.me/api/info/' + modalId + '/hate',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            data: {}
        }).then((res) => {
            alert("싫어요를 클릭하셨습니다.");
            window.location.reload();
        }).catch((error) => {
            alert(error.response.data.message)
        });
    }

    function onHeartLike(){
        refreshToken();
        axios({
            method: 'post',
            url: 'https://www.smnavi.me/api/info/' + modalId + '/like',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
        }).then((res) => {
            alert("좋아요를 클릭하셨습니다.");
            window.location.reload();
        }).catch((error) => {
            alert(error.response.data.message)
        });
    }

    function deletePost() {
        axios({
            url: 'https://www.smnavi.me/api/info/' + modalId,
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            data: {}
        }).then((res) => {
            alert('제보글이 삭제되었습니다.');
            // navigate(-1);
        }).catch((error) => {
            alert(error.response.data.message);
        })
    }

    function editMine(){
        setEditMineModal(true);
    }

    function editMineModalClose(){
        setEditMineModal(false);
    }

    function deleteAnonyModalOpen(){
        setDeleteAnonyModal(true);
    }

    function deleteAnonyModalClose(){
        setDeleteAnonyModal(false);
    }
    function deleteAnonyPost(){
        axios({
            url: 'https://www.smnavi.me/api/info/' + modalId,
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            data: {
                'password' : editPw
            }
        }).then((res) => {
            alert('제보글이 삭제되었습니다.');
            // navigate(-1);
        }).catch((error) => {
            alert(error.response.data.message);
        })
    }

    return(
        <Container>
            <MainLogo/>
            <TitleBox>
                <Title>교통 제보하기</Title>
            </TitleBox>
            <BodyBox>
                <ExplainBox>
                    <Explain>당일에 발생한 교통 관련 시위 정보를 제공합니다.
                        교통 제보에 동의하시면 동의하기를, 제보 관련 사건이 종료되었거나
                        발생하지 않은 제보라면 반대하기를 눌러주세요
                    </Explain>
                </ExplainBox>
                <MoveBox>
                    <Button type="button" onClick={moveWriteTraffic}>제보하기</Button>
                </MoveBox>
                <ListBox>
                    {items.map((item, index) => (
                        <TrafficList
                            type1={item.kind.description}
                            type2={item.transportation.type}
                            type3={item.transportation.station}
                            content={item.content}
                            time={item.createdTime}
                            good={item.likeInfo.likeCount}
                            bad={item.likeInfo.hateCount}
                            liked={item.likeInfo.islLiked}
                            hated={item.likeInfo.isHated}
                            onClick={() => showDetailModal(item.id)}
                        />
                    ))}
                </ListBox>
            </BodyBox>
            {detailModal == true ?
                    <Modal>
                        <ModalCard>
                            <ModalCloseBtn onClick={closeModal}>x</ModalCloseBtn>
                            <ModalTypes>
                                {contents && contents.kind && (
                                    <ModalType1>{contents.kind.description}</ModalType1>
                                )}
                                {contents && contents.transportation && (
                                    <ModalType2>{contents.transportation.type}</ModalType2>
                                )}
                                {contents && contents.transportation && (
                                    <ModalType2>{contents.transportation.station}</ModalType2>
                                )}
                            </ModalTypes>
                            <ModalName>작성자 : { contents.nickname }</ModalName>
                            <ModalTime>작성시간 : { contents.createdAt }</ModalTime>
                            <ModalContent>{ contents.content }</ModalContent>
                            <ModalBottomWrap>
                                <ModalHeartWrap>
                                    <>
                                        {contents && contents.likeInfo && (
                                            contents.likeInfo.islLiked  == true ? <HeartImg src={heartLikeTrue} onClick={onHeartLike}/> : <HeartImg src={heartLike} onClick={onHeartLike}/>
                                        )
                                        }
                                        {contents && contents.likeInfo && (
                                            <HeartNum>{contents.likeInfo.likeCount}</HeartNum>
                                        )}
                                    </>
                                    <>
                                        {contents && contents.likeInfo && (
                                            contents.likeInfo.isHated  == true ? <HeartImg src={heartHateTrue}  onClick={onHeartHate}/> : <HeartImg src={heartHate} onClick={onHeartHate}/>
                                        )
                                        }

                                        {contents && contents.likeInfo && (
                                            <HeartNum>{contents.likeInfo.hateCount}</HeartNum>
                                        )}
                                    </>
                                </ModalHeartWrap>
                                { contents.isMine == true ?
                                    <ModalButtonWrap>
                                        <ModalButton onClick={editMine}>수정하기</ModalButton>
                                        <ModalButton onClick={deletePost}>삭제하기</ModalButton>
                                    </ModalButtonWrap>
                                    : <></> }
                                { contents.isAnonymous == true ?
                                    <ModalButtonWrap>
                                        <ModalButton onClick={editModalOpen}>수정하기</ModalButton>
                                        <ModalButton onClick={deleteAnonyModalOpen}>삭제하기</ModalButton>
                                    </ModalButtonWrap>
                                    : <></> }
                            </ModalBottomWrap>
                        </ModalCard>
                    </Modal>
                    : <></>
            }
            {
                editModal == true ?
                    <Modal>
                        <ModalCard>
                            <ModalCloseBtn onClick={editModalClose}>x</ModalCloseBtn>
                            <h3>수정하기</h3>
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
                            <h3>수정하기</h3>
                            <ModalContentInput
                                defaultValue={contents.content}
                                onChange={(e) => setEditContent(e.target.value)}
                            />
                            <ModalEditButton onClick={moveEditModal}>수정</ModalEditButton>
                        </ModalCard>
                    </Modal>
                    : <></>
            }
            {
                deleteAnonyModal == true ?
                    <Modal>
                        <ModalCard>
                            <ModalCloseBtn onClick={deleteAnonyModalClose}>x</ModalCloseBtn>
                            <h3>삭제하기</h3>
                            <ModalDeletePwWrap>
                                <ModalPasswordInput type="password"
                                                    placeholder="비밀번호를 입력하세요"
                                                    onChange={setEditPassword}/>
                                <ModalEditButton onClick={deleteAnonyPost}>삭제</ModalEditButton>
                            </ModalDeletePwWrap>
                        </ModalCard>
                    </Modal>
                    : <></>
            }

        </Container>
    );
}