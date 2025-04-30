// istanbul ignore file
import { FC } from 'react'

interface Props {
    className?: string
}

const Twitter: FC<Props> = props => (
    <svg
        className={props.className}
        fill="none"
        height="17"
        viewBox="0 0 18 17"
        width="18"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M2.9873 2.5293L7.61744 9.2793L3.08537 14.5293H4.08948L8.06091 9.92568L11.2188 14.5293H15.0126L10.1752 7.47769L14.4439 2.5293H13.4429L9.73114 6.82946L6.7811 2.5293H2.9873Z"
            fill="currentColor"
        />
    </svg>
)

export default Twitter
