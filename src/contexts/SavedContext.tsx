import React, { createContext, useContext } from 'react';
import { IRecipe } from '../components/screens/dish/dishTypes';
import useLocalStorage from '../hooks/useLocalStorage';

//* contexts
const SavedContext = createContext<IRecipe[]>([])
const SavedUpdateContext = createContext<any>(null)

//* hooks
export const useSaved = () => useContext(SavedContext)
export const useSavedUpdate = () => useContext(SavedUpdateContext)

//* provider
const SavedProvider = ({children}: {children: JSX.Element[]}) => {
    const [saved, setSaved] = useLocalStorage<IRecipe[]>('saved', [])

    return (
        <SavedContext.Provider value={saved}>
            <SavedUpdateContext.Provider value={setSaved}>
                {children}
            </SavedUpdateContext.Provider>
        </SavedContext.Provider>
    )
}

export default SavedProvider