import React from "react";
import "../UI/InputField.scss";

const InputField = ({
  label,
  type,
  msg,
  name,
  register, 
  errors,
  validation = {},
  isDimmed,
  options,
  disabled,
  placeholder
}) => {
  return (
    <div className="inputField">
      <label htmlFor={label}>{label}</label>
      {options ? (
        <select
          {...(register
            ? register(name, { required: msg, ...validation })
            : {})}
          type={type}
          placeholder={label}
          className={isDimmed ? "dim" :     ""}
          name={name}
          id={label}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              e.target.form?.requestSubmit();
            }
          }}
        >
          <option value="" disabled >
            Select {label}
          </option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : (
        <input
          className={errors?.[name] ? "error" : "" || isDimmed ? "dim" : ""}
          placeholder={placeholder?placeholder:label}
          id={label}
          type={type}
          disabled={disabled}
          name={name}
          {...(register
            ? register(name, { required: msg, ...validation })
            : {})}
        />
      )}
      {errors?.[name] && <div className="active">{errors[name].message}</div>}
    </div>
  );
};

export default InputField;
