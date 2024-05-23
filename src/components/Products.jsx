import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductComponent from './ProductComponent';
import useGetResponseData from '../CustomHooks/GetResponseData';
import { deleteProduct } from '../services/ProductService';

export default function Products() {
  const [editedProduct, setEditedProduct] = useState(null);
  const productData = useGetResponseData("http://localhost:6677/api/v1/products/getallproducts");
  const [products, setProducts] = useState([]);
  const { cname } = useParams();
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (productData && productData.prodata) {
      setProducts(productData.prodata);
    }
  }, [productData]);

  useEffect(() => {
    if (cname) {
      const filteredProducts = productData.prodata.filter(prod => prod.category === cname);
      setProducts(filteredProducts);
    }
  }, [cname, productData]);

  const handleEdit = (product) => {
    navigate(`/updateproduct/${product._id}`, { state: { product } });
  };

  const handleDelete = (product) => {
    deleteProduct(product)
      .then(res => {
        if (res.data.err === 0) {
          alert(res.data.msg);
        } else {
          setErrMsg(res.data.msg);
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="product-row">
      {products.map((product, index) => (
        <div className="product" key={index}>
          <ProductComponent
            image={product.imagePath}
            name={product.name}
            price={product.price}
            product={product}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      ))}
    </div>
  );
}


