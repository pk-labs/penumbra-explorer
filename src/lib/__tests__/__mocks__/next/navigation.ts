import * as navigation from 'next/navigation'

export const notFound = jest.fn()
export const permanentRedirect = jest.fn()
export const ReadonlyURLSearchParams = navigation.ReadonlyURLSearchParams
export const redirect = jest.fn()
export const RedirectType = navigation.RedirectType
export const ServerInsertedHTMLContext = navigation.ServerInsertedHTMLContext

export const useParams = jest.fn(() => ({}))

export const usePathname = jest.fn(() => '/')

const router = {
    back: () => jest.fn(),
    forward: () => jest.fn(),
    prefetch: () => jest.fn(),
    push: () => jest.fn(),
    refresh: () => jest.fn(),
    replace: () => jest.fn(),
}

export const useRouter = () => router

const searchParams = new ReadonlyURLSearchParams()
export const useSearchParams = jest.fn(() => searchParams)

export const useSelectedLayoutSegment = navigation.useSelectedLayoutSegment
export const useSelectedLayoutSegments = navigation.useSelectedLayoutSegments
export const useServerInsertedHTML = navigation.useServerInsertedHTML
