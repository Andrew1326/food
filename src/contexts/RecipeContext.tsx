import { createContext, useContext } from "react";
import { IRecipe } from "../components/screens/dish/dishTypes";
import useSessionStorage from "../hooks/useSessionStorage";

//* contexts
const RecipeContext = createContext<IRecipe | null>(null)
const RecipeUpdateContext = createContext<any>(null)

//* hooks
export const useRecipe = () => useContext(RecipeContext)
export const useRecipeUpdate = () => useContext(RecipeUpdateContext)

//* provider
const RecipeProvider = ({children}: {children: JSX.Element}): JSX.Element => {
    const [recipe, setRecipe] = useSessionStorage('recipe', null)

    return (
        <RecipeContext.Provider value={recipe}>
            <RecipeUpdateContext.Provider value={setRecipe}>
                {children}
            </RecipeUpdateContext.Provider>
        </RecipeContext.Provider>
    )
}

export default RecipeProvider