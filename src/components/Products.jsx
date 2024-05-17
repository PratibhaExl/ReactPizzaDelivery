
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductComponent from './ProductComponent';
import useGetResponseData from '../CustomHooks/GetResponseData';
import { deleteProduct } from '../services/ProductService';

export default function Products() {
  const [editedProduct, setEditedProduct] = useState(null);
  const productData = useGetResponseData("http://localhost:6677/api/v1/products/getallproducts");
  const [products, setProducts] = useState([]);
  const { cname } = useParams();
  const [errMsg,setErrMsg]=useState("");

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
    // Set the product to be edited
    setEditedProduct(product);
  };

  const handleDelete = (product) => {
    // Delete the product with the given ID
    deleteProduct(product)
          .then(res=> {
            if(res.data.err==0){
              alert(res.data.msg)
            }
            if(res.data.err==1){
              setErrMsg(res.data.msg)
            }
          })
          .catch(err=> console.log(err))
  };

  return (
    <div className="product-row">
      {products.map((product, index) => (
        <div className="product" key={index}>
          <ProductComponent
            image={product.imagepath}
            name={product.name}
            price={product.price}
            product={product} // Pass the updateCartCount function as a prop
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      ))}
    </div>
  );
}


// import React,{useState,useEffect} from 'react'
// import { Container } from 'react-bootstrap';
// import { useParams } from 'react-router-dom'
// import ProductComponent from './ProductComponent'; 
// import useGetResponseData from '../CustomHooks/GetResponseData'

// export default function Products() {
//   const [editedProduct, setEditedProduct] = useState(null);
//   const productData=useGetResponseData("http://localhost:6677/api/v1/products/getallproducts");
//   const [pro,setPro]=useState(productData.prodata);
//   const {cname}=useParams();


//   const handleEdit = (product) => {
//     // Set the product to be edited
//     setEditedProduct(product);
//   };

//   const handleDelete = (productId) => {
//     // Delete the product with the given ID
//     // Implement deletion logic here
//   };

//     console.log("products",productData.prodata)

//   useEffect(()=>{

//     if(cname!=undefined){
//       const data=pro.filter(prod=> prod.category===cname);
//       setPro(data);
//       }
//   },[cname])
 



//   return (
//     <div className="product-row">
//       {pro.map((product, index) => (
//         <div className="product" key={index}>
//           <ProductComponent
//             image={product.imagepath}
//             name={product.name}
//             price={product.price}
//             product={product} // Pass the updateCartCount function as a prop
//             onEdit={handleEdit}
//             onDelete={handleDelete}
//           />
//         </div>
//       ))}
//     </div>
  
// )
// }
