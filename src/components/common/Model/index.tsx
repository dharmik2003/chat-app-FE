import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../../button";
import { cn } from "@/lib/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  className,
}) => {
  if (!isOpen) return null;

  return (
    // <div className="fixed inset-0 flex items-center justify-center bg-gray-100 z-50  transition-opacity">
    //   <div className="bg-white rounded-md shadow-md p-6 w-1/3">
    //     <div className="flex justify-between items-center">
    //       <button onClick={onClose} className="text-black font-semibold">
    //         Close
    //       </button>
    //     </div>
    //     {children}
    //   </div>
    // </div>

    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={cn("sm:max-w-[425px]", className)}>
        {children}
      </DialogContent>
    </Dialog>
  );
};
