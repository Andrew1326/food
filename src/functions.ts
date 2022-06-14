import { UseToastOptions } from "@chakra-ui/react"

//* create search params
export const createSearchParams = (data: Record<string, string>): string => {
    const sortedData = Object.fromEntries(Object.entries(data).filter(el => !!el[1] && el[1] !== '(empty)'))
    const searchParams = new URLSearchParams(sortedData)
    const paramsStr = searchParams.toString()
    return paramsStr
}

//* lower
export const createLower = (str: string) => str.toLowerCase()

//* default toast options
export const defaultToastOptions: UseToastOptions = {
    duration: 1500,
    isClosable: true
}