import { useEffect, useState } from "react";

export function useAuthFetch(path: string) {
  const [data, setData] = useState([]);
  async function getFetchData() {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${path}`, {})
      .then((res) => res.json())
      .then((data) => setData(data));
  }
  console.log({ data, path });
  useEffect(() => {
    getFetchData();
  }, []);
  return { isLoading: !data, data };
}
