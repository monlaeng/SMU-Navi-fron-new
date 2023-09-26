import React, {useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Search_Box.css';
import axios, {head} from 'axios';
import styled from 'styled-components';
import smuMarker from '../../img/smuMarker.png';
import busLocation_off from '../../img/busLocation-off.png'
import busLocation_on from '../../img/busLocation-on.png';
import route_off from '../../img/route-off.png';
import route_on from '../../img/route-on.png';
import cctv_off from '../../img/cctv_off.png';
import cctv_on from '../../img/cctv_on.png';
import busMarkerImg from '../../img/busMarker.png';
import issueBusMarker from '../../img/issue_bus.png';
import busStationMarker from '../../img/busStationPoint.png';
import issueStationMarker from '../../img/issueStation.png';
import cctvMarkerImg from '../../img/cctvMarker.png';
import finalIcon from '../../img/finalIcon.png';
import arrow from '../../img/arrow.png';
import loading from '../../img/reload-on.png';
import unloading from '../../img/reload-off.png';

const { kakao } = window;
var polylines = [];
var routePolylines = [];
var verColor = 'black';
var transitImg = '';

var selectedMarker = null;
// 마커를 클릭했을 때 해당 정류장의 상세정보를 보여줄 커스텀오버레이
var placeOverlay = new kakao.maps.CustomOverlay({zIndex:1}),
    contentNode = document.createElement('div'), // 커스텀 오버레이의 컨텐츠 엘리먼트 입니다
    markers = []; // 마커를 담을 배열입니다
placeOverlay.setContent(contentNode);
contentNode.className = 'placeinfo_wrap';

var pos1 = new kakao.maps.LatLng(37.6744854, 127.0818506);  //ne
var pos2 = new kakao.maps.LatLng(37.5211303, 126.7799154);  //sw
var bounds = new kakao.maps.LatLngBounds(pos1, pos2);

let cctvPoint = [
    {
        title : '광화문',
        latlng: new kakao.maps.LatLng(37.5724321, 126.976902),
        src : 'http://www.utic.go.kr/view/map/openDataCctvStream.jsp?key=FJh8Ofu1S68uX8SIZ9xZgUBZPYNz1CRvy3DOyf1SjuqBz9pHQZch68yFnV1nAX&cctvid=L010029&cctvName=%25EA%25B4%2591%25ED%2599%2594%25EB%25AC%25B8&kind=Seoul&cctvip=null&cctvch=51&id=62&cctvpasswd=null&cctvport=null',
    },
    {
        title : '시청',
        latlng: new kakao.maps.LatLng(37.5657037, 126.9768616),
        src : 'http://www.utic.go.kr/view/map/openDataCctvStream.jsp?key=FJh8Ofu1S68uX8SIZ9xZgUBZPYNz1CRvy3DOyf1SjuqBz9pHQZch68yFnV1nAX&cctvid=L010169&cctvName=%25EC%258B%259C%25EC%25B2%25AD&kind=Seoul&cctvip=null&cctvch=51&id=60&cctvpasswd=null&cctvport=null',
    }

];

function Search_Box () {
    const baseUrl = "https://www.smnavi.me/api/route/";
    const [ways, setWays] = useState([0]);
    const transfer = [];
    let point = [{La: "", Ma: ""}];
    let linePath = [];
    const [transferName, setTransferName] = useState([]);
    const [wayTime, setWayTime]= useState([]);
    const [map, setMap] = useState();

    let [mysCnt, setMySCnt] = useState(5);

    let prePathCnt = 0;
    let preSubPathCnt = 0;

    //영원히 안변할 변수
    const imageSize = new kakao.maps.Size(20, 25);
    const imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
    const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
    const busMarkerImage = new kakao.maps.MarkerImage(busMarkerImg, imageSize);
    const issueBusImage = new kakao.maps.MarkerImage(issueBusMarker, imageSize);

    const smuImageSize = new kakao.maps.Size(25, 37);
    const smuMarkerImage = new kakao.maps.MarkerImage(smuMarker, smuImageSize);
    let myCnt = 5;
    //~영원히 안변할 변수

    const stationImageSize = new kakao.maps.Size(15, 15);
    const stationImage = new kakao.maps.MarkerImage(busStationMarker, stationImageSize);
    const issueStationImage = new kakao.maps.MarkerImage(issueStationMarker, stationImageSize);
    const cctvImage = new kakao.maps.MarkerImage(cctvMarkerImg, imageSize);

    //플로팅 아이콘
    const [busLocation, setBusLocation] = useState(false);
    const [cctv, setCctv] = useState(false);
    const [route, setRoute] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const [busPosition, setBusPosition] = useState([]);
    const [busMarker, setBusMarker] = useState([]);
    const [position,setposition] = useState([]);
    const [basicMarker, setBasicMarker] = useState([]);
    const [busStation, setBusStation] = useState([]);
    const [stationMarker, setStationMarker] = useState([]);
    const [cctvMarker, setCctvMarker] = useState([]);

    const [busRoute, setBusRoute] = useState([]);
    const [routePoly, setRoutePoly] = useState([]);

    const [src, setSrc] = useState([]);

    const [showInfo, setShowInfo] = useState([false, false, false, false, false]);

    const [isTime, setIsTime] = useState(false);
    const [time, setTime] = useState(30);

    useEffect(() => {
        const id = setInterval(() => {
            setTime((time) => time-1);
        }, 1000);

        if(time === 0) {
            clearInterval(id);
            setIsTime(true);
        }

        return () => clearInterval(id);
    },[time]);

    const polyOption = {
        strokeWeight: 4, // 선의 두께
        strokeColor: 'red', // 선의 색깔
        strokeOpacity: 1, // 선의 불투명도  (0에 가까울수록 투명)
        strokeStyle: 'solid' // 선의 스타일
    };

    for(let i=0; i<5; i++){
        polylines = polylines.concat(new kakao.maps.Polyline(polyOption));
    }

    async function getRoute() {
        await axios.get("https://www.smnavi.me/api/route")
            .then((response) => {
                for (let k = 0; k < response.data.length; k++) {
                    position[k] = {
                        Id: response.data[k].id,
                        title : response.data[k].placeName,
                        x: response.data[k].gpsX,
                        y: response.data[k].gpxY,
                        latlng: new kakao.maps.LatLng(response.data[k].gpsY, response.data[k].gpsX),
                    };
                    // setposition(position);
                }

            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(  () => {

        async function fetchData() {
            await getRoute();
            getBusLocation();
            setBusLocation(true);
            getBusStation();

            //7016 노선 그리기
            axios.get("https://www.smnavi.me/api/bus-info/route/7016")
                .then((response) => {
                    let newBusRoute = [];
                    newBusRoute = response.data.data;
                    newBusRoute.map((p, idx) => {
                        var poly = new kakao.maps.LatLng(p.gpsY, p.gpsX);
                        routePoly.push(poly);
                    })
                    routePolylines = new kakao.maps.Polyline({
                        map : map,
                        path :[routePoly],
                        strokeColor: '#59BE0A',
                        strokeStyle: 'solid',
                        strokeWeight: 4,
                    })

                    routePolylines.setMap(map);
                    // setBusRoute(newBusRoute);
                })
                .catch((error) => {
                    console.log(error);
                })


            position.map((p, idx) => {
                var marker = new kakao.maps.Marker({
                    map: map,
                    position: p.latlng,
                    title: p.title,
                    image: markerImage,
                    clickable: true,
                    zIndex : 1,
                });
                basicMarker.push(marker);
                kakao.maps.event.addListener(marker, 'click', async function Click ()  {
                    // selectTitle = p.title;
                    resetInfoState();
                    getRemove();
                    await axios
                        .get(baseUrl + p.Id)
                        .then((response) => {
                            let newWays = [];
                            let newTransferName = [];
                            let newWayTime = [];

                            prePathCnt = response.data.pathInfoCnt;

                            for(var i = 0; i < response.data.pathInfoCnt; i++) {
                                newWays[i] = response.data.pathInfoList[i];
                            }
                            transferName.length = response.data.pathInfoList.length;
                            wayTime.length = response.data.pathInfoList.length;


                            newWays.forEach(function(item1,k){
                                newTransferName[k] = [];
                                item1.subPathList.forEach(function(item2){
                                    newTransferName[k] = newTransferName[k].concat(item2);
                                })
                                newWayTime[k] = item1.time;
                            })
                            setWays(newWays);
                            setTransferName(newTransferName);
                            setWayTime(newWayTime);
                            preSubPathCnt = newWays[0].subPathList.length;
                            for (var i = 0; i < polylines.length; i++) {
                                polylines[i].setPath([]);
                                polylines[i].setMap(null);
                            }
                            newWays[0].subPathList.forEach(function(item1,i){
                                point = []
                                if(item1.transitType === "WALK"){
                                    item1.stationList.forEach(function(item2,j){
                                        point[j] = {La: item2.gpsX, Ma: item2.gpsY}
                                    });
                                }
                                else{
                                    item1.gpsDetail.forEach(function(item2,j){
                                        point[j] = {La: item2.gpsX, Ma: item2.gpsY}
                                    });
                                }
                                transfer[i] = item1;

                                linePath = [];

                                point.map((item, index) => {
                                    linePath[index] = new kakao.maps.LatLng(item.Ma, item.La);
                                })
                                polylines[i].setPath(null);
                                polylines[i].setPath(linePath);
                                myCnt++;
                            });

                            for (let k = 0; k < preSubPathCnt; k++) {
                                var newColor = colorSelector(newWays[0].subPathList[k].transitType,newWays[0].subPathList[k].busType,newWays[0].subPathList[k].lineName)
                                if(newWays[0].subPathList[k].transitType === "WALK"){
                                    polylines[k].setOptions({
                                        strokeColor: newColor,
                                        strokeStyle: 'dashed',
                                        strokeWeight: 2,
                                    });
                                }
                                else {
                                    polylines[k].setOptions({
                                        strokeColor: newColor,
                                        strokeStyle: 'solid',
                                        strokeWeight: 4,
                                    });
                                }
                                polylines[k].setMap(map);
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                        })
                });
            })

            const mapContainer = document.getElementById('map'), // 지도를 표시할 div
                mapOption = {
                    center: new kakao.maps.LatLng(37.596826, 126.9586567),
                    level: 8 // 지도의 확대 레벨
                };

            // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
            const map = new kakao.maps.Map(mapContainer, mapOption);
            map.setMaxLevel(8);
            setMap(map);

            var constrainBounds = function() {
                var center = map.getCenter();

                var clipLat, clipLng, sw, ne;

                if (!bounds.contain(center)) {

                    sw = bounds.getSouthWest();
                    ne = bounds.getNorthEast();

                    clipLat = Math.min(Math.max(sw.getLat(), center.getLat()), ne.getLat());
                    clipLng = Math.min(Math.max(sw.getLng(), center.getLng()), ne.getLng());

                    map.setCenter(new kakao.maps.LatLng(clipLat, clipLng));
                }
            };

            kakao.maps.event.addListener( map, 'drag', constrainBounds);
            kakao.maps.event.addListener( map, 'zoom_changed', constrainBounds);
            var smuMarker = new kakao.maps.Marker({
                map: map,
                position : new kakao.maps.LatLng(37.6026, 126.9553),
                title: '상명대학교',
                image: smuMarkerImage
            });
            smuMarker.setMap(map);
        }
        fetchData();

    }, []);


    async function getData(p) {
        getRemove();

        await axios
            .get(baseUrl + p)
            .then((response) => {

                let newWays = [];
                let newTransferName = [];
                let newWayTime = [];

                prePathCnt = response.data.pathInfoCnt;

                for(var i = 0; i < response.data.pathInfoCnt; i++) {
                    newWays[i] = response.data.pathInfoList[i];
                }


                newWays.forEach(function(item1,k){
                    newTransferName[k] = [];
                    item1.subPathList.forEach(function(item2){
                        newTransferName[k] = newTransferName[k].concat(item2);
                    })
                    newWayTime[k] = item1.time;
                })
                setWays(newWays);
                setTransferName(newTransferName);
                setWayTime(newWayTime);

                preSubPathCnt = newWays[0].subPathList.length;

                for (var i = 0; i < polylines.length; i++) {
                    polylines[i].setPath([]);
                    polylines[i].setMap(null);
                }

                newWays[0].subPathList.forEach(function(item1,i){
                    point = []
                    if(item1.transitType === "WALK"){
                        item1.stationList.forEach(function(item2,j){
                            point[j] = {La: item2.gpsX, Ma: item2.gpsY}
                        });
                    }
                    else{
                        item1.gpsDetail.forEach(function(item2,j){
                            point[j] = {La: item2.gpsX, Ma: item2.gpsY}
                        });
                    }
                    transfer[i] = item1;

                    linePath = [];

                    point.map((item, index) => {
                        linePath[index] = new kakao.maps.LatLng(item.Ma, item.La);
                    })

                    polylines[i].setPath(linePath);
                    myCnt++;
                });

                for (let k = 0; k < preSubPathCnt; k++) {
                    var newColor = colorSelector(newWays[0].subPathList[k].transitType,newWays[0].subPathList[k].busType,newWays[0].subPathList[k].lineName);
                    if(newWays[0].subPathList[k].transitType === "WALK"){
                        polylines[k].setOptions({
                            strokeColor: newColor,
                            strokeStyle: 'dashed',
                            strokeWeight: 2,
                        });
                    }
                    else{
                        polylines[k].setOptions({
                            strokeColor: newColor,
                            strokeStyle: 'solid',
                            strokeWeight: 4,
                        });
                    }
                    polylines[k].setMap(map);
                }
                console.log(linePath)
                console.log(point)
                console.log(polylines)
                console.log(ways)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    function getRemove() {
        for (var i = 0; i < polylines.length; i++) {
            polylines[i].setPath([]);
            polylines[i].setMap(null);
        }
    }


    function drawPoly(w) {
        mysCnt = ways[w].subPathList.length;
        for (var i = 0; i < ways[w].subPathList.length; i++) {
            transfer[i] = ways[w].subPathList[i];
            linePath = []
            var newColor = colorSelector(ways[w].subPathList[i].transitType,ways[w].subPathList[i].busType,ways[w].subPathList[i].lineName);
            if(ways[w].subPathList[i].transitType === "WALK"){
                transfer[i].stationList.map((item,idx) => {
                    linePath[idx] = new kakao.maps.LatLng(item.gpsY, item.gpsX);
                })
            }
            else{
                transfer[i].gpsDetail.map((item, index) => {
                    linePath[index] = new kakao.maps.LatLng(item.gpsY, item.gpsX);
                })
            }
            if(ways[w].subPathList[i].transitType === "WALK"){
                polylines[i].setOptions({
                    strokeColor: newColor,
                    strokeStyle: 'dashed',
                    strokeWeight: 2,
                });
            }
            else{
                polylines[i].setOptions({
                    strokeColor: newColor,
                    strokeStyle: 'solid',
                    strokeWeight: 4,
                });
            }
            polylines[i].setPath(linePath);
        }

        for (var k = 0; k < mysCnt; k++) {
            polylines[k].setMap(map);
        }

    }

    async function handleOnClick (e, i) {
        getRemove();
        drawPoly(i);
    }

    function resetInfoState() {
        showInfo.forEach(function(item,k){
            item = false;
        })
        setShowInfo(showInfo);
    }

    function buttonSelect(e, i){
        resetInfoState();
        const startPoint = position[i].Id;
        getRemove();
        getData(startPoint);

        var resetShowInfo = showInfo.map((item, idx) => //상세보기&접기 초기화
            item = false
        )
        setShowInfo(resetShowInfo);
        setBasicMarkers(map);
        setRoute(true);
    }

    //progressBar component 따로 생성, {이용수단 type, 이용시간, 환승횟수, 도보시간} 전달
    //map으로 환승할 때마다 그리게 해서 겹치게 만들기
    //환승회차에 따라 시간 비율 정해서 transform: translate로 x좌표 늘려주기.


    //교통수단 이미지 선택함수
    function imgSelector(type, busType, lineName) {
        if(type === 'WALK')
            transitImg = 'WALK_COLOR';
        else if(type === 'BUS'){
            if(busType === '간선')
                transitImg = 'busgan';
            else if(busType === '지선')
                transitImg = 'busji';
            else if(busType === '마을버스')
                transitImg = 'busji';
        }
        else if(type === 'SUBWAY'){
            if(lineName === '1')
                transitImg = 'sub1';
            else if(lineName === '3')
                transitImg = 'sub3';
            else if(lineName === '4')
                transitImg = 'sub4';
            else if(lineName === '5')
                transitImg = 'sub5';
            else if(lineName === '6')
                transitImg = 'sub6';
        }
        return(transitImg)
    }

    //교통수단 색깔 선택함수
    function colorSelector(type, busType, lineName){
        if(type === 'WALK')
            verColor = '#D9D9D9';
        else if(type === 'BUS'){
            if(busType === '간선')
                verColor = '#1E7BDB';
            else if(busType === '지선')
                verColor ='#59BE0A';
            else if(busType === '마을버스')
                verColor = '#59BE0A';
        }
        else if(type === 'SUBWAY'){
            if(lineName === '1')
                verColor = '#0052A4';
            else if(lineName === '3')
                verColor = '#EF7C1C';
            else if(lineName === '4')
                verColor = '#00A5DE';
            else if(lineName === '5')
                verColor = '#996CAC';
            else if(lineName === '6')
                verColor = '#CD7C2F';
        }
        return(verColor)
    }
    function progress(index) {
        var subPathCnt = ways[index].subPathCnt;
        if(subPathCnt >= 6)
            var extra = 2;
        else
            extra = 0;
        var time = ways[index].time;
        return(
            <div id = {"progress"}>
                {transferName[index].map((obj, index3) => (
                    <span id={"wayProgress"} key={index3}>
                        <span id= {'progressDetail'} style={{width: ((obj.sectionTime+10+extra)/(time+10*subPathCnt)*100 ) + "%" , backgroundColor: colorSelector(ways[index].subPathList[index3].transitType, ways[index].subPathList[index3].busType, ways[index].subPathList[index3].lineName)}}><span><img  id={"icon"} src={require(`../../img/${imgSelector(ways[index].subPathList[index3].transitType, ways[index].subPathList[index3].busType, ways[index].subPathList[index3].lineName )}.png`)} /></span><span id={"busdiv"}><p id={"min"}>{obj.sectionTime}분</p></span> </span>
                    </span>
                ))}
            </div>
        )
    }


    function Info(){
        return(
            <div id="ways-list-wrapper">
                <div id="ways-list">
                    {wayTime.map((data, index) => (
                        <div key={index}>
                            <div onClick={e => handleOnClick(e, index)}>
                                {/*{bestWay(index)}*/}
                                <p id={"time"}>{data}분</p>
                                {isTraffic(index)}
                                {infoDetail(index)}
                                {showInfoDetail(index)}
                                <hr/>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    function isTraffic(index) {
        if(ways[index].accidents != 0){
            return(
                <p id={"isTraffic"}>{ways[index].accidents[0].station.stationName} {ways[index].accidents[0].kind}</p>
            )
        }
    }

    function bestWay(index) {
        if(index == 0)
            return(
                <p id={"bestWay"}>최적 경로</p>
            )
    }
    
    function subwayInfo(index){
        if(transferName[index][1].transitType === 'SUBWAY')
            return(<span>호선</span>)
        else if(transferName[index][1].transitType === 'WALK')
            return(<span>{transferName[index][1].from}</span>)
    }

    function infoDetail(index) {
        var subPathCnt = ways[index].subPathCnt;
        var time = ways[index].time;
        if(subPathCnt >= 6)
            var extra = 2;
        else
            extra = 0;
        if(showInfo[index] === false) {
            return (
                <>
                    {progress(index)}
                    <span><img id={'arrow'} src={arrow}/></span>
                    <div id={'first'}><span><img id={"firstIcon"} src={require(`../../img/${ways[index].subPathList[1].transitType}.png`)} /></span><span id={'firstInfo'} style={{backgroundColor: colorSelector(ways[index].subPathList[1].transitType,ways[index].subPathList[1].busType,ways[index].subPathList[1].lineName)}}>{transferName[index][1].lineName}{subwayInfo(index)}</span><span>승차 {ways[index].subPathList[1].from}</span> </div>
                    <div id={'firstOff'}>하차 {transferName[index][1].to}</div>
                </>
            )
        }
        else{
            return (
                <div>
                    {transferName[index].map((obj, index2) => (
                        <div key={index2}>
                            <div id={"wayDetail"}>
                                <p id={'takePoint'}> <span id={'firstRoute'} style={{backgroundColor: colorSelector(ways[index].subPathList[index2].transitType,ways[index].subPathList[index2].busType,ways[index].subPathList[index2].lineName)}}>{lineName(index, index2)}</span>{obj.from}</p>
                                <h6 id={"detailMin"}>{obj.sectionTime}분</h6>
                                <div id={"infoDetail"}>
                                    <span id={'verProgress'} style={{height: ((obj.sectionTime+extra)/(time+10*subPathCnt)*100+30+(obj.sectionTime/10*5) ) + "px" ,backgroundColor: colorSelector(obj.transitType, obj.busType, obj.lineName)}}><span><img  id={"detailIcon"} src={require(`../../img/${imgSelector(ways[index].subPathList[index2].transitType, ways[index].subPathList[index2].busType, ways[index].subPathList[index2].lineName )}.png`)} /></span></span>
                                </div>
                            </div>
                        </div>

                    ))}
                    <span><img id={'finalIcon'} src={finalIcon}/><p id={'finalPlace'}><span id={'finish'}>도착</span> 상명대 도착</p></span>
                </div>
            )
        }
    }

    function lineName(index1, index2) {
        if(transferName[index1][index2].transitType === "SUBWAY"){
            return(
                <span id={'typeDetail'}>{transferName[index1][index2].lineName}호선</span>
            )
        }else if(transferName[index1][index2].transitType === "BUS"){
            return(
                <span id={'typeDetail'}>{transferName[index1][index2].lineName}번</span>
            )
        }
        if(transferName[index1][index2].transitType === "WALK"){
            return(
                <span id={'typeDetail'}>도보</span>
            )
        }
    }

    function showInfoDetail(index) {
        if(showInfo[index] === false) {
            return(
                <>
                    <p id={"showInfo"} onClick={e => changeInfoState(e, index)}>상세보기</p>
                </>
            )
        }
        else
        {
            return(
                <>
                    <p id={"showInfo"} onClick={e => changeInfoState(e, index)}>접기</p>
                </>
            )
        }

    }

    function changeInfoState(e, index){
        if(showInfo[index] === false)
            var newShowInfo = showInfo.map((item , idx) =>
                idx === index ? true : item,
            );
        else
            newShowInfo = showInfo.map((item , idx) =>
                idx === index ? false : item,
            );
        setShowInfo(newShowInfo);
    }

    function getBusStation() {
        axios.get("https://www.smnavi.me/api/bus-station-info")
            .then((response) => {
                let newBusStation = []
                newBusStation = response.data.data;
                setBusStation(newBusStation);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    function getBusLocation() {
        axios.get("https://www.smnavi.me/api/bus-position")
            .then((response) => {
                let newBusPosition = [];
                newBusPosition = response.data.data;
                setBusPosition(newBusPosition);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        createBusMarkers();
    }, [busPosition])

    useEffect(() => {
        createStationMarkers();
    }, [busStation])

    useEffect(() => {
        setIsTime(false);
        setTime(30);
    }, [busPosition])

    function createMarker(position, image) {
        var marker = new kakao.maps.Marker({
            position: position,
            image: image
        });

        return marker;
    }

    function setBasicMarkers(map) {
        for (var i = 0; i < basicMarker.length; i++) {
            basicMarker[i].setMap(map);
        }
    }

    function createStationMarkers() {
        busStation.map((p, idx) => {
            if(p.hasIssue === true) {
                var marker = createMarker(new kakao.maps.LatLng(p.gpsY, p.gpsX), issueStationImage);
            }
            else {
                marker = createMarker(new kakao.maps.LatLng(p.gpsY, p.gpsX), stationImage);
            }
            stationMarker.push(marker);

            kakao.maps.event.addListener(marker, 'click', function () {
                displayPlaceInfo(p);
            });
        });
        setStationMarkers(map);
    }
    const showModal = () => {
        setModalOpen(!modalOpen);
    };
    function createCctvMarkers() {
        cctvPoint.map((p, idx) => {
            var marker = createMarker(p.latlng, cctvImage);
            cctvMarker.push(marker);
            kakao.maps.event.addListener(marker, 'click', function() {
                // setModalOpen(modalOpen => true);
                // // selectedSrc = p.src;
                // setSrc(p.src);
                // window.open(p.src, '_blank', 'width=350,height=300');
                alert("현재 기능 수정 중 입니다.")
            })
        });
        setCctvMarkers(map);
    }
    const closeModal = () => {
        setModalOpen(false);
    };

    function StationInfo() {
        return(
            <div className={"container"}>
                <button className={'close'} onClick={closeModal}>
                    X
                </button>
                <iframe id={"m-myIframe"}
                        src={src}
                        height="330" width="330" frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;allow-same-origin "
                        allowFullScreen="{true}">

                </iframe>

            </div>
        )

    }



    function setCctvMarkers(map) {
        let newCctvMarker = [];
        for (var i = 0; i < cctvMarker.length; i++) {
            cctvMarker[i].setMap(map);
        }
        if(map === null) {
            setCctvMarker(newCctvMarker);
        }
    }

    function displayPlaceInfo(place){
        var content = document.createElement('div');
        content.className = 'wrap';
        var info = document.createElement('div');
        info.className = 'info';
        var title = document.createElement('div');
        title.className = 'title';
        title.appendChild(document.createTextNode(place.stationName));
        var close = document.createElement('div');
        close.className = 'close';
        title.appendChild(close);
        var body = document.createElement('div');
        body.className = 'body';
        var desc = document.createElement('div');
        desc.className = 'desc';
        var ellipsis = document.createElement('div');
        var br = document.createElement('br');
        ellipsis.className = 'ellipsis';

        var firstMessage = document.createElement('span');
        firstMessage.appendChild(document.createTextNode(place.firstArriveMessage));
        var secondMessage = document.createElement('span');
        secondMessage.appendChild(document.createTextNode(place.secondArriveMessage));


        var largeInterval = document.createElement('span');
        largeInterval.style.color = 'red';
        largeInterval.appendChild(document.createTextNode(' 긴 배차간격'));
        var largeInterval2 = document.createElement('span');
        largeInterval2.style.color = 'red';
        largeInterval2.appendChild(document.createTextNode(' 긴 배차간격'));

        if(place.isNonstop === true){
            ellipsis.appendChild(document.createTextNode('현 정거장 우회중'));
        }
        else{
            if(place.isLargeInterval === true){
                firstMessage.appendChild(largeInterval);
                ellipsis.appendChild(firstMessage);
                ellipsis.appendChild(br);

                secondMessage.append(largeInterval2);
                ellipsis.appendChild(secondMessage);

            } else {
                ellipsis.appendChild(document.createTextNode(place.firstArriveMessage));
                ellipsis.appendChild(br);
                ellipsis.appendChild(document.createTextNode(place.secondArriveMessage));
            }
        }
        desc.appendChild(ellipsis);
        body.appendChild(desc);
        info.appendChild(title);
        info.appendChild(body);
        content.appendChild(info);
        content.appendChild(info);

        close.onclick = function() { placeOverlay.setMap(null); };

        placeOverlay.setContent(content);
        placeOverlay.setPosition(new kakao.maps.LatLng(place.gpsY, place.gpsX));
        placeOverlay.setMap(map);
    }
    function closeOverlay() {
        placeOverlay.setMap(null);
    }

    function setStationMarkers(map) {
        let newStationMarker = [];
        for (var i = 0; i < stationMarker.length; i++) {
            stationMarker[i].setMap(map);
        }
        if(map === null) {
            setStationMarker(newStationMarker);
        }
    }



    function createBusMarkers() {
        for (var i = 0; i < busPosition.length; i++) {
            if(busPosition[i].hasIssue === true) {
                var marker = createMarker(new kakao.maps.LatLng(busPosition[i].gpsY, busPosition[i].gpsX), issueBusImage);
            }
            else {
                marker = createMarker(new kakao.maps.LatLng(busPosition[i].gpsY, busPosition[i].gpsX),busMarkerImage);
            }
            busMarker.push(marker);
        }
        setBusMarkers(map);
    }

    // 커피숍 마커들의 지도 표시 여부를 설정하는 함수입니다
    function setBusMarkers(map) {
        let newBusMarker = [];
        for (var i = 0; i < busMarker.length; i++) {
            busMarker[i].setMap(map);
        }
        if(map === null) {
            setBusMarker(newBusMarker);
        }
    }

    function setRoutePolylines(map) {
        routePolylines.setMap(map);
    }

    return(
        <>
            <div id={'main-wrapper'}>
                <div id='map' >
                    <span>{isTime? <img id={'loading'} src={loading} onClick={() => {setIsTime(!isTime); setTime(30); setBusMarkers(null); closeOverlay(); setStationMarkers(null); getBusLocation(); getBusStation(); setRoutePolylines(map);}}/> : <span id={'countWrap'}><span id={'countDown'}>{time}</span><img id={'unloading'} src={unloading} /></span> }</span>
                    <div id={'floating'}>
                        {busLocation ? <img onClick={() => {setBusLocation(!busLocation); setBusMarkers(null); closeOverlay(); setStationMarkers(null); setRoutePolylines(null); }} src={busLocation_on}/> : <img onClick={() => {setBusLocation(!busLocation); createBusMarkers(); createStationMarkers();  setRoutePolylines(map);  }} src={busLocation_off}/>}
                        {cctv ? <img onClick={() => {setCctv(!cctv); setCctvMarkers(null); closeModal();}} src={cctv_on}/> : <img onClick={() => {setCctv(!cctv); createCctvMarkers();}} src={cctv_off}/>}
                        {route ? <img onClick={() => {setRoute(!route); setBasicMarkers(null); getRemove();}} src={route_on}/> : <img onClick={() => {setRoute(!route); setBasicMarkers(map)}} src={route_off}/>}
                    </div>
                    <span>{isTime? <img id={'loading'} src={loading} onClick={() => {setIsTime(!isTime); setTime(30); setBusMarkers(null); closeOverlay(); setStationMarkers(null); getBusLocation(); getBusStation(); setRoutePolylines(map);}}/> : <span id={'countWrap'}><span id={'countDown'}>{time}</span><img id={'unloading'} src={unloading} /></span> }</span>
                    <div className={"search-wrapper"}>
                        <div id={"Search_box_title"}><p id={"Search_titile"}>상세경로</p></div>
                            {Info()}
                    </div>
                    <div>
                        {modalOpen && <StationInfo />}
                    </div>

                    <div id={"button_list"} >
                        {position.map((obj, index) => (
                            <div key={index}>
                                <button id={"locBtn"+index} onClick={e => buttonSelect(e, index)}>{obj.title}</button>
                            </div>
                        ))}
                    </div>
                 </div>
            </div>
        </>
       
    )
}

export default Search_Box