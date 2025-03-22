import axios from "axios";
import { useState, useEffect } from "react";

const useAxiosFetch = (url, headers) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; // Prevent state updates if component unmounts

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(url, headers);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        if (isMounted) setData(result);
        console.log(result);
      } catch (err) {
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false; // Cleanup to prevent setting state on unmounted component
    };
  }, [url, headers]); // Re-fetch when `url` or `options` change

  return { data, loading, error };
};

export default useAxiosFetch;
