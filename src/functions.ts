//* create search params
export const createSearchParams = (data: Record<string, string>): string => {
    const sortedData = Object.fromEntries(Object.entries(data).filter(el => !!el[1] && el[1] !== '(empty)'))
    const searchParams = new URLSearchParams(sortedData)
    const paramsStr = searchParams.toString()
    return paramsStr
}

//* lower
export const createLower = (str: string) => str.toLowerCase()