import * as React from 'react';
import { Unstable_Popup as BasePopup } from '@mui/base/Unstable_Popup';
import { styled } from '@mui/system';

const DetailButton = ({ transaction }) => {
  const [anchor, setAnchor] = React.useState(null);

  const handleClick = (event) => {
    setAnchor(anchor ? null : event.currentTarget);
  };

  const open = Boolean(anchor);
  const id = open ? `popup-${transaction.id}` : undefined;

  return (
    <div>
      <Button aria-describedby={id} onClick={handleClick}>
        Detalhe
      </Button>
      <BasePopup id={id} open={open} anchor={anchor}>
        <PopupBody>
          <strong>ID:</strong> {transaction.id}<br />
          <strong>Data:</strong> {transaction.date}<br />
          <strong>Quantidade:</strong> {transaction.amount}<br />
          <strong>Estado:</strong> {transaction.status}
        </PopupBody>
      </BasePopup>
    </div>
  );
};

export default DetailButton;