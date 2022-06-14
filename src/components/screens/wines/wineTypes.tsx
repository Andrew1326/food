import { IProductMatch } from "../dish/dishTypes";

export type TFormValue = { wineType: string }

export interface IRecommendedWines {
    recommendedWines: IProductMatch[];
    totalFound: number;
}

export type TEnteringType = 'select' | 'input'