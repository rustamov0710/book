import { useEffect, useState, useRef } from "react";
import BookCard from "./BookCard";
import Modal from "./Modal";
import { API } from "../utils/config";

function Books({ searchTitle }) {
  const [books, setBooks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const ref = useRef(null);

  const getBooks = async () => {
    try {
      const res = await API.get("/books");
      setBooks(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const searchBooks = async (title) => {
    if (!title) {
      getBooks();
      return;
    }

    try {
      const res = await API.get(`/books/${title}`);
      setBooks(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (ref.current) clearTimeout(ref.current);

    ref.current = setTimeout(() => {
      searchBooks(searchTitle.trim());
    }, 5);

    return () => clearTimeout(ref.current);
  }, [searchTitle]);

  const handleDelete = async (id) => {
    try {
      await API.delete(`/books/${id}`);
      setBooks((prev) => prev.filter((book) => book._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <div className="min-h-screen px-8 py-6 text-white">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">
            You've got{" "}
            <span className="text-purple-600">
              {books.length} {books.length === 1 ? "book" : "books"}
            </span>
          </h1>
          <p className="text-md mt-3">Your books today</p>
        </div>
        <button
          className="bg-purple-600 hover:opacity-90 text-white px-4 py-2 rounded text-sm"
          onClick={() => setShowModal(true)}
        >
          + Create a book
        </button>
      </div>

      <div className="flex flex-wrap gap-[50px]">
        {books.map((book) => (
          <BookCard fetchBooks={getBooks} key={book._id} book={book} onDelete={handleDelete} />
        ))}
      </div>

      <Modal open={showModal} close={() => setShowModal(false)} fetchBooks={getBooks} />
    </div>
  );
}

export default Books;
