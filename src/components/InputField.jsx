import { useState } from "react";

export default function InputField({ setField, type, field, name, required }) {
  const [inputType, setInputType] = useState(type);
  return (
    <div>
      <label htmlFor={name} className="block font-medium text-slate-200">
        {name}
        {type === "password" ? (
          <button
            type="button"
            onClick={() =>
              inputType === "password"
                ? setInputType("text")
                : setInputType("password")
            }
          >
            <img src="/images/password_eye.png" alt="password-eye" />
          </button>
        ) : (
          ""
        )}
      </label>

      <input
        type={inputType}
        value={field}
        onChange={(e) => setField(e.target.value)}
        placeholder={name}
        required={required}
        className="w-full p-2 border rounded"
        autoComplete="on"
      />
    </div>
  );
}
