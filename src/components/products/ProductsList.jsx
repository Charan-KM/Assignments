import React, { useEffect, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories, fetchProducts, setSelectedCategory } from "../../store/reducers/products";
import { selectProducts, selectCategories, selectLoading, selectHasMore } from "../../store/selectors/products";
import TableComponent from "../../components/core/Table";

const ProductsList = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const categories = useSelector(selectCategories);
  const loading = useSelector(selectLoading);
  const hasMore = useSelector(selectHasMore);
  const selectedCategory = useSelector((state) => state.products.selectedCategory);
  const observer = useRef();

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProducts({ category: selectedCategory, skip: 0 }));
  }, [dispatch, selectedCategory]);

  const fetchMoreProducts = useCallback(() => {
    if (loading || !hasMore) return;
    dispatch(fetchProducts({ category: selectedCategory, skip: products.length }));
  }, [dispatch, loading, hasMore, products.length, selectedCategory]);

  const lastProductRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchMoreProducts();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, fetchMoreProducts]
  );

  const headers = ["title", "category", "price", "rating", "stock"];
  const formattedData = products.map((product) => ({
    title: product.title,
    category: product.category,
    price: `$${product.price.toFixed(2)}`,
    rating: product.rating,
    stock: product.stock,
  }));

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Products</h2>

      <div className="mb-4 flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category.slug || category.name}
            className={`px-4 py-2 border rounded ${selectedCategory === category.slug ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
            onClick={() => dispatch(setSelectedCategory(category.slug))}
          >
            {category.name}
          </button>
        ))}
      </div>

      <TableComponent headers={headers} data={formattedData} />

      {loading && <p className="text-center p-4">Loading more products...</p>}
      {!loading && products.length === 0 && <p className="text-center p-4">No products found</p>}
    </div>
  );
};

export default ProductsList;