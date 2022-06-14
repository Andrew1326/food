import { Box, Button, Center, FormControl, Heading, FormLabel, Input, Stack, Text, Flex, VStack } from '@chakra-ui/react';
import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { createSearchParams } from '../../../functions';
import { apiKey } from '../../../constants';
import useFetch from '../../../hooks/useFetch';
import useSessionStorage from '../../../hooks/useSessionStorage';
import { IWinePairing } from '../dish/dishTypes';
import { TFormValues } from './pairingTypes';
import ServerErr from '../../shared/server_err/ServerErr';
import CenteredLoader from '../../shared/loader/CenteredLoader';
import NoResults from '../../shared/noResults/NoResults';
import Wine from '../wines/Wine';

const Pairing = (): JSX.Element => {

    const [foodSearchParams, setSearchParams] = useSessionStorage('foodSearchParams', '')
    const url = foodSearchParams ? `https://api.spoonacular.com/food/wine/pairing?${foodSearchParams}&apiKey=${apiKey}` : ''

    const { data, loading, error } = useFetch<IWinePairing>(url, [foodSearchParams])

    //* rect-hook-form
    const { control, handleSubmit } = useForm<TFormValues>()

    //* submit
    const onSubmit: SubmitHandler<TFormValues> = data => setSearchParams(createSearchParams(data))

    return (
        <Box w='100%' color='gray.600' p='0 4% 2% 4%' marginTop={['18%', '10%', '5%']}>
            <Center marginBottom='2%'>
                <Heading size='2xl'>Wine pairing</Heading>
            </Center>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack direction={['column', 'row']} marginTop={['10%', '10%', '3%']} p={['0', '0 10% 0 10%', '0 20% 0 20%']}>
                <Controller 
                    name='food'
                    control={control}
                    rules={{required: true}}
                    render={({ field }) => <FormControl {...field}>
                        <FormLabel>Food</FormLabel>
                        <Input textAlign='center' placeholder='Enter food...' />
                    </FormControl>}
                    />
                    <Controller 
                    name='maxPrice'
                    control={control}
                    render={({ field }) => <FormControl {...field}>
                        <FormLabel>Price</FormLabel>
                        <Input textAlign='center' placeholder='Enter max price in USD...' type='number' />
                    </FormControl>}
                    />
                    </Stack>
                    <Center marginTop={['4%', '2%']}>
                        <Button w={['100%', '30%']} type='submit' colorScheme='teal'>search</Button>
                    </Center>
                </form>
            {
                error ? <ServerErr />
                :
                loading ? <CenteredLoader />
                :
                data && data.pairedWines ? <Box marginTop='5%'>
                <VStack>
                <Stack direction={['column', 'row']} fontSize='180%'>
                    <b>Paired wines:</b>
                    <Flex justifyContent='flex-start' alignItems='center' flexDirection='row' flexWrap='wrap'>
                    {
                        data.pairedWines.map((el, i) => <Text key={i}>{i !== data.pairedWines.length-1 ? <span>{el},&nbsp;</span> : el}</Text>)
                    }
                    </Flex>
                </Stack>
                <Text fontSize='2xl'>{data.pairingText}</Text>
                </VStack>
                <Wine data={data.productMatches[0]} />
                </Box>
                :
                <NoResults />
            }
        </Box>
    )
}

export default Pairing