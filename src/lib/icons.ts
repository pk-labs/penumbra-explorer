// istanbul ignore file
import {
    ArrowLeftIcon,
    ArrowRightIcon,
    BoxIcon,
    CheckCheckIcon,
    CheckIcon,
    ChevronRightIcon,
    CopyIcon,
    ExternalLinkIcon,
    HomeIcon,
    Link2Icon,
    MaximizeIcon,
    MenuIcon,
    MinimizeIcon,
    SearchIcon,
    XIcon,
} from 'lucide-react'

// Hash map of icon name string to icon function because functions can't be
// passed from server to client component
export default {
    ArrowLeft: ArrowLeftIcon,
    ArrowRight: ArrowRightIcon,
    Box: BoxIcon,
    Check: CheckIcon,
    CheckCheck: CheckCheckIcon,
    ChevronRight: ChevronRightIcon,
    Copy: CopyIcon,
    ExternalLink: ExternalLinkIcon,
    Home: HomeIcon,
    Link2: Link2Icon,
    Maximize: MaximizeIcon,
    Menu: MenuIcon,
    Minimize: MinimizeIcon,
    Search: SearchIcon,
    X: XIcon,
}
