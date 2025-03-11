import { useState } from "react";
import InputField from "./InputField";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SiginInForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      alert("Passwords do not match");
      return;
    }

    try {
      const newUser = { name, email, password, passwordConfirm };
      console.log(newUser);
      const response = await axios.post(
        "http://127.0.0.1:3000/api/v1/users/signup",
        JSON.stringify(newUser),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(response?.data);
      console.log("Form submitted:", name, email, password, passwordConfirm);
      response?.data.status === "succes" &&
        navigate("/confirm-email", { replace: true });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <InputField
        type="text"
        name="name"
        field={name}
        setField={setName}
        required={true}
      />

      <InputField
        type="email"
        name="email"
        field={email}
        setField={setEmail}
        required={true}
      />

      <InputField
        type="password"
        name="password"
        field={password}
        setField={setPassword}
        required={true}
      />

      <InputField
        type="password"
        name="Confirm Password"
        field={passwordConfirm}
        setField={setPasswordConfirm}
        required={true}
      />

      <button
        type="submit"
        className="w-full py-2 font-bold text-white rounded-lg bg-sky-300 hover:bg-sky-500"
      >
        Sign In
      </button>
    </form>
  );
}
