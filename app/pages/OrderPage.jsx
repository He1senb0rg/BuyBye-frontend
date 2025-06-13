import { useParams } from "react-router-dom";
import React, { useEffect, useState }  from "react";
import { fetchBillingHistory, fetchOrders,updateOrderStatus } from "../services/api";
import toast from "react-hot-toast";
import FloatingInput from "../components/FloatingInput";

const OrderPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [state, setStatus] = useState("pending");
  const [loading, setLoading] = useState(true);

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      toast.success(`Status atualizado para "${newStatus}"`);
  
      setOrder((prev) => ({
        ...prev,
        orderStatus: newStatus,
      }));
    } catch (error) {
      console.error("Erro:", error.message);
      toast.error("Erro ao atualizar o status.");
    }
  };
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const orders = await fetchOrders();
        const foundOrder = orders.find((o) => o._id === id);

        if (!foundOrder) {
          toast.error("Pedido não encontrado.");
        } else {
          setOrder(foundOrder);
        }

        setLoading(false);
      } catch (error) {
        console.error("Erro:", error.message);
        toast.error("Erro ao buscar o pedido.");
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) return <p>Carregando pedido...</p>;

  const paymentMethods = {
    paypal: "PayPal",
    multibanco: "Multibanco",
    mbway: "Mbway",
    ccdb: "Cartão de Crédito/Débito",
  };
  
  const displayPayment = paymentMethods[order.paymentMethod] || order.paymentMethod;

  const orderstatus = ['pending', 'paid', 'shipped', 'delivered']
  const status = {
    pending: "Pendente",
    paid: "Pago",
    shipped: "Enviado",
    delivered: "Entregue",
  };

  const nextStatus = orderstatus[orderstatus.indexOf(order.orderStatus) + 1] || order.orderStatus;

  const displayStatus = status[order.orderStatus] || order.status;
  const nextStatusDisplay = status[nextStatus] || nextStatus;

  return (
    <main>
      <section className="container py-4">
        <p className="h1">Pedido - {order._id}</p>
        <div className="row">
          <div className="col">
            <div className="card bg-body-tertiary">
              <div className="card-header">
                <h5 className="card-title mb-1">Informações Básicas</h5>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="row">
                    <div className="col">
                      <div className="form-floating input-group">
                        <input type="text"className="form-control rounded"id="Utilizador"value={order.user ? order.user.name : "Utilizador Desconhecido"}disabled/>
                        <label htmlFor="Utilizador">Utilizador</label>
                        <div className="btn-group" role="group">
                          <a href={`/admin/users/${order.user._id}`}className="btn btn-success mx-1 d-flex justify-content-center align-items-center"type="button"target="_blank">
                            <i className="bi bi-file-earmark-text"/>
                          </a>
                        </div>
                      </div>
                  </div>
                  <div className="col">    
                    <FloatingInput label="Valor Total"value={Number(order.totalAmount).toFixed(2) + " €"}disabled={true}/>
                  </div>
                  <div className="col">
                    <div className="form-floating input-group">
                    <input type="text"className="form-control rounded"id="Estado"value={displayStatus}disabled/>
                    <label htmlFor="Estado">Estado do Pedido</label>
                  </div>
                  </div>
                  <div className="col"> 
                    <FloatingInput label="Método de Pagamento"value={displayPayment}disabled={true}/>
                  </div>
                  </div>
                  <div className="row">
                    <div className="col">
                        <h5>Produtos</h5>{order.items && order.items.length > 0 ? (                                <table className="table table-striped border">
                        <thead>
                          <tr>
                          <th scope="col">#</th>
                          <th scope="col">Imagem</th>
                          <th scope="col">Nome</th>
                          <th scope="col">Quantidade</th>
                          <th scope="col">Preço</th>
                          <th scope="col">Desconto</th>
                          <th scope="col">Preço Final</th>
                          <th scope="col">Ações</th>
                          </tr>
                        </thead>
                        <tbody>
                          {order.items.map((item, index) => (
                          <tr key={item._id || index}>
                            <td>{item._id}</td>
                            <td>
                              <img
                                src={item.product.images[0] || "/assets/images/cao.gif"}
                                alt={item.product.name}
                                className="img-fluid rounded"
                                style={{ width: "50px", height: "50px" }}/>
                            </td>
                            <td>{item.product.name}</td>
                            <td>{item.quantity}</td>
                            <td>{item.price.toFixed(2)} €</td>
                            <td>
                              {item.product.discount
                                ? item.product.discount.type === "percentage"
                                ? `${item.product.discount.value * 100}%`
                                : `${item.product.discount.value}`: "-"}
                            </td> 
                            <td>
                              {item.product.discount
                                ? item.product.discount.type === "percentage"
                                  ? `${(
                                      (item.price *
                                      (1 - item.product.discount.value)) * item.quantity
                                    ).toFixed(2)}€`
                                  : `${(
                                      (item.price - item.product.discount.value) * item.quantity
                                    ).toFixed(2)}€`
                                : `${item.price * item.quantity}€`}
                            </td>
                            <td>
                              <div className="btn-group" role="group">
                                <a
                                  href={`/product/${item.product._id}`}
                                  className="btn btn-success mx-1 d-flex justify-content-center align-items-center"
                                  target="_blank"
                                  type="button">
                                  <i className="bi bi-file-earmark-text" />
                                </a>
                              </div>
                            </td>
                          </tr>
                            ))}
                        </tbody>
                        </table>
                          ) : (
                            <p>Nenhum produto encontrado neste pedido.</p>
                          )}
                    </div>
                  </div>
                  <div className="row">
                    <h5>Endereço de Entrega</h5>
                  </div>
                  <div className="row">
                    <div className="col">
                      <FloatingInput
                        label="Morada de Entrega"
                        value={order.shippingAddress.address}
                        disabled={true}/>
                    </div>
                    <div className="col">
                      <FloatingInput
                        label="Cidade"
                        value={order.shippingAddress.city}
                        disabled={true}/>
                    </div>
                    <div className="col">
                      <FloatingInput
                        label="Distrito"
                        value={order.shippingAddress.state}
                        disabled={true}/>
                    </div>
                    <div className="col">
                      <FloatingInput
                        label="Código Postal"
                        value={order.shippingAddress.zip}
                        disabled={true}/>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <div className="d-flex justify-content-end">
                        <div className="btn-group" role="group">
                          <button
                            data-bs-toggle="modal"
                            data-bs-target="#deleteModal"
                            type="button"
                            className="btn btn-primary"> Atualizar Estado do Pedido
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="modal fade" id="deleteModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Atualizar Estado do Pedido </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Fechar">
                </button>
            </div>
            <div className="modal-body">
              Tens a certeza que queres atualizar o estado do pedido para {nextStatusDisplay} Esta ação não pode ser revertida.
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal">Cancelar
              </button>
              <button type="button" data-bs-dismiss="modal" className="btn btn-primary" onClick={() => handleStatusUpdate(order._id, nextStatus)}>Atualizar
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default OrderPage;
