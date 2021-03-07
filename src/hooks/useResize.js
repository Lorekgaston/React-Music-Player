import { useState, useEffect } from 'react';

const useResize = () => {
    const [isMobile, setIsMobile] = useState(null);

    useEffect(() => {
        setIsMobile(window.innerWidth);
    }, []);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth);

        window.addEventListener('resize', handleResize);
        console.log(isMobile);
        return () => window.removeEventListener('resize', handleResize);
    });

    return { isMobile };
};

export default useResize;
