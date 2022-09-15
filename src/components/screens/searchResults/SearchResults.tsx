import { Box, Center, Heading } from '@chakra-ui/react';
import React from 'react';
import { apiKey } from '../../../constants';
import useFetch from '../../../hooks/useFetch';
import CenteredLoader from '../../shared/loader/CenteredLoader';
import NoResults from '../../shared/noResults/NoResults';
import RecipeList from '../../shared/recipeList/RecipeList';
import ScrollToTop from '../../shared/scrollToTop/ScrollToTopBtn';
import ServerErr from '../../shared/server_err/ServerErr';
import { ISearchRecipes } from './searchResultsTypes';

const SearchResults = (): JSX.Element => {

    //* search params
    const url: URL = new URL(document.URL)
    const searchParams: string = url.searchParams.toString().replaceAll('%2C', ',')

    //* fetching recipes
    const { data, loading, error } = useFetch<ISearchRecipes>(`https://api.spoonacular.com/recipes/complexSearch?${searchParams}&apiKey=${apiKey}`)

    return (
        <Box w='100%' color='gray.600' p='0 4% 2% 4%' marginTop={['18%', '10%', '5%']}>
            <Center>
                <Heading size='2xl'>Search results</Heading>
            </Center>
            {
                error ? <ServerErr />
                :
                loading ? <CenteredLoader />
                :
                data && data.results.length > 0 ? <>
                    <RecipeList recipes={data.results} />
                    <ScrollToTop />
                </>
                :
                <NoResults />
            }
        </Box>
    )
}

export default SearchResults