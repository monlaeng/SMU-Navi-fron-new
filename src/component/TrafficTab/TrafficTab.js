import React from 'react';
import './TrafficTab.css';
import heartLike from './../../img/heartTrue.png';
import heartHate from './../../img/heartFalse.png';
import heartLikeTrue from '../../img/heart.png';
import heartHateTrue from '../../img/heartBreak.png';

function TrafficTab(props){
    return(
        <div className={"Traffic_tap_box"}
            style={{ transform: `translateX(${props.slide}px)`,
                    transition: "0.5s ease",
            }}
            onClick={props.onClick}>
            <div className={"Traffic_tap_time"}>
                <p>{props.time}</p>
            </div>
            <div className={"Traffic_tap_type"}>
                <p>{props.type1}</p>
                <p>{props.type2}</p>
                <p>{props.type3}</p>
            </div>
            <div className={"Traffic_tap_content"}>
                <p>{props.content}</p>
            </div>
            <div className={"Traffic_tap_heart"}>
                <div id="board_heart">
                    { props.liked == true ? <img src={heartLikeTrue}/> : <img src={heartLike}/>}
                    <span>{props.heartLike}</span>
                </div>
                <div id="board_heart2">
                    { props.hated == true ? <img src={heartHateTrue} /> : <img src={heartHate} />}
                    <span>{props.heartHate}</span>
                </div>
            </div>
        </div>
    )
}

export default TrafficTab;