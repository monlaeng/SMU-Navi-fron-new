import React from 'react';
import MainLogo from '../../component/MainLogo/Main_Logo';
import MenuBar from '../../component/MenuBar/MenuBar';
import Line from '../../component/Line/Line';
import honey from '../../img/honey.svg';
import yelloWater from '../../img/yelloWater.svg';
import './TakeTaxi.css';

function TipPage(){
    return(
        <div className="bodyBox">
            <MainLogo />
            <MenuBar />
            <div className="header">
                <div className=headerTitle>
                    <img src={honey} width="20" height="20"/>
                    <p>SMNAVI의 꿀팁 대방출</p>
                    <img src={honey} width="20" height="20"/>
                </div>
                <h5>다음 꿀팁은 여러분의 소중한 의견으로 제작되었습니다.</h5>
            </div>

            <div className="body">
                <div className="left">
                    <div id="tipBox">
                        <div className=tipTitleBox>
                            <img src={yelloWater} width="13"/>
                            <p id="tipTitle">언덕 걸어 올라갈 결심을 한 당신</p>
                        </div>
                        <div className="tipContents">
                            <p id="tip">7016번 버스가 아닌 다른 버스(1711, 7018, 7212, 1020 등)를 타고 상명대 입구에 내려서 걸어 올라가기</p>
                        </div>
                    </div>
                    <div id="tipBox">
                        <div className=tipTitleBox>
                            <img src={yelloWater} width="13"/>
                            <p id="tipTitle">무조건 버스를 타야겠는 당신</p>
                        </div>
                        <div className="tipContents">
                            <p id="tip">7016번 버스를 남영역, 숙대입구에서 미리 타기
                                (+ 이 때 직장인 앞에 서 있는다면 앉을 가능성 UP!)</p>
                        </div>
                        <div className="tipContents">
                            <p id="tip">7016번 버스 대신 다른 버스(1711,7018 등)를 타고
                                하림각에 내려서 종로 13번으로 갈아타기
                                PS. 종로 13번 시간을 잘 보고 도전하세요</p>
                        </div>
                    </div>
                    <div id="tipBox">
                        <div className=tipTitleBox>
                            <img src={yelloWater} width="13"/>
                            <p id="tipTitle">경복궁, 광화문에서 7016이 아닌 다른 버스를 타고 오는 슴우 - 에타 봇치님</p>
                        </div>
                        <div className="tipContents">
                            <p id="tip">자하문터널을 지날 때 종로 13이 [상명대입구- 상명대입구.석파랑- 하림각 - 부암동주민센터.무계원]에 있다면, [자하문터널입구.석파정]에서
                                내려서 터널 방향으로 8초간 전력질주♡</p>
                        </div>
                    </div>
                </div>

                <div className="right">
                    <div id="tipBox">
                        <div className=tipTitleBox>
                            <img src={yelloWater} width="13"/>
                            <p id="tipTitle">163 같은 버스타고오다가 종로 13을 노리는 슴우 - 에타 봇치님</p>
                        </div>
                        <div className="tipContents">
                            <p id="tip">국민대 터널 방면에서 오고 있다면, [예능교회]정거장에서 종로 13위치를 조회하세요!
                                종로 13 이 [완성빌라, 상명대후문, 산정빌라, 구기빌라, 마트앞]에 종로 13이 있다면,[평창동 주민센터]정거장에서 내려 올리브영 앞으로 걸어가면 탑승
                                가능!!
                                (+ 후문까지 5분, 정문까지 10분 안에 도착 가능)</p>
                        </div>
                        <div className="tipContents">
                            <p id="tip">못내려서 언덕 아래에서 종로13을 타고 싶다면,
                                종로 13이 [부암동 주민센터-무계원]에 있으면 → 탑승 가능 /
                                [하림각]에 있으면 → 탑승.. 어려울지도?</p>
                        </div>
                        <div className="tipContents">
                            <p id="tip">4호선을 타고 오는 슴우라면 [길음]보다는 [미아-수유]쯤에서 163 타는게 좋아요!</p>
                        </div>
                    </div>
                    <div id="tipBox">
                        <div className=tipTitleBox>
                            <img src={yelloWater} width="13"/>
                            <p id="tipTitle">구기동에서 내려서 후문가는 종로 13을 노리는 슴우 - 에타 봇치님</p>
                        </div>
                        <div className="tipContents">
                            <p id="tip">[구기동]정거장 바로 전인 [구기터널.삼성출판박물관]정거장에서 내려서 학교쪽으로 조금만 걸어서 타면타면 앉을 가능성 up!</p>
                        </div>
                        <div className="tipContents">
                            <p id="tip">[구기동]에 내렸다면, 종로 13이 [평창 파출소]정거장에서 막 출발했는지 확인하고 반대편으로 건너가서 타면 앉을 가능성 up!</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TipPage;
