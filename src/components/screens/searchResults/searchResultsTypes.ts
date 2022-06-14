export interface ISearchRecipe {
    id: number;
    title: string;
    calories: number;
    carbs: string;
    fat: string;
    image: string;
    imageType: string;
    protein: string;
}

export interface ISearchRecipes {
    offset: number;
    number: number;
    results: ISearchRecipe[];
    totalResults: number;
}