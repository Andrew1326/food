import { Box, Center, Flex, Heading, HStack, useMediaQuery } from '@chakra-ui/react';
import React from 'react';
import Links from '../shared/links/Links';
import { links } from '../../App';
import { SearchIcon, HamburgerIcon } from '@chakra-ui/icons';
import { TLink } from '../../appTypes';
import { useDisclosure } from '@chakra-ui/react';
import OffCanvas from './OffCanvas';
import { useNavigate } from 'react-router-dom';

const Navbar = (): JSX.Element => {

    const navigate = useNavigate()

    const { isOpen, onOpen, onClose } = useDisclosure()

    //* media queries
    const [isLargerThan320] = useMediaQuery('(min-width: 320px)')
    const [isLargerThan400] = useMediaQuery('(min-width: 400px)')
    const [isLargerThan500] = useMediaQuery('(min-width: 500px)')

    //* create responsive links
    const createResponsiveLinks = (): TLink[] => {
        if (isLargerThan320 && !isLargerThan400) return links.slice(0, links.length-2)
        else if (isLargerThan400 && !isLargerThan500) return links.slice(0, links.length-1)
        else return links
    }

    //* navigate to home
    const goToHomePage = (): void => navigate('/')

    //* navigate to search
    const goToSearchPage = (): void => navigate('/search')

    //* props
    const offCanvasProps = {isOpen, onClose}

    return (
        <>
        <Box w='100%' h='60px' p={['0 4% 0 4%', '0']} position='fixed' top='0' left='0' zIndex='9999' display='flex' flexDirection='column' justifyContent='space-around' bg='gray.100'>
            <Flex direction='row' justifyContent='space-around' alignItems='center'>
                <HStack spacing='10%'>
                    <HamburgerIcon w={5} h={5} _hover={{cursor: 'pointer'}} onClick={onOpen} />
                    <Heading w={['80px', '100px']} size='lg' color='green.400' _hover={{cursor: 'pointer'}} onClick={goToHomePage}><i>Foody</i></Heading>
                </HStack>
                <Flex w='400px' justifyContent={['space-evenly', 'space-around']} alignItems='center'>
                    <Links links={createResponsiveLinks()} />
                </Flex>
                <Center w='40px' _hover={{cursor: 'pointer'}} onClick={goToSearchPage}>
                    <SearchIcon w={4} h={4} />
                </Center>
            </Flex>
        </Box>
        <OffCanvas {...offCanvasProps} />
        </>
    )
}

export default Navbar