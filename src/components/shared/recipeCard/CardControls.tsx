import { DeleteIcon } from '@chakra-ui/icons';
import { AddIcon } from '@chakra-ui/icons';
import { Button, Center, useToast, UseToastOptions } from '@chakra-ui/react';
import React from 'react';
import { useSaved, useSavedUpdate } from '../../../contexts/SavedContext';
import { IRecipe } from '../../screens/dish/dishTypes';
import { ISearchRecipe } from '../../screens/searchResults/searchResultsTypes';
import { defaultToastOptions } from '../../../functions';

const CardControls = ({recipe}: {recipe: IRecipe | ISearchRecipe}): JSX.Element => {

    //* saved
    const saved = useSaved()
    const setSaved = useSavedUpdate()

    //* toasts
    const toast = useToast()

    const savedToast: UseToastOptions = {
        title: 'Saved successfully!',
        description: 'Dish was added to saved.',
        status: 'success',
        ...defaultToastOptions
    } 

    const deletedToast: UseToastOptions = {
        title: 'Deleted successfully!',
        description: 'Dish was deleted from saved.',
        status: 'warning',
        ...defaultToastOptions
    }

    //* get item state
    const getItemState = (): 'saved' | 'not saved' => saved.filter(el => el.id === recipe.id).length > 0 ? 'saved' : 'not saved'
    
    //* save item
    const saveItem = (): void => {
        setSaved([...saved, recipe])
        toast(savedToast)
    }

    //* delete item
    const deleteItem = (): void => {
        setSaved(saved.filter(el => el.id !== recipe.id))
        toast(deletedToast)
    }

    //* icon props
    const iconProps: {w: number, h: number} = {w: 3, h: 3}

    return (
        <Center>
            {
                getItemState() === 'saved' ? <Button w='80%' onClick={deleteItem} colorScheme='green'><DeleteIcon {...iconProps} /></Button> : <Button w='80%' onClick={saveItem} colorScheme='green'><AddIcon {...iconProps} /></Button>
            }
        </Center>
    )
}

export default CardControls