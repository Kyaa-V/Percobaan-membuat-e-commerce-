import Product from "../Product";
import AddCart from "../AddCart";
import { useState } from "react";
const PageProduct = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Product setOpen={() => setIsOpen(true)} />
      <AddCart openModal={isOpen} closeModal={() => setIsOpen(false)} />
    </>
  );
};

export default PageProduct;
