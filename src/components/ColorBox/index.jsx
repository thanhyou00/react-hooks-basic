import React, { useState } from 'react';
import './ColorBox.scss';


function getRandomColor() {
    const BoxColor = ['red','blue','deeppink','green','yellow'];
    return BoxColor[Math.trunc(Math.random()*5)];
}

function ColorBox() {
    const [color, setColor] = useState(()=>{
        const initColor = localStorage.getItem('color-box') || 'deeppink';
        return initColor;
    });
    function handleBoxClick() {
        const newColor = getRandomColor();
        setColor(newColor);

        localStorage.setItem('color-box', newColor);
    }

    return (
        <div className='color-box' style={{ backgroundColor: color }}
        onClick={handleBoxClick}
        >
    
        </div>
    );
}

export default ColorBox;