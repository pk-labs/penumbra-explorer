import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

const classNames: typeof clsx = (...inputs) => twMerge(clsx(inputs))

export default classNames
