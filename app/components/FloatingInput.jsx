import React from "react";

const floatingInput = ({
  type,
  id,
  name,
  placeholder,
  label,
  value,
  onChange,
  maxLength,
  isTextArea = false,
  disabled = false,
  required = false,
}) => {
  return (
    <div className="form-floating mb-3">
      {isTextArea ? (
        <textarea
          className="form-control"
          placeholder={placeholder}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          maxLength={maxLength}
          disabled={disabled}
          required={required}
        />
      ) : (
        <input
          type={type}
          className="form-control"
          id={id}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          maxLength={maxLength}
          disabled={disabled}
          required={required}
        />
      )}
      <label htmlFor={id}>{label}</label>
    </div>
  );
}
export default floatingInput;