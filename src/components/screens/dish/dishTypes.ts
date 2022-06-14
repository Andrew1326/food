
    export interface IMetric {
        amount: number;
        unitLong: string;
        unitShort: string;
    }

    export interface IUs {
        amount: number;
        unitLong: string;
        unitShort: string;
    }

    export interface IMeasures {
        metric: IMetric;
        us: IUs;
    }

    export interface IExtendedIngredient {
        aisle: string;
        amount: number;
        consitency: string;
        id: number;
        image: string;
        measures: IMeasures;
        meta: string[];
        name: string;
        original: string;
        originalName: string;
        unit: string;
    }

    export interface IProductMatch {
        id: number;
        title: string;
        description: string;
        price: string;
        imageUrl: string;
        averageRating: number;
        ratingCount: number;
        score: number;
        link: string;
    }

    export interface IWinePairing {
        pairedWines: string[];
        pairingText: string;
        productMatches: IProductMatch[];
    }

    export interface IStep {
        equipment: IEquipment[];
        ingredients: IIngredient[];
        number: number;
        step: string;
        length: ILength;
        completed?: boolean
    }

    export interface ISteps {
        name: string;
        steps: IStep[];
    }

    export interface IInstructions extends Array<ISteps> { }

    export interface IRecipe {
        id: number;
        title: string;
        image: string;
        imageType: string;
        servings: number;
        readyInMinutes: number;
        license: string;
        sourceName: string;
        sourceUrl: string;
        spoonacularSourceUrl: string;
        aggregateLikes: number;
        healthScore: number;
        spoonacularScore: number;
        pricePerServing: number;
        analyzedInstructions: IInstructions;
        cheap: boolean;
        creditsText: string;
        cuisines: any[];
        dairyFree: boolean;
        diets: any[];
        gaps: string;
        glutenFree: boolean;
        instructions: string;
        ketogenic: boolean;
        lowFodmap: boolean;
        occasions: any[];
        sustainable: boolean;
        vegan: boolean;
        vegetarian: boolean;
        veryHealthy: boolean;
        veryPopular: boolean;
        whole30: boolean;
        weightWatcherSmartPoints: number;
        dishTypes: string[];
        extendedIngredients: IExtendedIngredient[];
        summary: string;
        cooking?: boolean
    }

    export interface ITemperature {
        number: number;
        unit: string;
    }

    export interface IEquipment {
        id: number;
        image: string;
        name: string;
        temperature: ITemperature;
    }

    export interface IIngredient {
        id: number;
        image: string;
        name: string;
    }

    export interface ILength {
        number: number;
        unit: string;
    }

    export type TDescription = {
        text: string,
        img: string
    }[]