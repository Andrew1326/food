import { Box, Center, Heading, VStack } from '@chakra-ui/react';
import React from 'react';
import { useSaved } from '../../../contexts/SavedContext';
import useInput from '../../../hooks/useInput';
import RecipeList from '../../shared/recipeList/RecipeList';
import ScrollToTop from '../../shared/scrollToTop/ScrollToTopBtn';
import Video from '../../shared/video/Video';
import { IRecipe } from '../dish/dishTypes';
import { createLower } from '../../../functions';

const Saved = (): JSX.Element => {

    //* filter
    const [value, Input] = useInput()

    //* saved
    const saved = useSaved()

    //* filter recipes
    const filterArr = (arr: IRecipe[], value: string): IRecipe[] => arr.filter(el => createLower(el.title).includes(createLower(value)))

    return (
        <Box w='100%' color='gray.600' p='0 4% 2% 4%' marginTop={['18%', '10%', '5%']}>
            {
                saved.length > 0 ? <>
                <Center>
                    <Heading size='2xl'>Saved dishes:</Heading>
                </Center>
                {
                    saved.length > 3 ? <>
                    <Center marginTop='2%'>
                    {Input}
                    </Center>
                    <RecipeList recipes={filterArr(saved, value)} />
                    <ScrollToTop />
                    </>
                    :
                    <RecipeList recipes={saved} />
                }
                </>
                :
                <>
                <VStack>
                    <Video src={require('../../../videos/empty_list.mp4')} />
                    <Heading size='lg'>List is empty...</Heading>
                </VStack>
                </>
            }
        </Box>
    )
}

export default Saved