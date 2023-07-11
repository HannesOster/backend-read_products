import useSWR from "swr";
import { useRouter } from "next/router";
import { ProductCard } from "./Product.styled";
import { StyledLink } from "../Link/Link.styled";

export default function Product() {
  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading } = useSWR(`/api/products/${id}`);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!data) {
    return;
  }
  console.log(data);

  return (
    <ProductCard>
      <h2>{data.name}</h2>
      <p>Description: {data.description}</p>
      <p>
        Price: {data.price} {data.currency}
      </p>
      <ul>
        {data.reviews.map((review) => {
          return (
            <li key={review._id}>
              <h3>{review.title}</h3>
              <p>{review.text}</p>
            </li>
          );
        })}
      </ul>

      <StyledLink href="/">Back to all</StyledLink>
    </ProductCard>
  );
}
