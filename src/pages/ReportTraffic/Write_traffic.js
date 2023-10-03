import React, { useState, useEffect } from 'react';
import './ReportTraffic.css';
import MainLogo from '../../component/MainLogo/Main_Logo';
import MenuBar from '../../component/MenuBar/MenuBar';
import MobileMainLogo from '../../component/MainLogo/Mobile_Main_Logo.js';
import Catebory_btn from '../../component/Category_btn/Catebory_btn';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Line from '../../component/Line/Line.js';

function Write_traffic() {
    const host = 'https://www.smnavi.me/';
    const token = localStorage.getItem('token');
    const [subwayList, setSubwayList] = useState([]);
    const [busList, setBusList] = useState([]);
    const [subwayIdList, setSubwayIdList] = useState([]);
    const [busIdList, setBusIdList] = useState([]);
    const [screen, setScreen] = useState(window.outerWidth);
    const [mobile, setMobile] = useState(false);
    useEffect(()=>{
        if (screen > 769) {
            setMobile(false);
        } else if (screen <= 768) {
            setMobile(true);
        }
    }, [])

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(host + "api/info/button");
                const subwayInfos = response.data.find(info => info.transitType === '지하철');
                const subwayStations = subwayInfos ? subwayInfos.locationInfos.map(station => station.stationName) : [];
                const subwayStationIds = subwayInfos ? subwayInfos.locationInfos.map(station => station.stationId) : [];
                setSubwayList(subwayStations);
                setSubwayIdList(subwayStationIds);

                const busInfos = response.data.find(info => info.transitType === '버스');
                const busStations = busInfos ? busInfos.locationInfos.map(station => station.stationName) : [];
                const busStationIds = busInfos ? busInfos.locationInfos.map(station => station.stationId) : [];
                setBusList(busStations);
                setBusIdList(busStationIds);

            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    const navigate = useNavigate();
    const [trafficTitle, setTrafficTitle] = useState("");
    const [trafficContent, setTrafficContent] = useState("");

    const onTrafficTitleHandler = (event) => {
        setTrafficTitle(event.currentTarget.value);
    }

    const onTrafficContentHandler = (event) => {
        setTrafficContent(event.currentTarget.value);
    }

    const onSubmitTraffic = (event) => {
        // console.log(busList);
        // console.log(subwayList);
        event.preventDefault();

        axios({
            method: "post",
            url: host + "api/info",
            headers: {
                "Content-Type": `application/json`,
                'Authorization' : 'Bearer ' + token
            },
            data: {
                "transitType": selectedSubway == '지하철' || selectedSubway == 'SUBWAY' ? 'SUBWAY' : 'BUS',
                "kind": selectedAccident,
                "stationId": selectedSubwayId,
                "title": trafficTitle,
                "content": trafficContent,
                "password": inputPw
            },
        })
        .then((res) => {
            alert('작성된 글이 제보되었습니다.');
            navigate('/report_traffic');
        })
        .catch((error) => {
            alert('작성하지 않은 내용이 있습니다.');
        });

    }

    const [inputPw, setInputPw] = useState('');
    const accidentArr = ['시위', '사고', '버스만석', '우회', '그외'];
    const subwayArr = ['버스', '지하철'];

    const [selectedAccident, setSelectedAccident] = useState(0);
    const [selectedSubway, setSelectedSubway] = useState(0);
    const [selectedSubwayId, setSelectedSubwayId] = useState('');

    const [selectedSubwayStation, setSelectedSubwayStation] = useState('');
    const [selectedBusStation, setSelectedBusStation] = useState('');

    const accidentCategoryClick = idx => {
        setSelectedAccident(idx + 1);
    };

    const subwayCategoryClick = idx => {
        setSelectedSubway(
            idx === 0 ? 'BUS' : 'SUBWAY'
        );
    };

    const handleSubwayClick = (index) => {
        setSelectedSubway('지하철');
        setSelectedSubwayStation(subwayList[index]);
        setSelectedSubwayId(subwayIdList[index]);
    };

    const handleBusClick = (index) => {
        setSelectedSubway('버스');
        setSelectedBusStation(busList[index]);
        setSelectedSubwayId(busIdList[index]);
    };

    const setPassword = (e) => {
        setInputPw(e.target.value);
    }
    return (
        <div>
            { mobile ?
                <>
                    <MobileMainLogo />
                </>
                : <>
                    <MainLogo />
                    <MenuBar />
                </>
            }
            <div className={"Report_big_wrap"}>
                { mobile ?
                    <h3>제보하기</h3> :
                <div className={"reportTitle"}>
                    <div>교통 제보하기 🚨</div>
                    <p>당일 교통 제보를 제공하며, 허위 제보는 무통보 삭제 될 수 있습니다.<br/>
                        제보에 동의하면 좋아요를, 허위 제보라면 싫어요를 눌러주세요</p>
                </div>}
                <div className="TrafficBigArea">
                    { token == null || token == ''
                        ?   <div className={"password_input_wrap"}>
                                <p>비밀번호</p>
                                <input type="password"
                                       placeholder="비밀번호를 입력하세요"
                                       onChange={setPassword}
                                />
                            </div>
                        : <></>
                    }
                    <div className={"Traffic_category_wrap"}>
                        <p>종류</p>
                        {accidentArr.map((elm, index) => (
                            <Catebory_btn
                                key={index}
                                isSelected={selectedAccident === elm} // selectedAccident is a string
                                handleClick={accidentCategoryClick}
                                elementIndex={index}
                                content={elm}
                                backColor="#FFB800"
                            />
                        ))}
                    </div>
                    <div className={"Location_category_wrap"}>
                        <p>교통</p>
                        {subwayArr.map((elm, index) => (
                            <Catebory_btn
                                key={index}
                                isSelected={selectedSubway === elm}
                                handleClick={index === 0 ? handleBusClick : handleSubwayClick}
                                elementIndex={index}
                                content={elm}
                                backColor="#89B8FF"
                            />
                        ))}

                    </div>
                    <div className={"picture_category_wrap"}>
                        <p>위치</p>
                        {selectedSubway === '버스' ? (
                            busList.map((elm, index) => (
                                <Catebory_btn
                                    key={index}
                                    isSelected={selectedBusStation === elm}
                                    handleClick={handleBusClick}
                                    elementIndex={index}
                                    content={elm}
                                    backColor="#89B8FF"
                                />
                            ))
                        ) : (
                            subwayList.map((elm, index) => (
                                <Catebory_btn
                                    key={index}
                                    isSelected={selectedSubwayStation === elm}
                                    handleClick={handleSubwayClick}
                                    elementIndex={index}
                                    content={elm}
                                    backColor="#89B8FF"
                                />
                            ))
                        )}
                    </div>
                    <div className={"content_category_wrap"}>
                        <p>내용</p>
                        <textarea
                            type="text"
                            placeholder="허위 제보는 무통보 삭제될 수 있습니다."
                            onChange={onTrafficContentHandler}
                        ></textarea>
                    </div>
                </div>
                <div className={"submitTrafficBtWrap"}>
                    <button type={"button"} onClick={onSubmitTraffic}>등록하기</button>
                </div>
            </div>
        </div>
    );
}

export default Write_traffic;
