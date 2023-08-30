import MainLogo from '../../component/MainLogo/Main_Logo';
import MenuBar from '../../component/MenuBar/MenuBar';
import Board_list2 from '../../component/Board_list/Board_list2';
import TrafficTab from '../../component/TrafficTab/TrafficTab';
import LeftArrow from '../../img/leftarrow.png';
import RightArrow from '../../img/rightarrow.png';
import React, { useState, useEffect, useParams } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ReportTraffic.css';
import Line from '../../component/Line/Line'

function ReportTraffic(){

    const navigate = useNavigate();
    const [content, setContent] = useState([]);
    const [contentCount, setContentCount] = useState();
    const [contentId, setContentId] = useState([]);

    const [slidePx, setSlidePx] = useState(0);

    useEffect( (e) => {
        async function fetchData(){
            const result = await axios({
                method: 'get',
                url: '/api/info',
                headers: {
                    "Content-Type": "application/json"
                },
            }).then((res) => {
                // var data = res.data.data;
                // var count = res.data.count;
                // setContentCount(count);
                // setContent(data);
            }).catch((error) => {
                var data = [
                {
                    "id": 1,
                    "title": "2번",
                    "content": "1번ㅇㄹㅁㅇㄹㅁㄹㅁㅇㄴㄹㅁㅇㄴ2번",
                    "regDate": "2023-04-05T16:47:11.312675",
                    "updateDate": null,
                    "likes": 0,
                    "hates": 0,
                    "deleted": false,
                    "deletedDate": null,
                    "viewCount": 1
                },{
                        "id": 1,
                        "title": "3번",
                        "content": "1번ㅇㄹㅁㅇㄹㅁㄹㅁㅇㄴㄹㅁㅇㄴ2번",
                        "regDate": "2023-04-05T16:47:11.312675",
                        "updateDate": null,
                        "likes": 0,
                        "hates": 0,
                        "deleted": false,
                        "deletedDate": null,
                        "viewCount": 1
                    },{
                        "id": 1,
                        "title": "4번",
                        "content": "1번ㅇㄹㅁㅇㄹㅁㄹㅁㅇㄴㄹㅁㅇㄴ2번",
                        "regDate": "2023-04-05T16:47:11.312675",
                        "updateDate": null,
                        "likes": 0,
                        "hates": 0,
                        "deleted": false,
                        "deletedDate": null,
                        "viewCount": 1
                    },{
                        "id": 1,
                        "title": "2번",
                        "content": "1번ㅇㄹㅁㅇㄹㅁㄹㅁㅇㄴㄹㅁㅇㄴ2번",
                        "regDate": "2023-04-05T16:47:11.312675",
                        "updateDate": null,
                        "likes": 0,
                        "hates": 0,
                        "deleted": false,
                        "deletedDate": null,
                        "viewCount": 1
                    },{
                        "id": 1,
                        "title": "2번",
                        "content": "1번ㅇㄹㅁㅇㄹㅁㄹㅁㅇㄴㄹㅁㅇㄴ2번",
                        "regDate": "2023-04-05T16:47:11.312675",
                        "updateDate": null,
                        "likes": 0,
                        "hates": 0,
                        "deleted": false,
                        "deletedDate": null,
                        "viewCount": 1
                    }
                    ]
                var count = data.count;
                setContentCount(count);
                setContent(data);
                console.log(contentCount);

                // alert("글을 확인할 수 없습니다. 관리자에게 문의하세요.");
            });
        }
        fetchData();
    },[]);
    

    function onMoveWriteReport(){
        navigate('/write_traffic');
    }

    function onMoveTrafficDetail(props){
        navigate('/detail_traffic/' + props);
    }

    function onMoveTrafficList(){
        navigate('/list_traffic');
    }

    function toPrev() {
        if (slidePx < 0) setSlidePx(slidePx + 225);
    }

    function toNext() {
        if (slidePx >= (-220 * (contentCount - 4))) setSlidePx(slidePx - 220);
    }


    return(
        <div>
            <MainLogo />
            <MenuBar />
            <div className={"Report_big_wrap"}>
                <div className={"reportTitle"}>
                    <div>교통 제보하기 🚨</div>
                    <p>당일 교통 제보를 제공합니다. 허위 사실 제보는 페널티를 받을 수 있습니다. <br/>
                        교통 제보에 동의 하시면 동의하기를, 제보 관련
                        사건이 종료되었거나 발생하지 않은 제보라면
                        <br/>반대하기를 눌러주세요</p>
                </div>

                <div className={"On_Move_WriteTraffic"}>
                    <button type={"button"} id="onMoveTrafficListBt" onClick={onMoveTrafficList}>더 많은 게시물 보러가기</button>
                    <button type={"button"} id="onMoveWriteReportBt" onClick={onMoveWriteReport}>제보하기</button>
                </div>
                <div className={"Report_tap_top_wrap"}>
                    <img src={LeftArrow} id={"left_arrow"} onClick={toPrev}/>
                    <div className={"Report_tab_wrap"}>
                        {content != ''
                            ? content.map((content, index) => (
                                <div className="traffic_tab_box_wrap" id={content.id} key={index} onClick={e =>onMoveTrafficDetail(content.id)}>
                                    <TrafficTab slide={slidePx} num={index} time={content.regDate.substr(0,10)} title={content.title} content={content.content} heartLike={content.countLike} heartHate={content.countHate}/>
                                </div>
                            ))
                            : <div className="traffic_tab_box">등록된 글이 없습니다</div>}
                    </div>
                    <img src={RightArrow} id={"right_arrow"} onClick={toNext}/>
                </div>
            </div>
        </div>
    )
}

export default ReportTraffic;
