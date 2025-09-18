import { Link, useParams } from "react-router-dom";

function ProductDetailPage(){
    const params =  useParams()
    return <>
     <h1>Product details</h1>
     <p>{params.productId}</p>
     <button> <Link to=".." relative="path">Back</Link> </button>
    </>
   
}

export default ProductDetailPage;