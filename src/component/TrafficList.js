import React, { useState } from 'react';

import styled from 'styled-components';
import Speaker from '../img/loudSpeacker.svg';
import heart from '../img/heartTrue.png';
import heartTrue from '../img/heart.png';
import notHeart from '../img/heartFalse.png';
import notHeartTrue from '../img/heartBreak.png';

const List = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: white;
  padding: 10px;
  border-radius: 10px;
  margin: 10px 0;
  position: relative;
  cursor: pointer;
`

// const ListImgWrap = styled.div`
//   height: 100%;
//   display: flex;
//   align-items: flex-start;
// `

const TrafficLists = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 30px;
`

const ListType = styled.div`
  display: flex;
`

const ListButton = styled.div`
  background-color: #FFECBC;
  padding: 5px;
  font-size: 12px;
  margin-right: 10px;
  box-sizing: border-box;
  border-radius: 10px;
`

const ListImg = styled.img`
  position: absolute;
  top: 10px;
  left: 10px
`

const ListTitle = styled.p`
    margin-top: 5px;
`

const TrafficInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const NumberWrap = styled.div`
    display: flex;
    margin-top: 5px;
`

const GoodWrap = styled.div`
  display: flex;
`

const GoodImg = styled.img`
  width: 15px;
  height: 15px;
`

const BadImg = styled.img`
  width: 16.5px;
  height: 16.5px;
`

const GoodNumber = styled.p`
  margin: 0 5px;
`

const BadWrap = styled.div`
  display: flex;
`

const Time = styled.div`
  font-size: 15px;
`

export default function TrafficList({ type1, type2, type3, content, time, good, bad, liked, hated, onClick }){
    // console.log(liked, hated)
    return(
        <List onClick={onClick}>
            <ListImg src={Speaker} />
            <TrafficLists>
                <ListType>
                    <ListButton>{ type1 }</ListButton>
                    <ListButton>{ type2}</ListButton>
                    <ListButton>{ type3}</ListButton>
                </ListType>
                <ListTitle>{ content }</ListTitle>
            </TrafficLists>
            <TrafficInfo>
                <NumberWrap>
                    <GoodWrap>
                        { liked == true ? <GoodImg src={heartTrue} /> : <GoodImg src={heart} />}
                        <GoodNumber>{ good }</GoodNumber>
                    </GoodWrap>
                    <BadWrap>
                        { hated  == true ? <BadImg src={notHeartTrue} /> : <BadImg src={notHeart} />}
                        <GoodNumber>{ bad }</GoodNumber>
                    </BadWrap>
                </NumberWrap>
                <Time>{ time }</Time>
            </TrafficInfo>
        </List>
    )
}