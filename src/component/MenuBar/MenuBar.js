import React from 'react';
import './MenuBar.css';
import { Link, useLocation } from 'react-router-dom';

function MenuBar() {
    const location = useLocation();

    return (
        <nav className="navigation-bar">
            <ul className="navigation-menu">
                <li>
                    <Link
                        to="/"
                        className={`navigation-link ${location.pathname === '/' ? 'active' : ''}`}
                    >
                        대중교통지도
                    </Link>
                </li>
                <li>
                    <Link
                        to="/report_traffic"
                        className={`navigation-link ${location.pathname === '/report_traffic' ? 'active' : ''}`}
                    >
                        교통제보하기
                    </Link>
                </li>
                <li>
                    <Link
                        to="/tip"
                        className={`navigation-link ${location.pathname === '/tip' ? 'active' : ''}`}
                    >
                        꿀팁 보러가기
                    </Link>
                </li>
                <li>
                    <Link
                        to="/CCTV"
                        className={`navigation-link ${location.pathname === '/CCTV' ? 'active' : ''}`}
                    >
                        CCTV 보러가기
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default MenuBar;
