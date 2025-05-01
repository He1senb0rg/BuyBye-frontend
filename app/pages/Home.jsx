import React, { useEffect, useState } from "react";
import Product from "../components/Product";
import { getProducts } from "../services/api";

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
        localStorage.setItem('token', data.token);
      } catch (error) {
        console.error("Erro ao fazer login:", error);
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
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <main>
      <section className="py-5 text-center container">
        <div className="row py-lg-5">
          <div className="col-lg-6 col-md-8 mx-auto">
            <h1 className="fw-light">Os Melhores Produtos!</h1>
            <p className="lead text-body-secondary">
              Era só o que me faltava, agora até o Lorem Ipsum fala à tuga! Não
              sou nada, nunca serei nada… a não ser que haja uma bela
              francesinha à minha espera! Ó chefe, saia mais um cafezinho e uma
              nata! Ó menino, não faças fita!
            </p>
            <p>
              <a href="#" className="btn btn-primary my-2">
                Começar a Comprar!
              </a>
            </p>
          </div>
        </div>
      </section>
      <section className="bg-body-tertiary py-5 ">
        <div className="container border-bottom pb-3">
          <p className="h1">Novidades</p>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
            {error && <p>{error}</p>}
            {loading ? <p>Loading...</p> : products.map((product) => (
              
                <Product
                  key={product.id}
                  name={product.name}
                  description={product.description}
                  price={product.price}
                  images={product.images}
                  rating={product.averageRating}
                  discount={product.discount}
                  link={`product/${product._id}`}
                />
              
            ))}
            
          </div>
          <div className="row">
            <div className="col text-center">
              <a href="#" className="btn btn-primary my-2">
                Ver Mais Produtos
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-body-tertiary py-5 ">
        <div className="container border-bottom pb-3">
          <p className="h1">Novidades</p>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
              <Product
                name="Bolsa Fixe"
                description="Bolsa mais fixe do universo ya"
                price="99,99"
                discountPrice="79,99"
                discount="50"
                image="/assets/images/cao.gif"
                rating={4.5}
                link="product"
              />

            <div className="col">
              <Product
                name="Bolsa Fixe"
                description="Bolsa mais fixe do universo ya"
                price="99,99"
                image="/assets/images/cao.gif"
                rating={4.5}
                link="product.html"
              />
            </div>
            <div className="col">
              <Product
                name="Bolsa Fixe"
                description="Bolsa mais fixe do universo ya"
                price="99,99"
                image="/assets/images/cao.gif"
                rating={4.5}
                link="product.html"
              />
            </div>
            <div className="col">
              <Product
                name="Bolsa Fixe"
                description="Bolsa mais fixe do universo ya"
                price="99,99"
                image="/assets/images/cao.gif"
                rating={4.5}
                link="product.html"
              />
            </div>
            <div className="col">
              <Product
                name="Bolsa Fixe"
                description="Bolsa mais fixe do universo ya"
                price="99,99"
                image="/assets/images/cao.gif"
                rating={4.5}
                link="product.html"
              />
            </div>
          </div>
          <div className="row">
            <div className="col text-center">
              <a href="#" className="btn btn-primary my-2">
                Ver Mais Produtos
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-body-tertiary pb-3">
        <div className="container">
          <p className="h1">Mais Vendidos</p>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
            <div className="col">
              <Product
                name="Bolsa Fixe"
                description="Bolsa mais fixe do universo ya"
                price="99,99"
                image="/assets/images/cao.gif"
                rating={4.5}
                link="product.html"
              />
            </div>
            <div className="col">
              <Product
                name="Bolsa Fixe"
                description="Bolsa mais fixe do universo ya"
                price="99,99"
                image="/assets/images/cao.gif"
                rating={4.5}
                link="product.html"
              />
            </div>
            <div className="col">
              <Product
                name="Bolsa Fixe"
                description="Bolsa mais fixe do universo ya"
                price="99,99"
                image="/assets/images/cao.gif"
                rating={4.5}
                link="product.html"
              />
            </div>
            <div className="col">
              <Product
                name="Bolsa Fixe"
                description="Bolsa mais fixe do universo ya"
                price="99,99"
                image="/assets/images/cao.gif"
                rating={4.5}
                link="product.html"
              />
            </div>
            <div className="col">
              <Product
                name="Bolsa Fixe"
                description="Bolsa mais fixe do universo ya"
                price="99,99"
                image="/assets/images/cao.gif"
                rating={4.5}
                link="product.html"
              />
            </div>
          </div>
          <div className="row">
            <div className="col text-center">
              <a href="#" className="btn btn-primary my-2">
                Ver Mais Produtos
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
