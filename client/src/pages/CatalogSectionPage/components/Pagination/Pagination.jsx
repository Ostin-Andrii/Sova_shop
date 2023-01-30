import React, { useState, useEffect } from "react";
import "./Pagination.scss";

const Pagination = ({ itemsPerPage, productsQuantity, paginationRequest }) => {
  const pageNumbers = [];

  const url = window.location.search;
  const params = new URLSearchParams(url);
  const startPageParameter = params.get("startPage");

  const [currentPage, setCurrentPage] = useState(Number(startPageParameter) || 1);
  const [arrayOfCurrentPages, setArrayOfCurrentPages] = useState([]);

  for (let i = 1; i <= Math.ceil(productsQuantity / itemsPerPage); i++) {
    pageNumbers.push(i);
  }
  
  useEffect(() => {
    if (currentPage !== undefined) {
      paginationRequest(currentPage);
    }
    if (currentPage > Math.ceil(productsQuantity / itemsPerPage)) {
      setCurrentPage(1);
    }
  }, [currentPage, productsQuantity, itemsPerPage, paginationRequest]);

  useEffect(() => {
    let tempNumberOfPages = [...arrayOfCurrentPages];

    let dotsInitial = "...";
    let dotsLeft = "... ";
    let dotsRight = " ...";

    if (pageNumbers.length < 6) {
      tempNumberOfPages = pageNumbers;
    } else if (currentPage >= 1 && currentPage <= 3) {
      tempNumberOfPages = [1, 2, 3, 4, dotsInitial, pageNumbers.length];
    } else if (currentPage === 4) {
      const sliced = pageNumbers.slice(0, 5);
      tempNumberOfPages = [...sliced, dotsInitial, pageNumbers.length];
    } else if (currentPage > 4 && currentPage < pageNumbers.length - 2) {
      const sliced1 = pageNumbers.slice(currentPage - 2, currentPage);
      const sliced2 = pageNumbers.slice(currentPage, currentPage + 1);
      tempNumberOfPages = [
        1,
        dotsLeft,
        ...sliced1,
        ...sliced2,
        dotsRight,
        pageNumbers.length,
      ];
    } else if (currentPage > pageNumbers.length - 3) {
      const sliced = pageNumbers.slice(pageNumbers.length - 4);
      tempNumberOfPages = [1, dotsLeft, ...sliced];
    } else if (currentPage === dotsInitial) {
      setCurrentPage(arrayOfCurrentPages[arrayOfCurrentPages.length - 3] + 1);
    } else if (currentPage === dotsRight) {
      setCurrentPage(arrayOfCurrentPages[3] + 2);
    } else if (currentPage === dotsLeft) {
      setCurrentPage(arrayOfCurrentPages[3] - 2);
    }
    setArrayOfCurrentPages(tempNumberOfPages);
  }, [currentPage, productsQuantity]);

  return (
    <div style={{ marginTop: "30px" }}>
      <ul className="pagination-container">
        <span
          className={`page-button ${currentPage === 1 ? "disabled" : ""}`}
          onClick={() =>
            setCurrentPage((prev) => (prev <= 1 ? prev : prev - 1))
          }
        >
          Prev
        </span>
        {arrayOfCurrentPages.map((page) => (
          <li key={page}>
            <span
              key={page}
              className={`page-button ${currentPage === page ? "active" : ""}`}
              onClick={() => {
                setCurrentPage(page);
              }}
            >
              {" "}
              {page}{" "}
            </span>
          </li>
        ))}
        <span
          className={`page-button ${
            currentPage === pageNumbers.length ? "disabled" : ""
          }`}
          onClick={() =>
            setCurrentPage((prev) =>
              prev >= pageNumbers.length ? prev : prev + 1
            )
          }
        >
          Next
        </span>
      </ul>
    </div>
  );
};

export default Pagination;
