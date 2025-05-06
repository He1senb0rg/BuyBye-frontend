import React, { useEffect, useState } from "react";
import Product from "../components/Product";
import { getProducts } from "../services/api";
import ProductsRow from "../components/ProductsRow";
import ShopBanner from "../components/ShopBanner";
import toast from "react-hot-toast";

const Home = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    tipo: "",
  });
  const [token, setToken] = useState("");

  useEffect(() => {
    const login = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: "teste@email.com",
            password: "senhaSegura123",
          }),
        });

        const data = await response.json();
        console.log("Login response:", data);

        // Atualiza os dados do usuário
        setUserData({
          name: data.user.name,
          email: data.user.email,
          tipo: data.user.role,
        });

        // Atualiza o token
        setToken(data.token);
        localStorage.setItem("token", data.token);
        toast.success("Login realizado com sucesso!");
      } catch (error) {
        console.error("Erro ao fazer login:", error);
        toast.error("Erro ao fazer login.");
      }
    };

    login();
  }, []);

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
