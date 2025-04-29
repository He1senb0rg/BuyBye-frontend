import React from 'react';
import NotificationToggle from './NotificationToggle';

const NotificationPreferenceCard = () => {
  return (
    <div className="card">
      <div className="card-header">Preferências de notificações</div>
      <div className="card-body">
        <form>
          <NotificationToggle
            id="checkAutoGroup"
            label="Subscrever automaticamente para notificações de lojas"
            checked={true}
          />
          <NotificationToggle
            id="checkAutoProduct"
            label="Subscrever automaticamente para notificações de produtos"
            checked={false}
          />
          <button className="btn btn-danger-soft text-danger mt-3">
            Desinscrever de todas as notificações
          </button>
        </form>
      </div>
    </div>
  );
};

export default NotificationPreferenceCard;
