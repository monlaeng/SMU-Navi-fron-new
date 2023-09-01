import React, {useEffect, useState} from 'react';
import MainLogo from '../../component/MainLogo/Main_Logo';
import './TrafficInfo.css';
import pngwing from '../../img/pngwing.png';
import up from '../../img/arrow_up.png';
import down from '../../img/arrow_down.png';
import axios from 'axios';
import useInterval from 'use-interval'

const TrafficInfo = ({traffic_data}) => {   //traffic_data = 받아 올 시위 정보
    const [info, setInfo] = useState([0]);
    const [station, setStation] = useState([0]);

    useEffect(() => {
        async function fetchData() {
            if (typeof window !== "undefined") {
                if (window.innerWidth > 768) {
                    document.getElementById('traffic').style.width = '70vw';
                } else {
                    document.getElementById('traffic').style.width = '90vw';
                    document.getElementById('pngwing').style.left = '6vw';
                }
            }
            await axios
                .get("http://15.164.99.211/api/accidents")
                .then((response) => {
                    console.log(response.data)
                    let newInfo = [];
                    let newStation = [];

                    for(var i = 0; i < response.data.data.length; i++) {
                        newInfo[i] = response.data.data[i];
                        newStation[i] = response.data.data[i].station.stationName;
                    }
                    setInfo(newInfo);
                    setStation(newStation);
                })
                .catch((error) => {
                    console.log(error);
                })
        }
        fetchData();
    }, []);

console.log(info)

    var cnt = info.length-1;
    var trafficCnt = 0;
    function downClick() {
        var infoWrapper = document.getElementById('infoWrapper');
        if(trafficCnt < cnt){
            trafficCnt++;
        }
        else{
            trafficCnt = 0;
        }
        infoWrapper.innerText = station[trafficCnt] + ', ' + info[trafficCnt].kind;
    }

    //교통공지 다음 글 자동 클릭;
    useInterval(() => {
        downClick();
    }, 6000);

    function upClick() {

        if (trafficCnt > 0){
            trafficCnt--;
        }
        else{
            trafficCnt = cnt;
        }
        document.getElementById('infoWrapper').innerText = station[trafficCnt] + ', ' + info[trafficCnt].kind;
    }

    function isTraffic(){
        if(station != 0){
            return(
                <>
                    <div id={'infoWrapper'} >
                        {station[0] + ', ' + info[0].kind}
                    </div>
                </>
            )
        }
        else{
            return(
                <span id={'infoWrapper'}>
                    <p>현재 문제 없음</p>
                </span>

            )
        }
    }
        return (
       <div>
           <div id={"traffic"}>
               <span onClick={() => upClick()}><img id={"up"} src={up} /> </span>
               <span><img id={"pngwing"} src={pngwing} /></span>
               {isTraffic()}
               <span onClick={() => downClick()}><img id={"down"} src={down} /> </span>
           </div>

       </div>
    );
}
export default TrafficInfo