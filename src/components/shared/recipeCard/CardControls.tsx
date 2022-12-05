import { DeleteIcon } from '@chakra-ui/icons';
import { AddIcon } from '@chakra-ui/icons';
import { Button, Center, useToast } from '@chakra-ui/react';
import React, { MouseEventHandler } from 'react';
import { useSaved, useSavedUpdate } from '../../../contexts/SavedContext';
import { IRecipe } from '../../screens/dish/dishTypes';
import { ISearchRecipe } from '../../screens/searchResults/searchResultsTypes';
import { savedToast, deletedToast } from '../../../toasts';

const CardControls = ({recipe}: {recipe: IRecipe | ISearchRecipe}): JSX.Element => {

    //* saved
    const saved = useSaved()
    const setSaved = useSavedUpdate()

    //* toasts
    const toast = useToast()

    //* get item state
    const getItemState = (): 'saved' | 'not saved' => saved.filter(el => el.id === recipe.id).length > 0 ? 'saved' : 'not saved'
    
    //* save item
    const saveItem: MouseEventHandler<HTMLButtonElement> = () => {
        setSaved([...saved, recipe])
        toast(savedToast)
    }

    //* delete item
    const deleteItem: MouseEventHandler<HTMLButtonElement> = (): void => {
        setSaved(saved.filter(el => el.id !== recipe.id))
        toast(deletedToast)
    }

    //* icon props
    const iconProps: {w: number, h: number} = {w: 3, h: 3}

    return (
        <Center>
            {
                getItemState() === 'saved' ? <Button w={['100%', '90%', '80%']} onClick={deleteItem} colorScheme='orange' _focus={{border: 'none'}}><DeleteIcon {...iconProps} /></Button> : <Button w={['100%', '90%', '80%']} onClick={saveItem} colorScheme='green' _focus={{border: 'none'}}><AddIcon {...iconProps} /></Button>
            }
        </Center>
    )
}

export default CardControls