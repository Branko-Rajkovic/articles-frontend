import { useState } from "react";
import InputField from "./InputField";

export default function SiginInForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    console.log("Form submitted:", username, email, password, confirmPassword);
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <InputField
        type="text"
        name="username"
        field={username}
        setField={setUsername}
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
        field={confirmPassword}
        setField={setConfirmPassword}
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
