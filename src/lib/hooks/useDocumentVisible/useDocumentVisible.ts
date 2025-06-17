import { useEffect, useState } from 'react'

const useDocumentVisible = () => {
    const [visible, setVisible] = useState(true)

    useEffect(() => {
        const onVisibilityChanged = () => setVisible(!document.hidden)

        document.addEventListener('visibilitychange', onVisibilityChanged)

        return () => {
            document.removeEventListener(
                'visibilitychange',
                onVisibilityChanged
            )
        }
    }, [])

    return visible
}

export default useDocumentVisible
