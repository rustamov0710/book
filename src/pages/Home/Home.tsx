import { useState, FC } from "react";
import Header from "../../components/Header";
import Books from "../../components/Books";
import { ToastContainer } from "react-toastify";

const Home: FC = () => {
  const [searchTitle, setSearchTitle] = useState<string>("");

  return (
    <>
      <Header setSearchTitle={setSearchTitle} />
      <Books searchTitle={searchTitle} />
      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
};

export default Home;
