import { useEffect, useState } from "react";

const useWindow = (): React.Dispatch<React.SetStateAction<string>> => {
    const [url, setUrl] = useState<string>('')

    //* opening new window
    useEffect(() => {
        url && window.open(url)
    }, [url])

    return setUrl
}

export default useWindow