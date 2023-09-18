import MainLogo from '../../component/MainLogo/Main_Logo';
import MenuBar from '../../component/MenuBar/MenuBar';
import Pagination from '../../component/Pagination';
// import Board_list2 from '../../component/Board_list/Board_list2';
import TrafficLists from '../../component/TrafficList';
import React, { useState, useEffect, useParams } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ReportTraffic.css';
import listIcon from '../../img/listIcon.png';

function TrafficList(){
    const host = 'https://www.smnavi.me';
    const token = localStorage.getItem('token');
    const [items, setItems] = useState([]);
    const navigate = useNavigate();

    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(7);

    useEffect(()=>{
        axios({
            url: host + '/api/info?page=0&size=7&isMine=0',
            method: 'GET',
            headers:{
                'Authorization': 'Bearer ' + token
            },
            data: {}
        }).then(function(response){
            setItems(response.data.data.itemList);
            setPosts(response.data.data);
        })
    }, [])

    function pagination(num) {
        axios({
            url: host + `/api/info?page=${num - 1}&size=${postsPerPage}&isMine=0`,
            method: 'GET',
        }).then(function (response) {
            setItems(response.data.data.itemList);
            setPosts(response.data.data);
            setCurrentPage(num); // 페이지 변경
        });
    }

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
                    <p>당일 교통 제보를 제공하며, 허위 제보는 무통보 삭제 될 수 있습니다.<br/>
                        제보에 동의하면 좋아요를, 허위 제보라면 싫어요를 눌러주세요</p>
                </div>
                <div className={"Report_search_wrap"}>
                    <div className={"Report_search"}>
                        <button type={"button"} onClick={onMoveWriteReport}>제보하기</button>
                    </div>
                </div>
                <div className={"Report_list_wrap"}>
                    {items.map((item, index) => (
                        <TrafficLists
                            key={index}
                            type1={item.kind.description}
                            type2={item.transportation.type}
                            type3={item.transportation.station}
                            content={item.content}
                            time={item.createdTime}
                            good={item.likeInfo.likeCount}
                            bad={item.likeInfo.hateCount}
                            liked={item.likeInfo.islLiked}
                            hated={item.likeInfo.isHated}
                            onClick={() => onMoveTrafficDetail(item.id)} // 함수를 호출하는 대신 함수 자체를 전달
                        />
                    ))}
                </div>
                <Pagination
                    postsPerPage={postsPerPage}
                    totalPosts={posts.totalCount}
                    totalPages={posts.totalPage}
                    paginate={pagination}
                    items={items}
                    currentPage={1}
                />
            </div>
        </div>
    )
}

export default TrafficList;