import { Flex, useMediaQuery, Image } from '@chakra-ui/react';
import food1Src from '../images/food_1.jpg';
import food2Src from '../images/food_2.jpg';
import food3Src from '../images/food_3.jpg';
import food4Src from '../images/food_4.jpg';
import food5Src from '../images/food_5.jpg';
import food6Src from '../images/food_6.jpg';
import { TImage } from '../appTypes';

const ImagesCollection = (): JSX.Element => {

    //* media queries
    const [isLargerThan320] = useMediaQuery('(min-width: 320px)')
    const [isLargerThan769] = useMediaQuery('(min-width: 769px)')
    const [isLargerThan1025] = useMediaQuery('(min-width: 1025px)')

    //* food collection
    const foodImages: TImage[] = [
        {src: food1Src, alt: 'food_1'},
        {src: food2Src, alt: 'food_2'},
        {src: food3Src, alt: 'food_3'},
        {src: food4Src, alt: 'food_4'},
        {src: food5Src, alt: 'food_5'},
        {src: food6Src, alt: 'food_6'},
    ]

    //* responsive collection
    const createFoodCollection = (): TImage[] => {
        if (isLargerThan320 && !isLargerThan769) return foodImages.slice(0, 2)
        else if (isLargerThan769 && !isLargerThan1025) return foodImages.slice(0, 4)
        else return foodImages
    }

    const foodCollection = createFoodCollection()

    return (
        <Flex justifyContent='center' alignItems='center' flexWrap='wrap'>
            {
                foodCollection.map((el, i) => <Image key={i} m={['0.6%', '0.4%', '0.2%']} src={el.src} alt={el.alt} w={['300px', '325px', '350px']} h='auto' />)
            }

        </Flex>
    )
}

export default ImagesCollection