import type { ButtonProps } from '@penumbra-zone/ui/Button'

export const Button = (props: ButtonProps) => (
    <button disabled={props.disabled} onClick={props.onClick}>
        {props.icon && <props.icon />}
        {props.children}
    </button>
)

export type { ButtonProps }
