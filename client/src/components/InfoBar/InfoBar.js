import React from 'react';
import onlineIcon from '../../Icons/onlineIcon.png';
import closeIcon from '../../Icons/closeIcon.png';

import './InfoBar.css';

const InfoBar = ({room, disconnect}) => {
    return(
            <div className="infoBar">
                <div className="leftInnerContainer">
                    <img className="onlineIcon" src={onlineIcon} alt="online icon" />
                    <h2>{room}</h2>
                </div>
                <div className="rightInnerContainer">
                    <a href="/"><img src={closeIcon} alt="close icon" /></a>
                </div>
            </div>
    );
};

export default InfoBar;