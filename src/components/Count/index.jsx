import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

Counter.propTypes = {
    
};

function Counter(props) {
    //1
    const [count, setCount] = useState(0)
    const prevCount = useRef(count)

    useEffect(()=>{
        prevCount.current = count
    }, [count])

    function handleIncreaseClick() {
        setCount(x => x+1)
    }

    //2
    return (
        <div>
            <p>Previous : {prevCount.current}</p>
            <p>Current : {count}</p>
            <div>
                <button onClick={handleIncreaseClick}>Increase</button>
            </div>
        </div>
    );
}

export default Counter;