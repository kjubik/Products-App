import ProductCard from "./ProductCard";
import { Product } from "src/types";

interface ProductListProps {
    products: Product[];
}

const ProductsList = (props: ProductListProps) => {

    return (
    <>
        <h3>Products List</h3>
        <ul>
            {props.products.map((product) => {
                return (
                    <li key={product.id} className="py-4">
                        <ProductCard product={product} />
                    </li>
                )
            })}
        </ul>
    </>
    );
  };
  
  export default ProductsList;
  