import React, {useEffect, useState} from 'react';
import Line from '../../component/Line/Line';
import Footer from "../../component/Footer/Footer";
import M_Main_Logo from "../../component/MainLogo/Mobile_Main_Logo";
import MenuBar from "../../component/MenuBar/MenuBar";
import TrafficInfo from "../../component/TrafficInfo/TrafficInfo";
import {MEDIA_QUERIES, Wrapper} from "../../component/MEDIA_QUERIES/MEDIA_QUERIES";
import Media from "react-media";
import "./CCTV.css"


const Mobile_CCTV = () =>  {

    function selectBtn(idx) {
        if(idx === "m-cctv1"){
            document.getElementById('m-myIframe').src = "https://www.utic.go.kr/view/map/cctvStream.jsp?cctvid=L010029&cctvname=%25EA%25B4%2591%25ED%2599%2594%25EB%25AC%25B8&kind=Seoul&cctvip=null&cctvch=51&id=62&cctvpasswd=null&cctvport=null&minX=126.86850223291543&minY=37.532683171998684&maxX=127.08840516954024&maxY=37.618116676194724";
        }
        else if(idx === "m-cctv2") {
            document.getElementById('m-myIframe').src = "https://www.utic.go.kr/view/map/cctvStream.jsp?cctvid=L010169&cctvname=%25EC%258B%259C%25EC%25B2%25AD&kind=Seoul&cctvip=null&cctvch=51&id=60&cctvpasswd=null&cctvport=null&minX=126.86761300167508&minY=37.52331181092342&maxX=127.08748873586144&maxY=37.60874703165121";
        }
    }


    return (
        <div className={"Main_wrap"}>
            <Wrapper>
                <M_Main_Logo className={"mainlogo"}/>
                <div id={"m-cctv-title"}>CCTV</div>
                <div id={'m-cctv-wrapper'}>
                    <div id={"m-cctv"}>
                        <div id={'m-button-wrapper'}>
                            <button id={"m-cctv1"} onClick={() => {selectBtn("m-cctv1");}}>광화문</button>
                            <button id={"m-cctv2"} onClick={() => {selectBtn("m-cctv2"); }}>시청</button>
                        </div>
                        <div id={"m-iframe-wrapper"}>
                        <iframe id={"m-myIframe"}
                                src="https://www.utic.go.kr/view/map/cctvStream.jsp?cctvid=L010029&cctvname=%25EA%25B4%2591%25ED%2599%2594%25EB%25AC%25B8&kind=Seoul&cctvip=null&cctvch=51&id=62&cctvpasswd=null&cctvport=null&minX=126.93801784507436&minY=37.534755415666964&maxX=127.01863625090986&maxY=37.616271305116555"
                                height="330" width="330" frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen="{true}"></iframe>
                        </div>
                        </div>
                </div>
            </Wrapper>
        </div>
    );
}
export default Mobile_CCTV