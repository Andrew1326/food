import React from 'react';
import { VStack, Box, Heading } from '@chakra-ui/react';
import Video from '../video/Video';

const NoResults = (): JSX.Element => {
    return (
        <VStack marginTop={['10%', '7%', '5%']}>
            <Box maxW='250px'>
                <Video src={require('../../../videos/no_results.mp4')} />
            </Box>
            <Heading size='lg'>No results...</Heading>
        </VStack>
    )
}

export default NoResults