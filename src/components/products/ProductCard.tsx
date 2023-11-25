import { Product } from "src/types";

interface ProductCardProps {
    product: Product;
}

const ProductsCard = (props: ProductCardProps) => {


    return (
        <>
            <div>
                <img src={props.product.imageUrl} alt="product image" className="max-w-sm" />
                <h4>{props.product.title}</h4>
                <p>{props.product.description}</p>
            </div>
        </>
    );
};

export default ProductsCard;
  