import { Product } from "src/types";
// import DropdownButton from "src/components/common/DropdownButton";

interface ProductCardProps {
    product: Product;
    userIsAdmin: boolean;
    viewerId: string | undefined;
}

const ProductsCard = (props: ProductCardProps) => {

    return (
        <>
            <div className="flex flex-col gap-4 max-w-sm p-4 rounded-lg bg-slate-50 
            outline outline-1 outline-slate-200">
                <div className="flex w-full justify-between gap-4 px-1">
                    <p className="">
                        {props.product.creatorUsername}
                    </p>
                    
                    <div className="flex gap-4 font-semibold"> 
                        <a href={`/edit-product/${props.product.id}`}
                        className="text-slate-800/70 hover:text-slate-800">
                            Edit
                        </a>
                        <a href={`/product/${props.product.id}`}
                        className="text-red-500/70 hover:text-red-500">
                            Delete
                        </a>
                    </div>
                    {/* <DropdownButton listItems={[{name: props.product.title, link: `product/${props.product.id}`}]} /> */}
                </div>

                <img src={props.product.imageUrl} alt="product image" 
                className="max-w-sm rounded" />

                <div className="flex flex-col gap-2 px-1">
                    <h4 className="text-3xl font-bold text-slate-900 tracking-tight">
                        {props.product.title}
                    </h4>
                    <p className="text-sm font-regular text-slate-400">
                        {props.product.description}
                    </p>
                </div>

                <p className="text-slate-400">
                    {props.product.creationDate.toDate().toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                </p>
                <input type="text" placeholder="Write a comment" className="rounded-full outline outline-1 outline-slate-300 
                px-4 py-2 w-full placeholder-slate-400 bg-inherit text-slate-900
                focus:outline focus:outline-2 focus:outline-blue-400"/>
            </div>
        </>
    );
};

export default ProductsCard;
  