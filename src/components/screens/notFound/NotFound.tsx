import React from 'react';
import { Center } from '@chakra-ui/react';
import Video from '../../shared/video/Video';

const NotFound = (): JSX.Element => {
    return (
        <Center w='100%' p='0 4% 2% 4%' marginTop={['18%', '10%', '5%']}>
            <Video src={require('../../../videos/not_found.mp4')} />
        </Center>
    )
}

export default NotFound