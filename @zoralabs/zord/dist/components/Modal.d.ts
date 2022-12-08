import { vars } from '../theme.css';
import * as Dialog from '@radix-ui/react-dialog';
import React from 'react';
export interface ModalContentProps extends Dialog.DialogContentProps {
    title?: string;
    showClose?: boolean;
    removePadding?: boolean;
    children?: JSX.Element;
    borderRadius?: keyof typeof vars.radii;
    modalContentClassName?: string;
}
export interface ModalProps extends Dialog.DialogProps {
    trigger?: React.ReactNode;
    overlayClassName?: string;
}
export declare const ModalTrigger: React.ForwardRefExoticComponent<Dialog.DialogTriggerProps & React.RefAttributes<HTMLButtonElement>>;
export declare const ModalClose: React.ForwardRefExoticComponent<Dialog.DialogCloseProps & React.RefAttributes<HTMLButtonElement>>;
export declare function Modal({ overlayClassName, trigger, children, ...props }: ModalProps): JSX.Element;
export declare const ModalContent: React.ForwardRefExoticComponent<ModalContentProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=Modal.d.ts.map