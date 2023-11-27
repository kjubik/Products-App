import { Product } from "src/types";

interface ProductCardProps {
    product: Product;
}

const ProductsCard = (props: ProductCardProps) => {


    return (
        <>
            <div className="flex flex-col gap-4 max-w-sm p-4 rounded">
                <img src={props.product.imageUrl} alt="product image" 
                className="max-w-sm rounded" />
                <div className="flex flex-col gap-2 px-1">
                    <h4 className="text-3xl font-bold text-slate-900 tracking-tight">
                        {props.product.title}
                    </h4>
                    <p className="text-sm font-regular text-slate-400 tracking-tight">
                        {props.product.description}
                    </p>
                </div>
                <div className="flex justify-between px-1">
                    <p className="text-sm font-regular text-slate-600 tracking-tight">
                        {props.product.creatorUserId}
                    </p>
                    <p className="text-sm font-regular text-slate-600 tracking-tight">
                        {props.product.creationDate.toDate().toLocaleDateString()}
                    </p>
                </div>
            </div>
        </>
    );
};

export default ProductsCard;
  