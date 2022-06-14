export type TRoute = {
    to: string,
    elem: JSX.Element,
    link?: string
}

export type TLink = Omit<TRoute, 'elem'>

export type TLinks = { links: TLink[] }

export type TImage = {
    src: string,
    alt: string
}

export type TSelectOption = {
    name: string,
    value: string
}