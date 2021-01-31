import { useState, useEffect } from 'react';


export const useDropTime = (callback, level) => {

    // Adding callback here stops rerender WHY!!!!!!!

    const [dropTime, setDropTime] = useState(null);

    useEffect(() => {
        console.log('Use Drop Time useEffect: level Changes');
        setDropTime(1000 - ((level) * 100));
        setDropTime(null);

    }, [level])


    return [dropTime, setDropTime]
};