import React from 'react';

import getWindowSize from '../utils/getWindowSize';


export function useWindowSize () {
    const [windowSize, setWindowSize] = React.useState(getWindowSize());

    React.useEffect(() => {
        function handleResize() {
            setWindowSize(getWindowSize())         
            
        }

        window.addEventListener('resize', handleResize());
        
        return () => window.removeEventListener('resize', handleResize())
    }, []);

    return windowSize;
}


export default useWindowSize;
