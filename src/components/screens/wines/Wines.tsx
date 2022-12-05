import { Box, Heading, Input, FormControl, Button, Select, Center, FormLabel, Stack } from '@chakra-ui/react';
import React, { ChangeEvent } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { IRecommendedWines, TEnteringType, TFormValue } from './wineTypes';
import useSessionStorage from '../../../hooks/useSessionStorage';
import { apiKey } from '../../../constants';
import ServerErr from '../../shared/ServerErr';
import CenteredLoader from '../../shared/loader/CenteredLoader';
import Wine from './Wine';
import useFetch from '../../../hooks/useFetch';
import { TSelectOption } from '../../../appTypes';
import { wineTypesJSON } from './winesData';
import ScrollToTop from '../../shared/scrollToTop/ScrollToTopBtn';
import NoResults from '../../shared/NoResults';

const WinePairing = (): JSX.Element => {

    const [enteringType, setEnteringType] = useSessionStorage<TEnteringType>('enteringType', 'input')
    const [wineType, setWineType] = useSessionStorage('wineType', '')
    const url = wineType ? `https://api.spoonacular.com/food/wine/recommendation?wine=${wineType}&number=100&apiKey=${apiKey}` : ''

    const { data, loading, error } = useFetch<IRecommendedWines>(url, [wineType])

    //* react-hook-form
    const { handleSubmit, control, register } = useForm<TFormValue>()

    //* submit
    const onSubmit: SubmitHandler<TFormValue> = (data): void => setWineType(data.wineType)

    //* enter options
    const enteringOptions: TSelectOption[] = [
        {name: 'input', value: 'input'},
        {name: 'select', value: 'select'}
    ] 

    //* parsed wine types
    const wineTypes: string[] = JSON.parse(wineTypesJSON)

    //* changing entering type
    const changeEnteringType = (e: ChangeEvent<HTMLSelectElement>): void => setEnteringType(e.target.value as TEnteringType)

    return (
        <Box w='100%' color='gray.600' p='0 4% 2% 4%' marginTop={['18%', '10%', '5%']}>
            <Center marginBottom='2%'>
                <Heading size='2xl'>Wine recommendation</Heading>
            </Center>
                <form onSubmit={handleSubmit(onSubmit)}>
                <Stack direction={['column', 'row']} marginTop={['10%', '10%', '3%']} p={['0', '0 10% 0 10%', '0 20% 0 20%']}>
                    <FormControl>
                    <FormLabel>Searching type</FormLabel>
                    <Select value={enteringType} onChange={changeEnteringType}>
                        {
                            enteringOptions.map((el, i) => <option key={i} value={el.value}>{el.name}</option>)
                        }
                    </Select>
                    </FormControl>
                    {
                        enteringType === 'input' ? <Controller 
                        name='wineType'
                        control={control}
                        rules={{ required: true}}
                        render={({ field }) => <FormControl {...field}>
                        <FormLabel>Wine type</FormLabel>
                        <Input textAlign='center' placeholder='Enter wine type...' />
                        </FormControl>}
                        />
                        :
                        <FormControl>
                        <FormLabel>Wine type</FormLabel>    
                        <Select {...register('wineType', {required: true})} placeholder='Select wine type'>
                            {
                                wineTypes.map((el, i) => <option key={i} value={el}>{el}</option>)
                            }
                        </Select>
                        </FormControl>
                    }     
                    </Stack>
                    <Center marginTop={['4%', '2%']}>
                        <Button type='submit' colorScheme='facebook' w={['100%', '30%']} _focus={{border: 'none'}}>search</Button>
                    </Center>
                </form>
                {
                    error ? <ServerErr />
                    :
                    loading ? <CenteredLoader />
                    :
                    data && data.recommendedWines.length > 0 ? <>
                    <ScrollToTop />
                    {
                        data.recommendedWines.map((el, i) => <Wine key={i} data={el} />)
                    }
                    </>
                    :
                    <NoResults />
                }
        </Box>
    )
}

export default WinePairing