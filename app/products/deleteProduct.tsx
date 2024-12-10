"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// type Product = {
//   id: number;
//   title: string;
//   price: number;
// };

type Product = {
  id: string;
  name: string;
  image: File;
  month_rate: number;
  day_rate: number;
};

export default function DeleteProduct(product: Product) {
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);

  const router = useRouter();

  async function handleDelete(id: string) {
    setIsMutating(true);

    await fetch(`https://67037f39bd7c8c1ccd41a62e.mockapi.io/rent-car/api/v1/cars/${id}`, {
      method: "DELETE",
    });

    // http://localhost:5000/products/${id}

    setIsMutating(false);

    router.refresh();
    setModal(false);
  }

  function handleChange() {
    setModal(!modal);
  }

  return (
    <div>
      <button className="btn btn-error btn-sm" onClick={handleChange}>
        Delete
      </button>

      <input
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
      />

      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Are sure to delete {product.name} ?
          </h3>
          <div className="modal-action">
            <button type="button" className="btn" onClick={handleChange}>
              Close
            </button>
            {!isMutating ? (
              <button
                type="button"
                onClick={() => handleDelete(product.id)}
                className="btn btn-primary"
              >
                Delete
              </button>
            ) : (
              <button type="button" className="btn loading">
                Deleting...
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
