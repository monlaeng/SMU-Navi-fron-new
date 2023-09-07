import React, {useEffect, useState} from 'react';
import MainLogo from '../../component/MainLogo/Main_Logo';
import SearchBox from '../../component/SearchBox/Search_Box';
import M_Search_Box from "../../component/SearchBox/M_Search_Box";
import './Map_Main.css';
import Footer from "../../component/Footer/Footer";
import M_Main_Logo from "../../component/MainLogo/Mobile_Main_Logo";
import MenuBar from "../../component/MenuBar/MenuBar";
import TrafficInfo from "../../component/TrafficInfo/TrafficInfo";
const Map_Main = ({linePath}) => {
    return (
        <div className={"Main_wrap"}>
            <MainLogo className={"mainlogo"}/>
            <MenuBar/>
            <div id={'wrapper'}>
                {/*<TrafficInfo />*/}
                <div id='map' ></div>
                <SearchBox />
            </div>
        </div>
    );
}

export default Map_Main