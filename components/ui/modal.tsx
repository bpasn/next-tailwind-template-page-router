'use client';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "./dialog";


interface ModalProps {
    title: string;
    description: string;
    isOpen: boolean;
    onClose: () => void;
    children?: React.ReactNode;
    size?: "sm" | "md" | "lg";
    className?: string
}

const Modal: React.FC<ModalProps> = ({
    title,
    description,
    isOpen,
    onClose,
    children,
    size = "md",
    className
}) => {
    const onChange = (open: boolean) => {
        onClose();
        document.body.style;
    }
    // 
    return (
        <Dialog open={isOpen} onOpenChange={onChange}> 
            <div className="w-full">
                <DialogContent className={className}>
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                        <DialogDescription>{description}</DialogDescription>
                    </DialogHeader>
                    <div>{children}</div>
                </DialogContent>
            </div>
        </Dialog>
    )
}

export default Modal;