import { Product } from "@/app/lib/types/generatedTypes";
import Image from "next/image";
import Link from "next/link";

export const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Link
      className="border-0 p-6 bg-gray-200 rounded-lg"
      href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${product?.slug}`}
    >
      {product.imageUrl ? (
        <Image
          width={300}
          height={300}
          alt={product.name}
          src={product.imageUrl}
        />
      ) : (
        <Image
          src="/images/300*300.png"
          width={300}
          height={300}
          alt={product.name}
        />
      )}
      <p className="text-md my-4 font-bold">{product?.name}</p>
    </Link>
  );
};
