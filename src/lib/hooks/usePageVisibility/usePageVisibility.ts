import { useEffect, useState } from 'react'

const usePageVisibility = () => {
    const [visible, setVisible] = useState(() => !document.hidden)

    useEffect(() => {
        const onVisibilityChange = () => {
            setVisible(!document.hidden)
        }

        document.addEventListener('visibilitychange', onVisibilityChange)

        return () => {
            document.removeEventListener('visibilitychange', onVisibilityChange)
        }
    }, [])

    return visible
}

export default usePageVisibility
