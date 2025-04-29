import React from 'react';
import NotificationToggle from './NotificationToggle';
import NotificationSwitch from './NotifcationSwitch';

const EmailNotificationCard = () => {
  return (
    <div className="card card-header-actions mb-3">
      <div className="card-header">
        <NotificationSwitch
          id="flexSwitchCheckChecked"
          label="Notificações de E-mail"
          checked={true}
        />
      </div>
      <div className="card-body">
        <form>
          <label className="small mb-2">
            Escolha que tipos de updates quer receber
          </label>
          <NotificationToggle
            id="checkAccountChanges"
            label="Mudanças feitas à sua conta"
            checked={true}
          />
          <NotificationToggle
            id="checkAccountGroups"
            label="Mudanças feita à sua loja"
            checked={true}
          />
          <NotificationToggle
            id="checkProductUpdates"
            label="Updates de produtos favoritos"
            checked={true}
          />
          <NotificationToggle
            id="checkProductNew"
            label="Informação sobre produtos novos"
            checked={true}
          />
          <NotificationToggle
            id="checkPromotional"
            label="Marketing e ofertas promocionais"
            checked={false}
          />
          <NotificationToggle
            id="checkSecurity"
            label="Alertas de segurança"
            checked={true}
            disabled={true}
          />
        </form>
      </div>
    </div>
  );
};

export default EmailNotificationCard;
