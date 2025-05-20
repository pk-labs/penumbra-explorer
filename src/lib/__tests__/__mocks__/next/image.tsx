import { ImageProps } from 'next/image'
import { FC } from 'react'

const Image: FC<ImageProps> = props => (
    <img
        alt={props.alt}
        className={props.className}
        src={props.src.toString()}
    />
)

export default Image
