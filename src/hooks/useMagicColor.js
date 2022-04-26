import { useEffect, useRef, useState } from 'react';

function randomColor(curentColor) {
    const COLOR_LIST = ['green','deeppink','yellow','black']
    const currentIndex = COLOR_LIST.indexOf(curentColor)
    let newIndex = currentIndex;
    
    while(currentIndex===newIndex) {
        newIndex = Math.trunc(Math.random()*4);
    }

    return COLOR_LIST[newIndex];
}

function useMagicColor() {
    const [color, setColor] = useState('transparent');
    const colorRef = useRef('transparent');

    useEffect(()=>{
        const colorInterval = setInterval(() => {
            const newColor = randomColor(colorRef.current);
            setColor(newColor)

            colorRef.current = newColor;
        }, 2000);

        return (()=>clearInterval(colorInterval))
    })
    return color;
}

export default useMagicColor;