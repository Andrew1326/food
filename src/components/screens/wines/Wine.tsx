import React, { MouseEventHandler } from 'react';
import { IProductMatch } from '../dish/dishTypes';
import { Stack, Box, Image, Text, Center, Heading } from '@chakra-ui/react';
import useWindow from '../../../hooks/useWindow';

type TProps = {
    data: IProductMatch
}

const Wine = ({ data }: TProps): JSX.Element => {

    //* opening item in new window
    const setUrl = useWindow()
    const viewWine = (url: string): MouseEventHandler<HTMLImageElement> => () => setUrl(url)

    return (
        <Box paddingTop='3%'>
            <Center>
                <Heading fontSize='2xl' _hover={{cursor: 'pointer', textDecoration: 'underline'}} onClick={viewWine(data.link)}>{data.title}</Heading>
            </Center>
        <Stack direction={['column', 'row']}>
            <Box w={['100%', '100%', '20%']}>
                <Image src={data.imageUrl} alt='wine img' loading='lazy' _hover={{cursor: 'pointer'}} onClick={viewWine(data.link)} />
                <Text fontSize='xl'>Price: {data.price}</Text>
            </Box>
            <Text fontSize='xl' w='100%'>{data.description}</Text>
        </Stack>
        </Box>
    )
}

export default Wine