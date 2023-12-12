'use client';
import { useStoreModalBase } from "@/hook/useStoreModel";
import Modal from "../ui/modal";
import { useEffect, useState } from "react";
import React from "react";

const StoreModal = ({
    children,
    title,
    description = "",
    className
}: {
    title: string,
    description?: string,
} & React.HTMLAttributes<any>) => {
    const [isMounted, setIsMounted] = useState(false);
    const storeModel = useStoreModalBase<ProductModel>();
    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }
    return (
        <Modal
            title={title}
            description={description}
            isOpen={storeModel.isOpen}
            onClose={storeModel.onClose}
            className={className}
        >
            <div>
                <div className="space-y-4 py-2 px-4">
                    {children}
                </div>
            </div>
        </Modal>
    );
};

export default StoreModal;