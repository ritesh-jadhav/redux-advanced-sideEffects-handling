import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const DUMMY_PRODUCTS = [
  {
    id: "p1",
    price: 6,
    title: "my first book",
    description: "Version 1 come back soon...",
  },
  {
    id: "p2",
    price: 6,
    title: "my secon book",
    description: "Version 2 postered out  Watch ! ",
  },
];

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map((product) => (
          <ProductItem
            title={product.title}
            price={product.price}
            description={product.description}
            key={product.id} 
            id={product.id}
           />
        ))}
      </ul>
    </section>
  );
};

export default Products;
