import { useEffect, useState } from "react";

export default function register() {
  const [user, setUser] = useState({});

  return (
    <div>
      <button>Log in</button>
      <button>Sign in</button>
    </div>
  );
}
