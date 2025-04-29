import React from 'react';

const NotificationSwitch = ({ id, label, checked }) => (
  <div className="form-check form-switch">
    {label}{' '}
    <input
      className="form-check-input"
      id={id}
      type="checkbox"
      defaultChecked={checked}
    />
    <label className="form-check-label" htmlFor={id}></label>
  </div>
);

export default NotificationSwitch;