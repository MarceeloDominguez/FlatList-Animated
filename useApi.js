import { useEffect, useState } from "react";
import { API_KEY } from "@env";

const useApi = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
        );
        const data = await response.json();
        setData(data?.results);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return { data };
};

export default useApi;
