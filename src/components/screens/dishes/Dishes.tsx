import { Box, Button, Center, FormControl, Heading, HStack, Input, Image, Flex } from '@chakra-ui/react';
import React from 'react';
import CenteredLoader from '../../shared/loader/CenteredLoader';
import ServerErr from '../../shared/server_err/ServerErr';
import { IRecipes, TFormValue } from './dishesTypes';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import RecipeList from '../../shared/recipeList/RecipeList';
import { apiKey } from '../../../constants';
import useSessionStorage from '../../../hooks/useSessionStorage';
import ScrollToTop from '../../shared/scrollToTop/ScrollToTopBtn';
import useFetch from '../../../hooks/useFetch';
import NoResults from '../../shared/noResults/NoResults';
 
const Dishes = (): JSX.Element => {

    const [tags, setTags] = useSessionStorage('tags', '')
    const { data, loading, error } = useFetch<IRecipes>(`https://api.spoonacular.com/recipes/random?tags=${tags}&number=100&apiKey=${apiKey}`, [tags])

    //* react-hook-form
    const { handleSubmit, control } = useForm<TFormValue>()

    //* create fetch tags
    const createTags = (tags: string): string => tags.split('').filter(el => el !== ' ').join('')

    //* submit
    const onSubmit: SubmitHandler<TFormValue> = (data): void => setTags(createTags(data.tags))

    return (
        <Box w='100%' color='gray.600' p='0 4% 2% 4%' marginTop={['18%', '10%', '5%']}>
                <Center>
                    <Heading size='2xl'>Big collection of recipes</Heading>
                </Center>
                <Flex justifyContent='space-evenly' alignItems='center' flexWrap='wrap' marginTop='5%'>
                <Image src={require('../../../images/burger.png')} alt='burger' w={['100px', '150px', '200px']} h='auto' marginBottom={['10%', 0]} />
                <form onSubmit={handleSubmit(onSubmit)}>
                <HStack>
                    <Controller 
                    name='tags'
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => <FormControl {...field}>
                    <Input textAlign='center' placeholder='Enter tags...' />
                </FormControl>}
                    />
                    <Button type='submit' colorScheme='blue' _focus={{border: 'none'}}>search</Button>
                </HStack>
                </form>
                <Image src={require('../../../images/pizza.png')} alt='pizza' w={['100px', '150px', '200px']} h='auto' marginTop={['10%', 0]} />
                </Flex>
                    {
                    error ? <ServerErr />
                    :
                    loading ? <CenteredLoader />
                    :
                    data && data.recipes.length > 0 ? <>
                    <RecipeList recipes={data.recipes} />
                    <ScrollToTop />
                    </>
                    :
                    <NoResults />    
                    }    
                </Box>
    )
}

export default Dishes