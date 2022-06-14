import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = (): null => {

    const { pathname } = useLocation()

    //* scrolling to top when pathname changes
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }, [pathname])

    return null
}

export default ScrollToTop