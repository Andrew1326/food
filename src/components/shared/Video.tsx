import { Box } from '@chakra-ui/react';
import React from 'react';

const Video = ({src}: {src: string}): JSX.Element => {
    return (
        <Box maxWidth='550px' minWidth='200px'>
        <video autoPlay loop muted playsInline height='auto' width='100%'>
            <source src={src} type='video/mp4' />
        </video>
        </Box>
    )
}

export default Video