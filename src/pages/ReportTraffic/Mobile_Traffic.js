import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MainLogo from '../../component/MainLogo/Mobile_Main_Logo.js'
import TrafficList from '../../component/TrafficList';
import axios from 'axios';

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

export default function Mobile_Traffic(){
    const host = 'https://www.smnavi.me';
    const [items, setItems] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        axios({
            url: host + '/api/info',
            method: 'GET',
        }).then(function(response){
            setItems(response.data.data.itemList);
        })
    }, [])

    function moveWriteTraffic(){
        navigate('/write_traffic');
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
                    <Select>
                        <option>최신순</option>
                        <option>동의량순</option>
                    </Select>
                    <Button type="button" onClick={moveWriteTraffic}>제보하기</Button>
                </MoveBox>
                <ListBox>
                    {items.map((item, index) => (
                        <TrafficList type1={item.kind.description} type2={item.transportation.type} type3={item.transportation.station} content={item.content} time={item.createdTime} good={item.likeInfo.likeCount} bad={item.likeInfo.hateCount}/>
                    ))}
                </ListBox>
            </BodyBox>
        </Container>
    );
}