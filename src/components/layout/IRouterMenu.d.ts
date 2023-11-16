import { LucideIcon } from "lucide-react" // <--- import type from library

interface IRouterMenu {
    routeLink?: string;
    label: string;
    icon?: LucideIcon;
    expanded?: boolean;
    children?: ISideBar[];
}