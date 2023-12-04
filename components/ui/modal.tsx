'use client';

import { cn } from "@/lib/utils";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "./dialog";


interface ModalProps extends React.HTMLAttributes<any> {
    title: string;
    description: string;
    isOpen: boolean;
    onClose: () => void;
    children?: React.ReactNode;
    size?: "sm" | "md" | "lg";
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
            <div className="">
                <DialogContent className={cn(
                    className,
                    "!overflow-y-scroll md:!overflow-x-scroll max-h-screen"
                )}>
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