'use client'

import clsx from 'clsx'
import { Field, Form, Formik } from 'formik'
import { Box, Search as SearchIcon } from 'lucide-react'
import { FC, ReactNode, useCallback, useRef } from 'react'
import styles from './search.module.css'

interface FormValues {
    query: string
}

interface Props {
    children?: ReactNode
    className?: string
    narrow?: boolean
}

const Search: FC<Props> = props => {
    const input = useRef<HTMLInputElement>(null)

    const focusInput = useCallback(() => input.current?.focus(), [])

    const onSubmit = useCallback(async (values: FormValues) => {
        console.log('onSubmit:', values)
    }, [])

    return (
        <div className={clsx(styles.root, props.className)}>
            <SearchIcon
                className={styles.icon}
                onClick={focusInput}
                size={16}
            />
            <Formik<FormValues>
                initialValues={{ query: '' }}
                onSubmit={onSubmit}
            >
                {formik => (
                    <Form>
                        <Field
                            ref={input}
                            className={styles.input}
                            name="query"
                            placeholder="Search by address, hash number, blocks, etc."
                        />
                        <div className={styles.results}>
                            {formik.values.query ? (
                                <>
                                    <div className={styles.title}>
                                        Nothing found
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className={styles.title}>
                                        Recent search results
                                    </div>
                                    <ul className={styles.list}>
                                        <li>
                                            <Box
                                                color="var(--textSecondary)"
                                                size={16}
                                            />
                                            1,057,456
                                        </li>
                                        <li>
                                            <Box
                                                color="var(--textSecondary)"
                                                size={16}
                                            />
                                            1,057,456
                                        </li>
                                        <li>
                                            <Box
                                                color="var(--textSecondary)"
                                                size={16}
                                            />
                                            1,057,456
                                        </li>
                                    </ul>
                                </>
                            )}
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default Search
