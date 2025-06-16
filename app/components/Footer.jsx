import React from 'react';

const Footer = () => (
  <footer className="container">
    <div className="row py-4 border-bottom">
      <div className="col-12 col-md-3 mb-3">
        <div className="d-flex flex-column align-items-center align-items-md-start">
          <img
            className="w-75 mb-2"
            style={{ maxWidth: "100%", height: "auto" }}
            height={60}
            alt="BuyByeLogo"
            src="/assets/images/BuyByeLogo.png"
          />
          <p className="text-body-secondary text-center text-md-start">
            A BuyBye é uma loja online dedicada a produtos de qualidade e com
            preços acessíveis.
          </p>
        </div>
      </div>
      <div className="col-6 col-md-2 mb-3">
        <div className="nav d-flex flex-column align-items-center align-items-md-start gap-1">
          <p className="h4">Explorar</p>
          <a
            href="#"
            className="nav-item text-decoration-none text-body-secondary"
          >
            Produtos
          </a>
          <a
            href="#"
            className="nav-item text-decoration-none text-body-secondary"
          >
            Novidades
          </a>
          <a
            href="#"
            className="nav-item text-decoration-none text-body-secondary"
          >
            Promoções
          </a>
        </div>
      </div>
      <div className="col-6 col-md-2 mb-3">
        <div className="nav d-flex flex-column align-items-center align-items-md-start gap-1">
          <p className="h4">Ajuda</p>
          <a
            href="#"
            className="nav-item text-decoration-none text-body-secondary"
          >
            Suporte ao Cliente
          </a>
          <a
            href="#"
            className="nav-item text-decoration-none text-body-secondary"
          >
            Contactos
          </a>
          <a
            href="#"
            className="nav-item text-decoration-none text-body-secondary"
          >
            Termos de Serviço
          </a>
          <a
            href="#"
            className="nav-item text-decoration-none text-body-secondary"
          >
            Política de Privacidade
          </a>
        </div>
      </div>
      <div className="col-12 col-md-3 mb-3">
        <div className="nav d-flex flex-column align-items-center align-items-md-start gap-1">
          <p className="h4">Conecta-te Connosco</p>
          <div className="d-flex justify-content-center justify-content-md-start">
            <a href="#" className="text-decoration-none text-body-secondary me-3">
              <i className="bi bi-facebook fs-4 icon-color" />
            </a>
            <a href="#" className="text-decoration-none text-body-secondary me-3">
              <i className="bi bi-instagram fs-4 icon-color" />
            </a>
            <a href="#" className="text-decoration-none text-body-secondary me-3">
              <i className="bi bi-twitter fs-4 icon-color" />
            </a>
          </div>
        </div>
      </div>
    </div>
    <div className="row py-3">
      <div className="col-12 col-md-6 d-flex flex-column flex-md-row align-items-center justify-content-center justify-content-md-start">
        <a
          href="#"
          className="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1"
        >
          <img
            className="w-100 mb-0"
            height={30}
            alt="BuyByeLogo"
            src="/assets/images/BuyByeIcon.png"
          />
        </a>
        <span className="text-body-secondary text-center text-md-start">
          Powered by <span className="text-primary fw-bold">BuyBye &copy; {new Date().getFullYear()}</span>
        </span>
      </div>
      <div className="col-12 col-md-6 d-flex justify-content-center justify-content-md-end">
        <img
          className="payment-icon"
          src="/assets/images/payment-methods/visa.svg"
          alt="Visa"
        />
        <img
          className="payment-icon"
          src="/assets/images/payment-methods/mastercard.svg"
          alt="MasterCard"
        />
        <img
          className="payment-icon"
          src="/assets/images/payment-methods/paypal.svg"
          alt="PayPal"
        />
        <img
          className="payment-icon"
          src="/assets/images/payment-methods/multibanco.svg"
          alt="Multibanco"
        />
        <img
          className="payment-icon"
          src="/assets/images/payment-methods/mb-way.svg"
          alt="MB Way"
        />
      </div>
    </div>
  </footer>
);

export default Footer;