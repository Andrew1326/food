import { Flex } from '@chakra-ui/react';
import React from 'react';
import { IRecipe } from '../../screens/dish/dishTypes';
import { ISearchRecipe } from '../../screens/searchResults/searchResultsTypes';
import RecipeCard from '../recipeCard/RecipeCard';

const RecipeList = ({recipes}: {recipes: IRecipe[] | ISearchRecipe[]}): JSX.Element => {
    return (
        <>
        <Flex marginTop='3%' justifyContent='space-evenly' alignItems='center' flexWrap='wrap'>
            {
                 recipes.map((el, i) => <RecipeCard key={i} recipe={el} />)
            }
        </Flex>
        </>
    )
}

export default RecipeList