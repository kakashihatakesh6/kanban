import { X } from "lucide-react";

interface ModalProps {
    title: string;
    children: React.ReactNode;
    onClose: () => void;
    onConfirm: () => void;
}

export function Modal({ title, children, onClose, onConfirm }: ModalProps) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-slate-50 backdrop-blur-sm bg-opacity-10 z-50">
            <div className="bg-white p-6 rounded-md shadow-lg w-96 relative">
                {/* Close Button */}
                <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={onClose}>
                    <X size={20} />
                </button>

                {/* Modal Title */}
                <h2 className="text-lg font-semibold mb-4">{title}</h2>

                {/* Modal Content */}
                <div className="mb-4">{children}</div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-3">
                    <button
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    {title === "Delete Task" ? (
                        <button
                            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                            onClick={onConfirm}
                        >
                            Confirm
                        </button>
                    ) : (
                        <button
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:blue-red-700"
                            onClick={onConfirm}
                        >
                            Confirm
                        </button>
                    )}

                </div>
            </div>
        </div>
    );
}
