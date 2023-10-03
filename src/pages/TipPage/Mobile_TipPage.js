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
  background-color: #757575;
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
                <Title>꿀팁 확인하기</Title>
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
                        <TipContent>7016번 버스가 아닌 다른 버스(1711, 7018, 7212, 1020 등)를 타고 상명대 입구에 내려서 걸어 올라가기</TipContent>
                    </TipBottomBox>
                </TipBox>
                <TipBox>
                    <TipTopBox>
                        <TipImg src={YelloWater} />
                        <TipTitle>무조건 버스를 타야겠는 당신</TipTitle>
                    </TipTopBox>
                    <TipUnder></TipUnder>
                    <TipBottomBox>
                        <TipContent>7016번 버스를 남영역, 숙대입구에서 미리 타기
                            + 이 때 직장인 앞에 서 있는다면 앉을 가능성 UP!</TipContent>
                    </TipBottomBox>
                    <TipBottomBox>
                        <TipContent>7016번 버스 대신 다른 버스(1711,7018 등)를 타고
                            하림각에 내려서 종로 13번으로 갈아타기
                            PS. 종로 13번 시간을 잘 보고 도전하세요</TipContent>
                    </TipBottomBox>
                </TipBox>
                <TipBox>
                    <TipTopBox>
                        <TipImg src={YelloWater} />
                        <TipTitle>163 같은 버스타고오다가 종로 13을 노리는 슴우 - 에타 봇치님</TipTitle>
                    </TipTopBox>
                    <TipUnder></TipUnder>
                    <TipBottomBox>
                        <TipContent>국민대 터널 방면에서 오고 있다면, [예능교회]정거장에서 종로 13위치를 조회하세요!
                            종로 13 이 [완성빌라, 상명대후문, 산정빌라, 구기빌라, 마트앞]에 종로 13이 있다면,[평창동 주민센터]정거장에서 내려 올리브영 앞으로 걸어가면 탑승 가능!!
                            + 후문까지 5분, 정문까지 10분 안에 도착 가능</TipContent>
                    </TipBottomBox>
                    <TipBottomBox>
                        <TipContent>못내려서 언덕 아래에서 종로13을 타고 싶다면,
                            종로 13이 [부암동 주민센터-무계원]에 있으면 → 탑승 가능 /
                            [하림각]에 있으면 → 탑승.. 어려울지도?</TipContent>
                    </TipBottomBox>
                    <TipBottomBox>
                        <TipContent>4호선을 타고 오는 슴우라면 [길음]보다는 [미아-수유]쯤에서 163 타는게 좋아요!</TipContent>
                    </TipBottomBox>
                </TipBox>
                <TipBox>
                    <TipTopBox>
                        <TipImg src={YelloWater} />
                        <TipTitle>구기동에서 내려서 후문가는 종로 13을 노리는 슴우 - 에타 봇치님</TipTitle>
                    </TipTopBox>
                    <TipUnder></TipUnder>
                    <TipBottomBox>
                        <TipContent>[구기동]정거장 바로 전인 [구기터널.삼성출판박물관]정거장에서 내려서 학교쪽으로 조금만 걸어서 타면타면 앉을 가능성 up!</TipContent>
                    </TipBottomBox>
                    <TipBottomBox>
                        <TipContent>[구기동]에 내렸다면, 종로 13이 [평창 파출소]정거장에서 막 출발했는지 확인하고 반대편으로 건너가서 타면 앉을 가능성 up!</TipContent>
                    </TipBottomBox>
                </TipBox>
                <TipBox>
                    <TipTopBox>
                        <TipImg src={YelloWater} />
                        <TipTitle>경복궁, 광화문에서 7016이 아닌 다른 버스를 타고 오는 슴우 - 에타 봇치님</TipTitle>
                    </TipTopBox>
                    <TipUnder></TipUnder>
                    <TipBottomBox>
                        <TipContent>자하문터널을 지날 때 종로 13이 [상명대입구- 상명대입구.석파랑- 하림각 - 부암동주민센터.무계원]에 있다면, [자하문터널입구.석파정]에서 내려서 터널 방향으로 8초간 전력질주♡</TipContent>
                    </TipBottomBox>
                </TipBox>
            </BodyBox>
        </Container>
    )
}