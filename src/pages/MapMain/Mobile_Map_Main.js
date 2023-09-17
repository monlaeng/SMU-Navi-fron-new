import React, {useEffect, useState} from 'react';
import MainLogo from '../../component/MainLogo/Main_Logo';
import SearchBox from '../../component/SearchBox/Search_Box';
import M_Search_Box from "../../component/SearchBox/M_Search_Box";
import './Map_Main.css';
import Line from '../../component/Line/Line';
import Footer from "../../component/Footer/Footer";
import Main_Logo from "../../component/MainLogo/Mobile_Main_Logo";
import MenuBar from "../../component/MenuBar/MenuBar";
import {MEDIA_QUERIES, Wrapper} from "../../component/MEDIA_QUERIES/MEDIA_QUERIES";
import Media from "react-media";
import TrafficInfo from "../../component/TrafficInfo/TrafficInfo";

const Mobile_Map_Main = ({linePath}) => {


    return (
        <div className={"Main_wrap"}>
            <Wrapper>
                <Main_Logo />
                <M_Search_Box />
            </Wrapper>
        </div>
    );
}
export default Mobile_Map_Main