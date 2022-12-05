import { Center } from '@chakra-ui/react';
import React from 'react';
import Video from './Video';

const ServerErr = (): JSX.Element => {
    return (
        <Center>
            <Video src={require('../../videos/server_err.mp4')} />
        </Center>
    )
}

export default ServerErr