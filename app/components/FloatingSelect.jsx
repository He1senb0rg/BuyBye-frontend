import React from "react";

const FloatingSelect = ({
  id,
  label,
  name,
  options,
  value,
  onChange,
  placeholder = "Selecione uma opção",
    disabled = false,
  required = false,
}) => {
  return (
    <div className="form-floating mb-3">
      <select
        className="form-select"
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <label htmlFor={id}>{label}</label>
    </div>
  );
}
export default FloatingSelect;