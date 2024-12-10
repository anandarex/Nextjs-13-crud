import AddProduct from "./addProduct";
import DeleteProduct from "./deleteProduct";
import UpdateProduct from "./updateProduct";

export const metadata = {
  title: "Product List",
};

type Product = {
  id: number;
  name: string;
  month_rate: number;
  day_rate: number;
  image: File;
};

async function getProducts() {
  const res = await fetch("https://67037f39bd7c8c1ccd41a62e.mockapi.io/rent-car/api/v1/cars", {
    cache: "no-store",
  });
  return res.json();
}

export default async function ProductList() {
  const products: Product[] = await getProducts();
  return (
    <div className="py-10 px-10">
      <div className="py-2">
        <AddProduct />
      </div>
      <table className="table w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>Product Name</th>
            <th>Month Rate</th>
            <th>Day Rate</th>
            {/* <th>Car Picture</th> */}
            <th> </th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id}>
              <td>{index + 1}</td>
              <td>{product.name}</td>
              <td>{product.month_rate}</td>
              <td>{product.day_rate}</td>
              
              <td className="flex">
                <div className="mr-1">
                  <UpdateProduct {...product} />
                </div>

                <DeleteProduct {...product} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
