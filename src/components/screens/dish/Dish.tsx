import { Box, Center, Heading, Stack, Text, Image, Button, Flex, VStack, Checkbox, Badge, useToast, UseToastOptions, HStack } from '@chakra-ui/react';
import React, { ChangeEventHandler, MouseEventHandler } from 'react';
import CardControls from '../../shared/recipeCard/CardControls';
import ItemList from './ItemList';
import { useRecipe, useRecipeUpdate } from '../../../contexts/RecipeContext';
import likesSrc from '../../../images/likes.png';
import priceSrc from '../../../images/price.png';
import timeSrc from '../../../images/time.png';
import scoreSrc from '../../../images/score.png'
import { IRecipe } from './dishTypes';
import { defaultToastOptions } from '../../../functions';

const Dish = (): JSX.Element => {

    const recipe = useRecipe()
    const setRecipe = useRecipeUpdate()

    const toast = useToast()

    //* recipe completed toast
    const recipeCompletedToast: UseToastOptions = {
        title: 'Congratulations!',
        description: 'Recipe is completed. Bon appetit!',
        status: 'success',
        ...defaultToastOptions
    }

    //* start cooking
    const startCooking = (recipe: IRecipe): MouseEventHandler<HTMLButtonElement> => () => {
        recipe.cooking = true

        recipe.analyzedInstructions[0].steps.map(el => {
            el.completed = false
            return el
        })

        setRecipe(recipe)
    }

    //* stop cooking
    const stopCooking = (recipe: IRecipe): MouseEventHandler<HTMLButtonElement> => () => {
        recipe.cooking = false
        
        recipe.analyzedInstructions[0].steps.map(el => {
            el.completed = false
            return el
        })

        setRecipe(recipe)
    }

    //* steps completion
    const getStepsCompletion = (recipe: IRecipe): 'completed' | 'not completed' => recipe.analyzedInstructions[0].steps.every(el => el.completed) ? 'completed' : 'not completed'

    //* complete step
    const completeStep = (recipe: IRecipe, index: number): ChangeEventHandler<HTMLElement> => (): void => {

        //* item checked
        let checked = recipe.analyzedInstructions[0].steps[index].completed

        if (checked) recipe.analyzedInstructions[0].steps[index].completed = false 
        else recipe.analyzedInstructions[0].steps[index].completed = true

        setRecipe(recipe)

        //* toast
        getStepsCompletion(recipe) === 'completed' && void toast(recipeCompletedToast)
    }

    //* create badge
    const createBadge = (checked: boolean | undefined): JSX.Element => checked ? <Badge colorScheme='green' fontSize='md'>completed!</Badge> : <Badge colorScheme='gray' fontSize='md'>not completed</Badge>

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
            <Flex marginTop='3%' justifyContent='space-evenly' alignItems='center' flexDirection='row' flexWrap='wrap'>
                <VStack>
                    <Image src={priceSrc} alt='price' />
                    <Text fontSize='xl'>${recipe.pricePerServing} per serving</Text>
                </VStack>
                <VStack>
                    <Image src={likesSrc} alt='likes' />
                    <Text fontSize='xl'>{recipe.aggregateLikes} likes</Text>
                </VStack>
                <VStack>
                    <Image src={timeSrc} alt='time' />
                    <Text fontSize='xl'>Ready in {recipe.readyInMinutes}m</Text>
                </VStack>
                <VStack>
                    <Image src={scoreSrc} alt='score' />
                    <Text fontSize='xl'>Score: {recipe.healthScore}</Text>
                </VStack>
            </Flex>
            <Box m='5% 0 5% 0'>
            <Center>
                <Text fontSize='3xl'><b>Recipe steps:</b></Text>
            </Center>
            <Flex justifyContent='center' alignItems='flex-start' flexDirection='column'>
                {
                    recipe.analyzedInstructions[0].steps.map((el, i) => recipe.cooking ? <Checkbox css={`
                    > span:first-of-type {
                      box-shadow: unset;
                    }
                  `} bg={el.completed ? 'green.300' : 'none'} border='2px' borderColor='gray.700' borderRadius='15px' w='100%' m='1% 0 1% 0' p='0 1% 0 1%' isChecked={el.completed} onChange={completeStep(recipe, i)} colorScheme='green' size='lg' key={i}>
                    <Box m='1% 0 1% 0' paddingLeft='2%' fontSize='2xl'>
                        <span>{i+1}) {el.step}</span>
                        {
                            el.ingredients.length > 0 && <HStack><b>Ingredients:</b> <ItemList items={el.ingredients} /></HStack>
                        }
                        {
                            el.equipment.length > 0 && <HStack><b>Equipment:</b> <ItemList items={el.equipment} /></HStack>
                        }
                        &nbsp;
                        {createBadge(el.completed)}
                    </Box>
                    </Checkbox>
                    :
                    <Box key={i} w='100%' m='1% 0 1% 0' fontSize='2xl'>
                        <span>{i+1}) {el.step}</span>
                        {
                            el.ingredients.length > 0 && <Stack direction={['column', 'row']}><b>Ingredients:</b> <ItemList items={el.ingredients} /></Stack>
                        }
                        {
                            el.equipment.length > 0 && <Stack direction={['column', 'row']}><b>Equipment:</b> <ItemList items={el.equipment} /></Stack>
                        }
                    </Box>)
                }
            </Flex>
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