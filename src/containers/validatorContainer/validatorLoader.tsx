// istanbul ignore file
import { faker } from '@faker-js/faker'
import { FC } from 'react'
import { classNames, shortenHash } from '@/lib/utils'

export interface Props {
    className?: string
    validator: string
}

const ValidatorLoader: FC<Props> = async props => {
    const validator = await new Promise<any>(resolve =>
        setTimeout(
            () =>
                resolve({
                    description: faker.lorem.paragraph(5),
                    hash: props.validator,
                }),
            faker.number.int({ max: 2000, min: 1000 })
        )
    )

    return (
        <section
            className={classNames(
                'bg-other-tonalFill5 flex flex-col gap-6 rounded-lg p-6',
                'backdrop-blur-lg',
                props.className
            )}
        >
            <header>
                <h1 className="text-2xl">
                    {shortenHash(validator.hash, 'end')}
                </h1>
            </header>
            <p className="text-text-secondary text-sm">
                {validator.description}
            </p>
        </section>
    )
}

export default ValidatorLoader
