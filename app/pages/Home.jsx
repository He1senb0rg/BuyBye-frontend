import React, { useEffect, useState } from "react";
import Product from "../components/products/Product";
import { getProducts, getProductsSales, getProductById } from "../services/api";
import ProductsRow from "../components/products/ProductsRow";
import ShopBanner from "../components/ShopBanner";
import toast from "react-hot-toast";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [productsSales, setProductsSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response.products);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setError("Failed to fetch products");
        toast.error("Erro ao buscar os produtos.");
      } finally {
        setLoading(false);
      }
    };

 const fetchProductsSales = async () => {
  try {
    const response = await getProductsSales();
    const fetchedProducts = response.products;

    // Fetch images for each product
    const productsWithImages = await Promise.all(
      fetchedProducts.map(async (product) => {
        try {
          const productDetails = await getProductById(product._id);
          return { ...product, images: productDetails.images };
        } catch (err) {
          console.error(`Failed to fetch images for product ${product._id}`, err);
          return { ...product, images: [] };
        }
      })
    );

    setProductsSales(productsWithImages);
  } catch (error) {
    console.error("Failed to fetch products sales:", error);
    setError("Failed to fetch products sales");
    toast.error("Erro ao buscar os produtos.");
  } finally {
    setLoading(false);
  }
};

    fetchProductsSales();
    fetchProducts();
  }, []);

  return (
    <main>
      <ShopBanner />
      <section className="bg-body-tertiary py-5 ">
        <ProductsRow
          products={products}
          title="Novidades"
          error={error}
          loading={loading}
          link={"/latest"}
        />
        <ProductsRow
          products={productsSales}
          title="Em Promoção"
          error={error}
          loading={loading}
          link={"/sales"}
        />
      </section>
    </main>
  );
};

export default Home;
