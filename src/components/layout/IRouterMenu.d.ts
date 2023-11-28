import { LucideIcon, icons } from "lucide-react"; // <--- import type from library

interface IRouterMenu {
    routeLink?: string;
    label: string;
    icon?: keyof typeof icons;
    expanded?: boolean;
    children?: ISideBar[];
}