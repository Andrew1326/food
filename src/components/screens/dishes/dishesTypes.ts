import { IRecipe } from "../dish/dishTypes";

export interface IRecipes { recipes: IRecipe[] }

export type TFormValue = { tags: string }