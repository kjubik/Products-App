import ProductCard from "./ProductCard";
import { Product } from "src/types";

interface ProductListProps {
    products: Product[];
}

const ProductsList = (props: ProductListProps) => {

    return (
    <>
        <ul className="grid grid-cols-3 gap-4">
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
  