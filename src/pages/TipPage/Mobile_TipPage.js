import React from 'react';
import styled from 'styled-components';
import MainLogo from '../../component/MainLogo/Mobile_Main_Logo';
import Honey from '../../img/honey.svg';
import YelloWater from '../../img/yelloWater.svg';

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
  text-align: center;
`

const ExplainTitleWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const ExplainImg = styled.img`
  margin: 0 5px;
`

const ExplainTitle = styled.h3`
    margin: 0;
  font-weight: bolder;
`

const Explain = styled.p`
  font-size: 15px;
  margin-top: 10px;
`

const TipBox = styled.div`
  background-color: white;
  border-radius: 10px;
  margin: 10px;
  padding: 15px 10px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`

const TipTopBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 5px 0;
`

const TipTitle = styled.h4`
  margin: 0;
`

const TipImg = styled.img`
  margin-right: 10px;
  margin-left: 10px;
`

const TipUnder = styled.div`
  height: 1px;
  width: 100%;
  background-color: black;
`

const TipBottomBox = styled.div`
  margin-top: 10px;
  background-color: #FFECBC;
  border-radius: 10px;
  text-align: center;
  padding: 15px 20px;
`

const TipContent = styled.p`
  font-size: 15px;
`

export default function Mobile_TipPage(){
    return(
        <Container>
            <MainLogo/>
            <TitleBox>
                <Title>교통 제보하기</Title>
            </TitleBox>
            <BodyBox>
                <ExplainBox>
                    <ExplainTitleWrap>
                        <ExplainImg src={Honey}/>
                        <ExplainTitle>SMNAVI의 꿀팁 대방출</ExplainTitle>
                        <ExplainImg src={Honey}/>
                    </ExplainTitleWrap>
                    <Explain>다음 꿀팁은 여러분의 소중한 의견으로 제작되었습니다.</Explain>
                </ExplainBox>
                <TipBox>
                    <TipTopBox>
                        <TipImg src={YelloWater} />
                        <TipTitle>언덕 걸어 올라갈 결심을 한 당신</TipTitle>
                    </TipTopBox>
                    <TipUnder></TipUnder>
                    <TipBottomBox>
                        <TipContent>7016번 버스가 아닌 다른 버스(1711, 7018)를 타고 상명대 입구에 내려서 걸어 올라가기</TipContent>
                    </TipBottomBox>
                </TipBox>
                <TipBox>
                    <TipTopBox>
                        <TipImg src={YelloWater} />
                        <TipTitle>무조건 버스를 타야겠는 당신</TipTitle>
                    </TipTopBox>
                    <TipUnder></TipUnder>
                    <TipBottomBox>
                        <TipContent>명7016번 버스를 남영역, 숙대입구에서 미리 타기
                            + 이 때 직장인 앞에 서 있는다면 앉을 가능성 UP!</TipContent>
                    </TipBottomBox>
                    <TipBottomBox>
                        <TipContent>7016번 버스 대신 다른 버스(1711,7018 등)를 타고
                            하림각에 내려서 종로 13번으로 갈아타기
                            PS. 종로 13번 시간을 잘 보고 도전하세요</TipContent>
                    </TipBottomBox>
                </TipBox>
            </BodyBox>
        </Container>
    )
}