import React from "react";

interface DeleteModalProps {
  open: boolean;
  close: () => void;
  bookTitle: string;
  onDelete: () => void;
}

function DeleteModal({ open, close, bookTitle, onDelete }: DeleteModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={close}
    >
      <div
        className="bg-white p-6 rounded-lg w-full max-w-sm relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-4 text-black text-xl font-bold"
          onClick={close}
          aria-label="Close modal"
        >
          &times;
        </button>
        <h2 className="text-black mb-4 text-2xl">Confirm Delete</h2>
        <p className="text-black mb-6">
          Are you sure you want to delete <strong>"{bookTitle}"</strong>?
        </p>
        <div className="flex justify-between gap-4">
          <button
            onClick={close}
            className="w-1/2 px-4 py-2 rounded border border-gray-400 text-gray-700 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={onDelete}
            className="w-1/2 px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
