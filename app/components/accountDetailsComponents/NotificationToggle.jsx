import React from 'react';

const NotificationToggle = ({ id, label, checked, disabled = false }) => (
  <div className="form-check mb-2">
    <input
      className="form-check-input"
      id={id}
      type="checkbox"
      defaultChecked={checked}
      disabled={disabled}
    />
    <label className="form-check-label" htmlFor={id}>
      {label}
    </label>
  </div>
);

export default NotificationToggle;