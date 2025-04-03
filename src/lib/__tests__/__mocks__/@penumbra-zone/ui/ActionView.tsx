import type { ActionViewProps } from '@penumbra-zone/ui/ActionView'

export const ActionView = (props: ActionViewProps) => (
    <div>{props.action.actionView.case}</div>
)

export type { ActionViewProps }
