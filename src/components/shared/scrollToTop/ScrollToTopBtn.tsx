import React, { MouseEventHandler, useEffect, useState } from 'react';
import { Button } from '@chakra-ui/react';
import { ArrowUpIcon } from '@chakra-ui/icons';

const ScrollToTopBtn = (): JSX.Element => {

    const [scrollNeeded, setScrollNeeded] = useState<boolean>(false)
    
    //* scrolling when state changes
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
        setScrollNeeded(false)

    }, [scrollNeeded])

    //* scroll
    const scroll: MouseEventHandler<HTMLButtonElement> = () => setScrollNeeded(true)

    return (
        <Button colorScheme='teal' boxShadow='md' borderRadius='50%' pos='fixed' bottom='0' right='0' m='0 2% 2% 0' _focus={{border: 'none'}} onClick={scroll}><ArrowUpIcon /></Button>
    )
}

export default ScrollToTopBtn