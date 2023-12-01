'use client';

import StoreModal from "@/components/modal/storeModel";
import { useEffect, useState } from "react";

export const ModalProvider = ({
    children,
    title,
    description,
    className
}: {
    title: string,
    description?: string,
    children: React.JSX.Element,
    className?: string
}) => {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return <StoreModal title={title} description={description} children={children} className={className} />
}