import React from 'react';
import { Box, Text, Tooltip, Image, Flex } from '@chakra-ui/react';
import { IEquipment, IIngredient } from './dishTypes';
import useWindow from '../../../hooks/useWindow';

const ItemList = ({items}: {items: IEquipment[] | IIngredient[]}): JSX.Element => {

    //* opening item in new window
    const setUrl = useWindow()
    const searchItem = (name: string) => (): void => setUrl(`https://google.com/search?q=${name}`)

    return (
        <Flex justifyContent='flex-start' alignItems='center' flexDirection='row' flexWrap='wrap'>
        {
            items.map((el, i) => <Tooltip key={i} label={<Box>
                <Image src={`https://spoonacular.com/cdn/ingredients_100x100/${el.image}`} />
            </Box>}>
                <Text _hover={{textDecoration: 'underline', cursor: 'pointer'}} onClick={searchItem(el.name)}>{i !== items.length-1 ? `${el.name}, ` : el.name}</Text>
            </Tooltip>)
        }
        </Flex>
    )
}

export default ItemList