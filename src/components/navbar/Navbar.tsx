import { Box, Flex, Heading, HStack, useMediaQuery } from '@chakra-ui/react';
import React from 'react';
import Links from '../shared/Links';
import { links } from '../../App';
import { SearchIcon, HamburgerIcon } from '@chakra-ui/icons';
import { useDisclosure } from '@chakra-ui/react';
import OffCanvas from './OffCanvas';
import { useNavigate } from 'react-router-dom';

const Navbar = (): JSX.Element => {

    const navigate = useNavigate()

    const { isOpen, onOpen, onClose } = useDisclosure()

    //* media queries
    const [isSmallerThan768] = useMediaQuery('(max-width: 768px)')
    const [isSmallerThan480] = useMediaQuery('(max-width: 480px)')

    //* props
    const offCanvasProps = { isOpen, onClose }

    return (
        <>
        <Box w='100%' h='60px' p={['0 4% 0 4%', '0']} position='fixed' top='0' left='0' zIndex='9999' display='flex' flexDirection='column' justifyContent='space-around' bg='gray.100'>
            <Flex direction='row' justifyContent='space-around' alignItems='center'>
                <HStack spacing='10%'>
                    {
                        isSmallerThan768 && <Flex justify='center' align='center' w='40px' _hover={{cursor: 'pointer'}} onClick={onOpen}>
                        <HamburgerIcon w='5' h='5'  />
                    </Flex>
                    }
                    <Heading w={['80px', '100px']} size='lg' color='green.400' _hover={{cursor: 'pointer'}} onClick={() => navigate('/')}><i>Foody</i></Heading>
                </HStack>
                <Flex w='400px' justifyContent={['space-evenly', 'space-around']} alignItems='center'>
                    <Links links={isSmallerThan768 && !isSmallerThan480 ? links.slice(0, 3) : isSmallerThan480 ? [] : links} />
                </Flex>
                <Flex w='10%' justify='center' align='center'>
                    <Flex justify='center' align='center' w='40px'_hover={{cursor: 'pointer'}} onClick={() => navigate('/search')}>
                        <SearchIcon w='4' h='4'  />
                    </Flex>
                </Flex>
            </Flex>
        </Box>
        <OffCanvas {...offCanvasProps} />
        </>
    )
}

export default Navbar