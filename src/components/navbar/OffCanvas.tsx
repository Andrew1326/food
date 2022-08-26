import { Box, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, VStack } from '@chakra-ui/react';
import React from 'react';
import Links from '../shared/links/Links';
import { links } from '../../App';

type TProps = {
    isOpen: boolean,
    onClose: () => void
}

const OffCanvas = ({isOpen, onClose}: TProps): JSX.Element => {
    return (
        <Drawer isOpen={isOpen} onClose={onClose} placement='left'>
            <DrawerOverlay />
            <DrawerContent color='gray.700'>
                <Box marginTop='15%'>
                    <DrawerCloseButton marginTop='18%' _focus={{border: 'none'}} />
                    <DrawerHeader>Pages:</DrawerHeader>
                    <DrawerBody>
                        <VStack spacing='7%'>
                            <Links links={links.sort()} closeOffcanvas={onClose} />
                        </VStack>
                    </DrawerBody>
                </Box>
            </DrawerContent>
        </Drawer>
    )
}

export default OffCanvas