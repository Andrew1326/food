import { Stack, Heading, useMediaQuery } from "@chakra-ui/react"
import Video from "./shared/Video"

type TVariantProps = {
    heading: string,
    src: string
}

const Advantages = (): JSX.Element => {

    //* media queries
    const [isLargerThan481] = useMediaQuery('(min-width: 481px)')

    //* advantages
    const advantages: {heading: string, src: string}[] = [
        {heading: 'Many food on your choose', src: require('../videos/food_variants.mp4')},
        {heading: 'Plenty of recipes', src: require('../videos/food_choose.mp4')},
        {heading: 'Recipes with instructions', src: require('../videos/cooking.mp4')}
    ]

    //* component variants
    const Variant1 = ({ heading, src }: TVariantProps) => <>
    <Heading size='2xl' marginBottom='1.5%'>{heading}</Heading>
    <Video src={src} />
    </>

    const Variant2 = ({ heading, src }: TVariantProps) => <>
    <Video src={src} />
    <Heading size='2xl' marginBottom='1.5%'>{heading}</Heading>
    </>

    return (
        <>
        {
            advantages.map((advantage, i) => <Stack key={i} direction={['column', 'row']} paddingTop='5%'>
            {
                isLargerThan481 ? i % 2 === 0 ? <Variant1 {...advantage} />
                :
                <Variant2 {...advantage} />
                :
                <Variant1 {...advantage} />
            }
        </Stack>)
        }
        </>
    )
}

export default Advantages