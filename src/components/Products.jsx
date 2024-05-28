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

  const handleDelete = async (product) => {
    let id = product._id.toString(); // Convert ObjectId to string
        console.log("Product ID to delete:", id);
        alert(`Deleting product with ID: ${id}`);

        try {
            const res = await deleteProduct(id);
            if (res.data.err === 0) {
                alert(res.data.msg);
                navigate('/products');
            } else {
                setErrMsg(res.data.msg);
            }
        } catch (err) {
            console.error("Error deleting product:", err);
            setErrMsg("An error occurred while deleting the product.");
        }

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


