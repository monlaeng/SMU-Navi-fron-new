import React, {useEffect, useState} from 'react';
import "./CCTV.css"


function MapCCTV({cctvSrc,setModalOpen}:PropsType){
    console.log(cctvSrc);
    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <div className={'container'}>
            <button className={'close'} onClick={closeModal}>
                X
            </button>
            <p>모달창입니다.</p>
        </div>
    );
    // return (
    //     <div className={"container"}>
    //             <div id={'m-cctv-wrapper'}>
    //                     <div id={"m-iframe-wrapper"}>
    //                         <button className={'close'} onClick={closeModal}>
    //                             X
    //                         </button>
    //                         <div>여긱여기이ㅣ이이이이</div>
    //                         <iframe id={"m-myIframe"}
    //                                 src={cctvSrc}
    //                                 height="330" width="330" frameBorder="0"
    //                                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    //                                 allowFullScreen="{true}"></iframe>
    //                     </div>
    //             </div>
    //     </div>
    // );
}
export default MapCCTV