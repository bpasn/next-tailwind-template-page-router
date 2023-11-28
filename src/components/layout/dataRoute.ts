import { LayoutDashboard, LogIn, ShoppingCart, User2 } from "lucide-react";
import { IRouterMenu } from "./IRouterMenu";

export const dataRoute: IRouterMenu[] = [
    {
      routeLink: "/dashboard",
      icon: "LayoutDashboard",
      label: "Dashboard",
    },
    {
      icon: "ShoppingCart",
      label: "E-commerce",
      expanded:false,
      children: [
        {
          label: "Categories",
          children:[
            {
              routeLink:"/e-commerce/categories",
              label:"Category",
            },
            {
              routeLink:"/e-commerce/categories/sub-category",
              label:"SubCategory",
            }
          ]
        },
        {
          routeLink: "/e-commerce/products",
          label: "Products",
        },
        {
          routeLink: "/e-commerce/brand",
          label: "Brands",
        },
        {
          label: "Orders",
          children:[
            {
              routeLink: "/e-commerce/orders",
              label:"Order"
            },
            {
              routeLink: "/e-commerce/orders/history",
              label:"Order History"
            },
  
          ]
        },
      ]
    },
    {
      routeLink: "/profile",
      icon: "User2",
      label: "Users",
    },
  
    {
      routeLink: "/signin",
      icon: "LogIn",
      label: "Sign In",
    },
  
  ];