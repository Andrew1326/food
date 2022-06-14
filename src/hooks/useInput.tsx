import { useState, ChangeEvent, } from "react"
import { Input as ChakraInput } from "@chakra-ui/react"

const useInput = (): [string, JSX.Element] => {
    const [value, setValue] = useState<string>('')

    //* handle change
    const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)

    //* input
    const Input: JSX.Element = <ChakraInput maxW='400px' value={value} onChange={handleValueChange} textAlign='center' placeholder='Enter title...' />

    return [value, Input]
}

export default useInput