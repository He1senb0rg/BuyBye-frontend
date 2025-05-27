import React, { useState } from 'react';

const DetailButton = ({ transaction }) => {
  const [show, setShow] = useState(false);

  // Function to open the modal
  const handleShow = () => setShow(true);

  // Function to close the modal
  const handleClose = () => setShow(false);

  // Format the transaction date and amount
  const formattedDate = new Date(transaction.createdAt).toLocaleDateString('pt-PT');
  const formattedAmount = `${transaction.totalAmount.toFixed(2)} €`;

  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Detalhe
      </Button>

      {/* Bootstrap Modal for displaying transaction details */}
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
            {transaction.items.map((item, index) => (
              <li key={index}>
                {item.product?.name || 'Produto'} - {item.quantity}x ({item.selectedColor || '-'}, {item.selectedSize || '-'}) @{' '}
                {item.price?.toFixed(2)} €
              </li>
            ))}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DetailButton;