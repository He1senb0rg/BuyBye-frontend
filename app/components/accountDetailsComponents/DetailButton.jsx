import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const DetailButton = ({ transaction }) => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const formattedDate = new Date(transaction.createdAt).toLocaleDateString('pt-PT');
  const formattedAmount = `€${transaction.totalAmount.toFixed(2)}`;

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Detalhe
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Detalhes da Encomenda</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div><strong>ID:</strong> {transaction._id}</div>
          <div><strong>Data:</strong> {formattedDate}</div>
          <div><strong>Montante:</strong> {formattedAmount}</div>
          <div><strong>Estado:</strong> {transaction.orderStatus}</div>
          <div><strong>Items:</strong></div>
          <ul>
            {(Array.isArray(transaction.items) ? transaction.items : []).map((item, index) => (
              <li key={index}>
                {item.product?.name ?? item.name ?? 'Produto'} - {item.quantity}x ({item.selectedColor || '-'}, {item.selectedSize || '-'}) @ €{(item.price || 0).toFixed(2)}
              </li>
            ))}
          </ul>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default DetailButton;