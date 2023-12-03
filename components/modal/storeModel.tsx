'use client';
import { useStoreModel } from "@/hook/useStoreModel";
import Modal from "../ui/modal";
import { useEffect, useState } from "react";
import React from "react";

const StoreModal = ({
    component,
    title,
    description = "",
    className,
}: {
    component?: JSX.Element,
    title: string,
    description?: string,
    className?: string,
}) => {
    const [isMounted, setIsMounted] = useState(false);
    const storeModel = useStoreModel();

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
                    {component}
                </div>
            </div>
        </Modal>
    );
};

export default StoreModal;