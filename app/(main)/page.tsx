import { Product } from "../lib/types/generatedTypes";
import { ProductCard } from "../components/ui/ProductCard";
import Carousel from "../components/ui/Carousel";

const page = async () => {
  const productsRes = await fetch(`${process.env.BACKEND_URL}/products/`);
  const products: Product[] = await productsRes.json();
  return (
    <div>
      {products && products.length > 0 && (
        <Carousel>
          {products?.map((item) => (
            <div className="flex items-center justify-center h-full">
              <ProductCard key={item?.id} product={item} />
            </div>
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default page;
