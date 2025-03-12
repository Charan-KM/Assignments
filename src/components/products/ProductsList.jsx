import React, { useEffect, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories, fetchProducts, setSelectedCategory } from "../../store/reducers/products";
import { selectProducts, selectCategories, selectLoading, selectHasMore } from "../../store/selectors/products";

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

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Name</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Rating</th>
              <th className="border p-2">Stock</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.id} ref={index === products.length - 1 ? lastProductRef : null} className="hover:bg-gray-50">
                <td className="border p-2">{product.title}</td>
                <td className="border p-2">{product.category}</td>
                <td className="border p-2">${product.price.toFixed(2)}</td>
                <td className="border p-2">{product.rating}</td>
                <td className="border p-2">{product.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {loading && <p className="text-center p-4">Loading more products...</p>}
      {!loading && products.length === 0 && <p className="text-center p-4">No products found</p>}
    </div>
  );
};

export default ProductsList;