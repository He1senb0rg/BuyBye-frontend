import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { getProductById } from '../../services/api'; // You need to implement this or adjust path

const BACKEND_URL = "http://localhost:3000";

const getImageUrl = (image) => {
  if (!image) return "/assets/images/cao.gif";
  if (typeof image === "string") return `${BACKEND_URL}/images/${image}`;
  if (image.url && image.url.startsWith("http")) return image.url;
  if (image.url) return `${BACKEND_URL}/${image.url}`;
  return "/assets/images/cao.gif";
};

const ConfirmationPage = ({ formData }) => {
  const { user } = useAuth();
  const fullName = `${formData.firstName || ''} ${formData.lastName || ''}`.trim();
  const navigate = useNavigate();

  // State to hold full product info fetched by id
  const [products, setProducts] = useState({}); // key: productId, value: full product object

  useEffect(() => {
    // Fetch full product details for each product id in formData.items
    async function fetchProducts() {
      if (!formData.items) return;
      const productsMap = {};
      await Promise.all(
        formData.items.map(async (item) => {
          if (item.product && item.product._id) {
            try {
              const fullProduct = await getProductById(item.product._id);
              productsMap[item.product._id] = fullProduct;
            } catch (error) {
              // fallback to partial product data if fetch fails
              productsMap[item.product._id] = item.product;
            }
          }
        })
      );
      setProducts(productsMap);
    }
    fetchProducts();
  }, [formData.items]);

  const handleGoToBilling = () => {
    navigate('/account/billing');
  };

  const translatePaymentMethod = (method) => {
    switch (method) {
      case 'ccdb': return 'Cartão de Crédito/Débito';
      case 'paypal': return 'PayPal';
      case 'multibanco': return 'Multibanco';
      case 'mbway': return 'MB Way';
      default: return 'Método Desconhecido';
    }
  };

  const hasActiveDiscount = (discount) => {
    if (!discount) return false;
    const now = new Date();
    const start = discount.start_date ? new Date(discount.start_date) : null;
    const end = discount.end_date ? new Date(discount.end_date) : null;
    return (!start || now >= start) && (!end || now <= end);
  };

  const calculateDiscountedPrice = (product) => {
    if (hasActiveDiscount(product.discount)) {
      const { type, value } = product.discount;
      if (type === "percentage") {
        return Math.max(0, product.price * (1 - value));
      } else if (type === "fixed") {
        return Math.max(0, product.price - value);
      }
    }
    return product.price;
  };

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h2 className="mb-4 text-success">Pagamento Bem-sucedido!</h2>
        <p className="lead">Obrigado pela sua compra, {fullName || 'Cliente Valorizado'}!</p>
        <p className="mt-3">
          Recebemos a sua encomenda e enviaremos um email de confirmação para{' '}
          <strong>{user?.email || '[email]'}</strong>.
        </p>
      </div>

      <div className="row justify-content-center mb-5">
        <div className="col-md-8">
          <div className="card shadow p-4">
            <h5 className="mb-4 text-center">Resumo da Encomenda</h5>
            <ul className="list-unstyled text-start">
              <li><strong>Método de Pagamento:</strong> {translatePaymentMethod(formData.paymentMethod)}</li>

              {formData.paymentMethod === 'multibanco' && (
                <>
                  <li><strong>Entidade:</strong> 12345</li>
                  <li><strong>Referência:</strong> {formData.mbReferencia}</li>
                </>
              )}

              {formData.paymentMethod === 'mbway' && (
                <li><strong>MB Way:</strong> {formData.mbwayPhone}</li>
              )}

              {formData.paymentMethod === 'paypal' && (
                <li><strong></strong> {formData.paypalEmail}</li>
              )}

              {formData.paymentMethod === 'ccdb' && (
                <li><strong>Nome no Cartão:</strong> {formData.cardName}</li>
              )}
            </ul>

            <hr />

            <h6 className="mt-4 mb-3 text-center">Produtos Comprados</h6>
            <ul className="list-group text-start">
              {(formData.items || []).map((item, idx) => {
                // Use fetched product if available, else fallback
                const product = products[item.product?._id] || item.product || {};
                const discountActive = hasActiveDiscount(product.discount);
                const discountedPrice = calculateDiscountedPrice(product);

                return (
                  <li
                    key={idx}
                    className="list-group-item d-flex align-items-center justify-content-between"
                  >
                    <div className="d-flex align-items-center">
                      <img
                        src={getImageUrl(product.images?.[0])}
                        alt={product.name}
                        style={{
                          width: '80px',
                          height: '80px',
                          objectFit: 'cover',
                          marginRight: '1rem',
                          borderRadius: '8px',
                        }}
                      />
                      <div>
                        <strong>{product.name || 'Produto'}</strong><br />
                        <small>Qtd: {item.quantity}</small>
                      </div>
                    </div>
                    <div className="text-end">
                      {discountActive ? (
                        <>
                          <span className="badge bg-primary me-1">
                            {product.discount.type === "percentage"
                              ? `${(product.discount.value * 100).toFixed(0)}% OFF`
                              : `-€${product.discount.value.toFixed(2)}`}
                          </span>
                          <span className="fw-bold me-2">{(discountedPrice * item.quantity).toFixed(2)}€</span>
                          <span className="text-muted text-decoration-line-through">
                            {(product.price * item.quantity).toFixed(2)}€
                          </span>
                        </>
                      ) : (
                        <span className="fw-bold">{(product.price * item.quantity).toFixed(2)}€</span>
                      )}
                    </div>
                  </li>
                );
              })}

              {formData.amount && (
                <li className="list-group-item d-flex justify-content-between align-items-center fw-bold bg-body-secondary">
                  Total:
                  <span>{formData.amount.toFixed(2)}€</span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      <div className="text-center">
        <p className="mt-4">Pode fechar esta página ou continuar a comprar.</p>

        <button className="btn btn-primary mt-3" onClick={handleGoToBilling}>
          Ver Histórico de Compras
        </button>
      </div>
    </div>
  );
};

export default ConfirmationPage;