import { Box, Heading, VStack, Button } from '@chakra-ui/react';
import React, { MouseEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';
import Advantages from './Advantages';
import ImagesCollection from './ImagesCollection';

const Home = (): JSX.Element => {

    const navigate = useNavigate()

    //* navigate to dishes page
    const navigateToDishes: MouseEventHandler<HTMLButtonElement> = () => navigate('/dishes')
 
    return (
        <Box w='100%' p='0 4% 2% 4%' marginTop={['18%', '10%', '5%']} color='gray.600'>
            <VStack>
                <Heading marginBottom='2%' size='3xl'>If you are foody, this app for you!</Heading>
                <ImagesCollection />
                <Advantages />
                <Button colorScheme='green' size='lg' w={['95%', '70%', '40%']} onClick={navigateToDishes}>start exploring</Button>
            </VStack>
        </Box>
    )
}

export default Home