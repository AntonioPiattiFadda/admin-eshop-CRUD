import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import FormProduct from '@/components/FormProducts';
import axios from 'axios';
import endPoints from '@/Services/api';

export default function Edit() {
  const [product, setProduct] = useState({});
  const router = useRouter();
  useEffect(() => {
    const { id } = router.query;
    async function getProduct() {
      if (!router?.isReady) return;
      const response = await axios.get(endPoints.products.getProduct(id));
      setProduct(response.data);
      console.log(response.data);
    }
    getProduct()
      .then((res) => console.log('listoriti'))
      .catch((e) => console.log(e));
  }, [router?.isReady]);

  return (
    <>
      <FormProduct product={product} />
    </>
  );
}
