import React, { MouseEventHandler } from 'react';
import { IRecipe } from '../../screens/dish/dishTypes';
import { Box, Heading, Image } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import CardControls from './CardControls';
import { useRecipeUpdate } from '../../../contexts/RecipeContext';
import { ISearchRecipe } from '../../screens/searchResults/searchResultsTypes';
import { apiKey } from '../../../constants';

const RecipeCard = ({recipe}: {recipe: IRecipe | ISearchRecipe}) => {

    const setRecipe = useRecipeUpdate()

    //* location
    const { pathname } = useLocation()
    const navigate = useNavigate()

    //* checking type
    const isIRecipe = (recipe: IRecipe | ISearchRecipe): recipe is IRecipe => !!(recipe as IRecipe).analyzedInstructions

    //* fetching data
    const fetchData = async () => {
        const res = await fetch(`https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=${apiKey}`)
        const data: IRecipe = await res.json()
        setRecipe(data)
    }

    //* navigate to recipe
    const navigateToRecipe: MouseEventHandler<HTMLImageElement> = () => {

        //* search && fetching data
        if (isIRecipe(recipe)) setRecipe(recipe)
        else fetchData()
        
        navigate(`${pathname}/${recipe.id}`)
    }

    return (
        <Box w={['90%', '40%', '25%']} h='auto' border='2px' borderColor='gray.700' borderRadius='15px' p={['4%', '2%','1%']} m={['2%', '1%', '0.5%']} _hover={{cursor: 'pointer'}}>
            <Image src={recipe.image} loading='lazy' alt='card img' w='100%' h='auto' onClick={navigateToRecipe} />
            <Heading m='5% 0 5% 0' size='md' h='25px' overflow='hidden' textOverflow='ellipsis'>{recipe.title}</Heading>
            <CardControls recipe={recipe} />
        </Box>
    )
}

export default RecipeCard