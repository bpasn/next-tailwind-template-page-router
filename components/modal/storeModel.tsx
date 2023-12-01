'use client';
import { useStoreModel } from "@/hook/useStoreModel"
import Modal from "../ui/modal";

const StoreModal = ({
    children,
    title,
    description = "",
    className
}: {
    children?: React.JSX.Element,
    title: string,
    description?: string,
    className?:string
}) => {
    const storeModel = useStoreModel();
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
    )
}

export default StoreModal;