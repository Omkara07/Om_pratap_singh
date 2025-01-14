import React, { useState } from 'react';
import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, children }: any) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-white dark:bg-gray-900 shadow-xl shadow-gray-black border border-gray-700 rounded-lg w-full max-w-4xl aspect-video md:p-10 p-5 z-50 overflow-y-scroll max-md:h-full">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                    <X className="w-6 h-6" />
                </button>

                {/* Modal content */}
                {children}
            </div>
        </div>
    );
};

export default Modal;
