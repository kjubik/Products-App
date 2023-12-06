import { postProduct } from "src/services/productsServices";
import { exampleData } from "src/services/exampleData";


const HomePage = () => {

  const addData = async () => {
    exampleData.forEach(async (product) => {
      await postProduct(product);
    });
  }

  return (
    <>
      <button onClick={addData}>Add data</button>
    </>
  );
};

export default HomePage;
