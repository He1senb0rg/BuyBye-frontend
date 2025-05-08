import React, { useEffect, useState } from "react";
import Product from "../components/Product";
import { getProducts } from "../services/api";
import ProductsRow from "../components/ProductsRow";
import ShopBanner from "../components/ShopBanner";
import toast from "react-hot-toast";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setError("Failed to fetch products");
        toast.error("Erro ao buscar os produtos.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <main>
      <ShopBanner 
        title="Loja de Produtos"
        description="Encontre os melhores produtos para você!"
        link="/products"
        buttonText="Ver Produtos"
      />
      <section className="bg-body-tertiary py-5 ">
        <ProductsRow
          products={products}
          title="Novidades"
          error={error}
          loading={loading}
        />
      </section>
    </main>
  );
};

export default Home;
