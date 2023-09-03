import MainLogo from '../../component/MainLogo/Main_Logo';
import MenuBar from '../../component/MenuBar/MenuBar';
// import Board_list2 from '../../component/Board_list/Board_list2';
import TrafficLists from '../../component/TrafficList';
import React, { useState, useEffect, useParams } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ReportTraffic.css';
import listIcon from '../../img/listIcon.png';

function TrafficList(){
    const host = 'http://15.164.99.211';
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

    // const [content, setContent] = useState([]);
    // const [contentId, setContentId] = useState([]);

    // useEffect( () => {
    //     axios({
    //         method: 'get',
    //         url: 'http://15.164.99.211/api/info',
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //     }).then(function(res){
    //         setContent(res.data.data.itemList);
    //         console.log(content);
    //     })
    // }, [])

    function onMoveWriteReport(){
        navigate('/write_traffic');
    }

    function onMoveTrafficDetail(props){
        navigate('/detail_traffic/' + props);
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
                <div className={"Report_search_wrap"}>
                    <div className={"Report_search"}>
                        <select>
                            <option>최신순</option>
                            <option>동의량순</option>
                        </select>
                        <button type={"button"} onClick={onMoveWriteReport}>제보하기</button>
                    </div>
                </div>
                <div className={"Report_list_wrap"}>
                    <div>
                        {items.map((item, index) => (
                            <TrafficLists type1={item.kind.description} type2={item.transportation.type} type3={item.transportation.station} content={item.content} time={item.createdTime} good={item.likeInfo.likeCount} bad={item.likeInfo.hateCount}/>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TrafficList;