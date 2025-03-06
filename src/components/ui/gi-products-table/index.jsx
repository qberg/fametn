"use client";

import React, { useState } from "react";
import styles from "./styles.module.css";
import { Container, Table, Form, Button, Pagination } from "react-bootstrap";
import { Search, FilterList } from "@mui/icons-material";
import { useRouter } from "next/router";
import Link from "next/link";

const GIProductsTable = ({
  products,
  categories,
  pagination,
  activeFilters,
}) => {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState(activeFilters.search || "");

  const applyFilters = (newFilters) => {
    const filters = { ...activeFilters, ...newFilters };

    const query = {};
    if (filters.category && filters.category !== "all")
      query.category = filters.category;
    if (filters.search) query.search = filters.search;
    if (filters.page && filters.page > 1) query.page = filters.page;

    router.push(
      {
        pathname: router.pathname,
        query,
      },
      undefined,
      { scroll: false },
    );
  };

  const handleCategoryChange = (categorySlug) => {
    applyFilters({ category: categorySlug, page: 1 });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    applyFilters({ search: searchInput, page: 1 });
  };

  const handlePageChange = (pageNumber) => {
    applyFilters({ page: pageNumber });
  };

  const renderPaginationItems = () => {
    const { page, pageCount } = pagination;
    const items = [];

    // First and Previous buttons
    items.push(
      <Pagination.First
        key="first"
        onClick={() => handlePageChange(1)}
        disabled={page === 1}
      />,
      <Pagination.Prev
        key="prev"
        onClick={() => handlePageChange(Math.max(1, page - 1))}
        disabled={page === 1}
      />,
    );

    if (pageCount <= 7) {
      for (let i = 1; i <= pageCount; i++) {
        items.push(
          <Pagination.Item
            key={i}
            active={i === page}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </Pagination.Item>,
        );
      }
    } else {
      if (page > 3) {
        items.push(
          <Pagination.Item key={1} onClick={() => handlePageChange(1)}>
            1
          </Pagination.Item>,
          <Pagination.Ellipsis key="ellipsis1" />,
        );
      }

      const startPage = Math.max(1, page - 1);
      const endPage = Math.min(pageCount, page + 1);

      for (let i = startPage; i <= endPage; i++) {
        items.push(
          <Pagination.Item
            key={i}
            active={i === page}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </Pagination.Item>,
        );
      }

      if (page < pageCount - 2) {
        items.push(
          <Pagination.Ellipsis key="ellipsis2" />,
          <Pagination.Item
            key={pageCount}
            onClick={() => handlePageChange(pageCount)}
          >
            {pageCount}
          </Pagination.Item>,
        );
      }
    }

    items.push(
      <Pagination.Next
        key="next"
        onClick={() => handlePageChange(Math.min(pageCount, page + 1))}
        disabled={page === pageCount}
      />,
      <Pagination.Last
        key="last"
        onClick={() => handlePageChange(pageCount)}
        disabled={page === pageCount}
      />,
    );

    return items;
  };

  return (
    <div className={styles.tableSection}>
      <Container>
        {/* Filters and Search */}
        <div className={styles.filtersContainer} data-aos="fade-up">
          <div className={styles.categoryFilters}>
            <div className={styles.filterHeader}>
              <FilterList fontSize="small" />
              <span>Filter by Category</span>
            </div>
            <div className={styles.categoryButtons}>
              <Button
                variant={
                  !activeFilters.category || activeFilters.category === "all"
                    ? "primary"
                    : "outline-primary"
                }
                onClick={() => handleCategoryChange("all")}
                size="sm"
              >
                All
              </Button>

              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`${styles.categoryButton} ${activeFilters.category === category.attributes.slug ? styles.categoryButtonActive : ""}`}
                  onClick={() => handleCategoryChange(category.attributes.slug)}
                >
                  {category.attributes.name}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.searchContainer}>
            <Form onSubmit={handleSearch} className={styles.searchForm}>
              <div className={styles.searchIcon}>
                <Search fontSize="small" />
              </div>
              <Form.Control
                type="text"
                placeholder="Search by name or location..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className={styles.searchInput}
              />
              <Button
                type="submit"
                className={styles.searchButton}
                variant="primary"
                size="sm"
              >
                Search
              </Button>
            </Form>
          </div>
        </div>

        {/* Results summary */}
        <div className={styles.resultsInfo} data-aos="fade-up">
          Showing {products.length} items
          {pagination?.total ? ` of ${pagination.total} products` : ""}
          {activeFilters.search && (
            <span className={styles.searchInfo}>
              &nbsp;for search: &quot;{activeFilters.search}&quot;
            </span>
          )}
          {activeFilters.category && activeFilters.category !== "all" && (
            <span className={styles.filterInfo}>
              &nbsp;in category: &quot;
              {categories.find(
                (c) => c.attributes.slug === activeFilters.category,
              )?.attributes.name || activeFilters.category}
              &quot;
            </span>
          )}
        </div>

        {/* Table */}
        <div className={styles.tableContainer}>
          <Table
            hover
            responsive
            className={styles.productsTable}
            data-aos="fade-up"
          >
            <thead>
              <tr>
                <th className={styles.productNameColumn}>Product Name</th>
                <th className={styles.locationColumn}>Location</th>
                <th className={styles.dateColumn}>GI Since</th>
                <th className={styles.categoryColumn}>Category</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((product, index) => {
                  const { id, attributes } = product;

                  return (
                    <tr key={id} data-aos="fade-up" data-aos-delay={50 * index}>
                      <td>{attributes.name}</td>
                      <td>{attributes.location}</td>
                      <td>
                        {new Date(attributes.issued_date).toLocaleDateString()}
                      </td>
                      <td>
                        {attributes.gi_products_category?.data?.attributes
                          ?.name || "Uncategorized"}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className={styles.noResults}>
                    No products match your search criteria
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>

        {/* Pagination */}
        {pagination && pagination.pageCount > 1 && (
          <div className={styles.paginationContainer} data-aos="fade-up">
            <Pagination>{renderPaginationItems()}</Pagination>
            <div className={styles.pageInfo}>
              Page {pagination.page} of {pagination.pageCount}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default GIProductsTable;
