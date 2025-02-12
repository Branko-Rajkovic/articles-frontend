import axios from "axios";
import { useEffect, useState } from "react";

export default function Login() {
  const [email, setUserEmail] = useState();
  const [password, setPassword] = useState();

  useEffect(function () {
    try {
      async function fetchUser() {
        const { data } = await axios.post(
          "http://127.0.0.1:3000/api/v1/users/login",
          user,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      }
    } catch (err) {
      console.log(err);
    } finally {
      console.log("end of register request");
    }
  });

  async function loginUser(credentials) {
    const response = await axios.post(
      "http://127.0.0.1:3000/api/v1/users/login",
      JSON.stringify(credentials),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await loginUser({
      email,
      password,
    });
    setToken(token);
  };

  return (
    <div className="p-4 bg-slate-700 text-slate-200">
      <h2 className="text-xl font-semibold">Log in</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" />
        </label>
        <label>
          <p>Password</p>
          <input
            type="password"
            name="password"
            required
            autoComplete="password"
          />
          ​
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
