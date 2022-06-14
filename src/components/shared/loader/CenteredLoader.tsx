import React from 'react';
import { Box } from '@chakra-ui/react';
import Loader from './Loader';

const CenteredLoader = (): JSX.Element => <Box position='fixed' left='50%' top='50%' transform='translate(-50%, -50%)'><Loader /></Box>

export default CenteredLoader