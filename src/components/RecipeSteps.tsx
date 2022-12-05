import { Flex, Checkbox, Box, HStack, Stack, Badge, useToast } from "@chakra-ui/react"
import { ChangeEventHandler } from "react"
import { useRecipeUpdate } from "../contexts/RecipeContext"
import { IRecipe } from "./screens/dish/dishTypes"
import { recipeCompletedToast } from '../toasts'
import RecipeItems from "./RecipeItems"

type TProps = { recipe: IRecipe }

const RecipeSteps = ({ recipe }: TProps): JSX.Element => {
    const toast = useToast()
    const setRecipe = useRecipeUpdate()

    //* create badge
    const createBadge = (checked: boolean | undefined): JSX.Element => checked ? <Badge colorScheme='green' fontSize='md'>completed!</Badge> : <Badge colorScheme='gray' fontSize='md'>not completed</Badge>

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

    return (
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
                            el.ingredients.length > 0 && <HStack><b>Ingredients:</b> <RecipeItems items={el.ingredients} type='ingredients' /></HStack>
                        }
                        {
                            el.equipment.length > 0 && <HStack><b>Equipment:</b> <RecipeItems items={el.equipment} type='equipment' /></HStack>
                        }
                        &nbsp;
                        {createBadge(el.completed)}
                    </Box>
                    </Checkbox>
                    :
                    <Box key={i} w='100%' m='1% 0 1% 0' fontSize='2xl'>
                        <span>{i+1}) {el.step}</span>
                        {
                            el.ingredients.length > 0 && <Stack direction={['column', 'row']}><b>Ingredients:</b> <RecipeItems type='ingredients' items={el.ingredients} /></Stack>
                        }
                        {
                            el.equipment.length > 0 && <Stack direction={['column', 'row']}><b>Equipment:</b> <RecipeItems type='equipment' items={el.equipment} /></Stack>
                        }
                    </Box>)
                }
            </Flex>
    )
}

export default RecipeSteps