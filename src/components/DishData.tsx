import { Flex, VStack, Image, Text } from "@chakra-ui/react"
import { IRecipe } from "./screens/dish/dishTypes"
import likesSrc from '../images/likes.png';
import priceSrc from '../images/price.png';
import timeSrc from '../images/time.png';
import scoreSrc from '../images/score.png';

type TProps = { recipe: IRecipe }

const DishData = ({ recipe }: TProps): JSX.Element => {
    return (
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
    )
}

export default DishData