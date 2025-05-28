import { useState } from "react";
import edit from "../assets/edit.svg";
import trash from "../assets/trash.svg";
import DeleteModal from "./DeleteModal";
import { Link } from "react-router-dom";
import EditModal from "./EditModal";

function BookCard({ book, onDelete, fetchBooks }) {
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const getStatusLabel = (status) => {
    switch (status) {
      case 1:
        return <span className="bg-red-500 text-white px-3 py-1 rounded-[8.5px] text-sm">New</span>;
      case 2:
        return <span className="bg-yellow-400 text-white px-3 py-1 rounded-[8.5px] text-sm">Reading</span>;
      case 3:
        return <span className="bg-green-500 text-white px-3 py-1 rounded-[8.5px] text-sm">Finished</span>;
      default:
        return null;
    }
  };

  const handleDelete = () => {
    onDelete(book._id);
    setShowDelete(false);
  };

  return (
    <div className="relative group bg-white text-black rounded-xl shadow-md p-5 w-[397px] h-[214px]">
      <DeleteModal
        open={showDelete}
        close={() => setShowDelete(false)}
        bookTitle={book.title}
        onDelete={handleDelete}
      />
      <EditModal
  open={showEdit}
  close={() => setShowEdit(false)}
  book={book}
  fetchBooks={fetchBooks}
/>

      <div className="absolute z-10 top-3 -right-[34px] flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button className="w-8 h-8" onClick={() => setShowDelete(true)}>
          <img
            src={trash}
            alt="Trash"
            className="w-full shadow-lg rounded h-full bg-[#FF4D4F] p-[8px] hover:opacity-90"
          />
        </button>
        <button className="w-8 h-8" onClick={() => setShowEdit(true)}>
          <img
            src={edit}
            alt="Edit"
            className="w-full shadow-lg rounded h-full p-[8px] bg-[#6200EE] hover:opacity-90"
          />
        </button>
      </div>

      <h2 className="font-semibold mb-1">{book.title}</h2>
      <p>
        Cover:{" "}
        <Link to={book.cover} className="text-blue-500 hover:underline">
          {book.cover}
        </Link>
      </p>
      <p className="mt-1">Pages: {book.pages}</p>
      <p className="mt-1">Published: {new Date(book.published).getFullYear()}</p>
      <p className="mt-1">Isbn: {book.isbn}</p>
      <p className="mt-[20px] text-sm text-gray-700">{book.author || "Unknown Author"}</p>

      <div className="absolute bottom-4 right-4">{getStatusLabel(book.status)}</div>
    </div>
  );
}

export default BookCard;
