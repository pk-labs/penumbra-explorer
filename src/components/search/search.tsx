'use client'

import clsx from 'clsx'
import { Field, Form, Formik } from 'formik'
import { Search as SearchIcon } from 'lucide-react'
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
    const results = useRef<HTMLDivElement>(null)

    const focusInput = useCallback(() => input.current?.focus(), [])

    const onFocus = useCallback(() => {
        if (results.current) {
            results.current.style.display = 'block'
        }
    }, [])

    const onBlur = useCallback(() => {
        if (results.current) {
            results.current.style.display = 'none'
        }
    }, [])

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
                <Form>
                    <Field
                        ref={input}
                        className={styles.input}
                        name="query"
                        onBlur={onBlur}
                        onFocus={onFocus}
                        placeholder="Search by address, hash number, blocks, etc."
                    />
                </Form>
            </Formik>
            <div ref={results} className={styles.results} />
        </div>
    )
}

export default Search
