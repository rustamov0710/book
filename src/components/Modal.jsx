import { useState } from "react";
import { API } from "../utils/config"; 
import { toast } from "react-toastify";

function Modal({ open, close, fetchBooks }) {
  if (!open) return null;

  const [isbn, setIsbn] = useState("");

  const handleSubmit = async () => {

    try {
      await API.post("/books", { isbn: isbn });
      toast.success("Book added successfully");
      close();
      fetchBooks(); 
    } catch (err) {
      console.log(err.message);
      toast.error("Failed to submit");
    }
  };

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
          className="absolute top-2 right-4 text-black text-xl"
          onClick={close}
        >
          &times;
        </button>
        <h2 className="text-xl text-black mb-4">Create a book</h2>
        <label htmlFor="isbn" className="text-sm text-black mb-1">
          ISBN
        </label>
        <input
          type="text"
          id="isbn"
          className="text-black border border-gray-300 rounded-lg py-3 px-4 w-full mb-5 focus:outline-none focus:border-gray-400"
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
        />
        <div className="flex justify-between gap-2">
          <button
            onClick={close}
            className="border border-purple-600 text-purple-600 px-4 py-2 rounded w-full"
          >
            Close
          </button>
          <button
            onClick={handleSubmit}
            className="bg-purple-600 text-white px-4 py-2 rounded w-full"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
