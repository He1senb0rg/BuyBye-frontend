import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const DetailButton = ({ transaction }) => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const formattedDate = new Date(transaction.createdAt).toLocaleDateString('pt-PT');
  const formattedAmount = `€${transaction.totalAmount.toFixed(2)}`;

  // Status translation map
  const statusTranslations = {
    pending: 'Pendente',
    paid: 'Pago',
    shipped: 'Enviado',
    delivered: 'Entregue',
  };

  const translatedStatus = statusTranslations[transaction.orderStatus] || transaction.orderStatus;

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Detalhes
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Detalhes da Encomenda</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div><strong>ID:</strong> {transaction._id}</div>
          <div><strong>Data:</strong> {formattedDate}</div>
          <div><strong>Montante:</strong> {formattedAmount}</div>
          <div><strong>Estado:</strong> {translatedStatus}</div>
          <div><strong>Itens:</strong></div>
          <ul>
            {(Array.isArray(transaction.items) ? transaction.items : []).map((item, index) => (
              <li key={index}>
                {item.product?.name ?? item.name ?? 'Produto'} x{item.quantity} ({item.selectedColor || 'Normal'}, {item.selectedSize || 'Normal'}) / €{(item.price || 0).toFixed(2)}
              </li>
            ))}
          </ul>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default DetailButton;