import { Box, Center, Heading, FormControl, Input, Select, Button, FormLabel, Stack } from '@chakra-ui/react';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { TFormValues } from './searchTypes';
import { Controller } from 'react-hook-form';
import { cuisines, diets, dishTypes, sortingOptions } from './searchData';
import { createSearchParams, useLocation, useNavigate } from 'react-router-dom';

const Search = (): JSX.Element => {

    const navigate = useNavigate()
    const { pathname } = useLocation()

    //* react-hook-form
    const { handleSubmit, control, register } = useForm<TFormValues>()

    //* submit
    const onSubmit: SubmitHandler<TFormValues> = (data): void => {

        //* params
        const searchParams = createSearchParams(data)
        navigate(`${pathname}/results?${searchParams}`)
    }

    return (
        <Box w='100%' color='gray.600' p='0 4% 2% 4%' marginTop={['18%', '10%', '5%']}>
            <Center marginBottom='2%'>
                <Heading size='2xl'>Recipes searching</Heading>
            </Center>
            <Box marginTop={['10%', '10%', '3%']} p={['0', '0 10% 0 10%', '0 20% 0 20%']}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Controller 
                    name='query'
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => <FormControl {...field}>
                    <FormLabel htmlFor=''>Dish</FormLabel>
                    <Input textAlign='center' placeholder='Enter dish...' />
                </FormControl>}
                    />
                <Stack direction={['column', 'row']} m='2% 0 2% 0'>
                <Controller 
                    name='includeIngredients'
                    control={control}
                    render={({ field }) => <FormControl {...field}>
                    <FormLabel>Include ingredients</FormLabel>
                    <Input textAlign='center' placeholder='Enter ingredients...' />
                </FormControl>}
                    />
                    <Controller 
                    name='excludeIngredients'
                    control={control}
                    render={({ field }) => <FormControl {...field}>
                    <FormLabel>Exclude ingredients</FormLabel>
                    <Input textAlign='center' placeholder='Enter ingredients...' />
                </FormControl>}
                    />
                </Stack>
                <Stack direction={['column', 'row']} m='2% 0 2% 0'>
                    <FormControl>
                    <FormLabel>Cuisine</FormLabel>
                    <Select {...register('cuisine')}>
                    {
                        cuisines.map((el, i) => <option key={i} value={el}>{el}</option>)
                    }
                    </Select>
                    </FormControl>
                    <FormControl>
                    <FormLabel>Diet</FormLabel>
                    <Select {...register('diet')}>
                    {
                        diets.map((el, i) => <option key={i} value={el}>{el}</option>)
                    }
                    </Select>
                    </FormControl>
                </Stack>
                <Stack direction={['column', 'row']} m='2% 0 2% 0'>
                    <FormControl>
                    <FormLabel>Type</FormLabel>
                    <Select {...register('type')}>
                    {
                        dishTypes.map((el, i) => <option key={i} value={el}>{el}</option>)
                    }
                    </Select>
                    </FormControl>
                    <FormControl>
                    <FormLabel>Sorting option</FormLabel>
                    <Select {...register('sort')}>
                    {
                        sortingOptions.map((el, i) => <option key={i} value={el}>{el}</option>)
                    }
                    </Select>
                    </FormControl>
                </Stack>
                <Center marginTop={['4%', '2%']}>
                    <Button type='submit' w='50%' colorScheme='linkedin'>search</Button>
                </Center>
            </form>
            </Box>
        </Box>
    )
}

export default Search