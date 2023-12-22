import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import productService from 'src/services/product.service';

import { ProductsView } from 'src/sections/products/view';

// ----------------------------------------------------------------------

export default function ProductDetailPage() {
  const { id } = useParams();
  const [data, setData] = useState();

  useEffect(() => {
    const loadProduct = async () => {
      await productService.product({ id }).then((res) => {
        setData(res.data);
      });
    };
    loadProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Helmet>
        <title> Products | {data?.product?.name ?? ''} </title>
      </Helmet>

      <ProductsView />
    </>
  );
}
