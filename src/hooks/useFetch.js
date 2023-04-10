import React, { useEffect, useState } from 'react';
import axios from 'axios';

const useFetch = (endPoint) => {
  const [data, setData] = useState([]);
  async function fetchData() {
    const response = await axios.get(endPoint);
    console.log(response);
    setData(response.data);
  }

  useEffect(() => {
    try {
      fetchData();
    } catch (e) {
      console.log(e);
    }
  }, []);
  return data;
};

export default useFetch;
