import { Box, Center, Heading, Stack, Text, Image, Button } from '@chakra-ui/react'
import { useRecipe, useRecipeUpdate } from '../../../contexts/RecipeContext';
import { IRecipe } from './dishTypes';
import DishData from '../../DishData';
import RecipeSteps from '../../RecipeSteps';
import { MouseEventHandler } from 'react';
import CardControls from '../../shared/recipeCard/CardControls';

const Dish = (): JSX.Element => {

    const recipe = useRecipe()
    const setRecipe = useRecipeUpdate()

    //* start cooking
    const startCooking = (recipe: IRecipe): MouseEventHandler<HTMLButtonElement> => () => {
        recipe.cooking = true
        recipe.analyzedInstructions[0].steps.map(el => ({...el, completed: false}));

        setRecipe(recipe)
    }

    //* stop cooking
    const stopCooking = (recipe: IRecipe): MouseEventHandler<HTMLButtonElement> => () => {
        recipe.cooking = false
        recipe.analyzedInstructions[0].steps.map(el => ({...el, completed: false}));

        setRecipe(recipe)
    }

    return (
        <>
        {
            recipe && <Box w='100%' color='gray.600' p='0 4% 2% 4%' marginTop={['18%', '10%', '5%']}>
            <Center marginBottom='5%'>
                <Heading size='xl'>{recipe.title}</Heading>
            </Center>
            <Stack direction={['column', 'row']} spacing='5%'>
                <Box w={['100%', '40%', '40%']}>
                    <Image w='100%' src={recipe.image} alt='recipe img' />
                </Box>
                <Text w={['100%', '50%']} fontSize='xl' dangerouslySetInnerHTML={{__html: recipe.summary}}></Text>
            </Stack>
            <DishData recipe={recipe} />
            <Box m='5% 0 5% 0'>
            <Center>
                <Text fontSize='3xl'><b>Recipe steps:</b></Text>
            </Center>
            <RecipeSteps recipe={recipe} />
            </Box>
            <Center marginBottom='2%'>
                {
                    !recipe.cooking ? <Button w={['80%', '65%', '50%']} colorScheme='telegram' _focus={{border: 'none'}} onClick={startCooking(recipe)}>start cooking</Button>
                    :
                    <Button w={['80%', '65%', '50%']} colorScheme='orange' _focus={{border: 'none'}} onClick={stopCooking(recipe)}>stop cooking</Button>
                }
            </Center>
            <CardControls recipe={recipe} />
        </Box>
        }
        </>
    )
}

export default Dish