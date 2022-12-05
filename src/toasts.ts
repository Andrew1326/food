import { UseToastOptions } from "@chakra-ui/react"

//* default toast options
export const defaultToastOptions: UseToastOptions = {
    duration: 1500,
    isClosable: true
}

//* recipe completed toast
export const recipeCompletedToast: UseToastOptions = {
    title: 'Congratulations!',
    description: 'Recipe is completed. Bon appetit!',
    status: 'success',
    ...defaultToastOptions
}

//* dish saved toast
export const savedToast: UseToastOptions = {
    title: 'Saved successfully!',
    description: 'Dish was added to saved.',
    status: 'success',
    ...defaultToastOptions
} 

//* dish deleted toast
export const deletedToast: UseToastOptions = {
    title: 'Deleted successfully!',
    description: 'Dish was deleted from saved.',
    status: 'warning',
    ...defaultToastOptions
}