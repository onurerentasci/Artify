import React from "react";
import CreatePage from "./CreatePage";
import Loading from "../components/Loading";

const HomePage = () => {
  return (
    <React.Fragment>
      <Loading />
      <CreatePage />
    </React.Fragment>
  );
};

export default HomePage;
