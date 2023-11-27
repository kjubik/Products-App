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
                <div className="flex justify-between px-1
                text-sm font-regular text-slate-500 tracking-tight">
                    <p className="">
                        {props.product.creatorUsername}
                    </p>
                    <p className="">
                        {props.product.creationDate.toDate().toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </p>
                </div>
                {/* <div className="rounded-full outline outline-1 outline-slate-300">
                    <input type="text" className="px-4 py-2 w-full placeholder-slate-400" placeholder="Write a comment" />
                </div> */}
            </div>
        </>
    );
};

export default ProductsCard;
  