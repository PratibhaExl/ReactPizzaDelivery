import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'

export default function Products() {
    const productData=[
        {
          "id": 1,
          "category":"mens",
          "name": "AA",
          "price": 3456,
          "quantity": "10",
          "imagepath": "https://assets.ajio.com/medias/sys_master/root/20230921/Dt1e/650bc49dddf7791519ecd984/-473Wx593H-466608670-blue-MODEL.jpg"
        },
        {
          "id": 2,
          "category":"womens",
          "name": "B",
          "price": 4456,
          "quantity": 7,
          "imagepath": "https://assets.ajio.com/medias/sys_master/root/20230921/mebO/650bc4a4ddf7791519ecda28/-473Wx593H-466608670-blue-MODEL7.jpg"
        },
        {
          "id": 3,
          "category":"mens",
          "name": "C",
          "price": 5456,
          "quantity": 5,
          "imagepath": "https://assets.ajio.com/medias/sys_master/root/20230921/Dt1e/650bc49dddf7791519ecd984/-473Wx593H-466608670-blue-MODEL.jpg"
        },
        {
          "name": "E",
          "category":"mens",
          "price": "4444",
          "quantity": "4",
          "imagepath": "https://picsum.photos/200/300",
          "id": 5
        },
        {
          "name": "k",
          "category":"kids",
          "price": "4444",
          "quantity": "4",
          "imagepath": "https://picsum.photos/200/300",
          "id": 6
        }
      ];
      const {cname}=useParams();
    const [pro,setPro]=useState(productData);
   
   
    useEffect(()=>{
      if(cname!=undefined){
        const data=pro.filter(prod=> prod.category===cname);
        setPro(data);
        }
    },[cname])
     
  return (
    <div>
        <h2> {cname} products</h2>
        <div className='row'>
            {pro?.map(prod=> 
              <div className='col-sm-4' key={prod.id}>
                <h4> {prod.name} </h4>
                <p>
                    <img src={pro.imagepath} width={200} height={150} alt="pro_image"/>
                </p>
              </div>
            )}
        </div>
    </div>
  )
}
