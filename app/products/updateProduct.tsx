"use client";

import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";

type Product = {
  id: string;
  name: string;
  image: File;
  month_rate: number;
  day_rate: number;
};

export default function UpdateProduct(product: Product) {
  const [id, setId] = useState(product.id);
  const [name, setName] = useState(product.name);
  const [month_rate, setmonth_rate] = useState(product.month_rate);
  const [day_rate, setday_rate] = useState(product.day_rate);
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);

  const router = useRouter();

  async function handleUpdate(e: SyntheticEvent) {
    e.preventDefault();

    setIsMutating(true);

    await fetch(`https://67037f39bd7c8c1ccd41a62e.mockapi.io/rent-car/api/v1/cars/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        month_rate : month_rate,
        day_rate : day_rate,
        id : id
        
      }),
    });

    setIsMutating(false);

    router.refresh();
    setModal(false);
  }

  function handleChange() {
    setModal(!modal);
  }

  return (
    <div>
      <button className="btn btn-info btn-sm" onClick={handleChange}>
        Edit
      </button>

      <input
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
      />

      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit {product.name}</h3>
          <form onSubmit={handleUpdate}>
            <div className="form-control">
              <label className="label font-bold">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Product Name"
              />
            </div>
            <div className="form-control">
              <label className="label font-bold">Month Rate</label>
              <input
                type="number"
                value={month_rate}
                onChange={(e) => setmonth_rate(Number(e.target.value))}
                className="input w-full input-bordered"
                placeholder="Month Rate"
              />
            <div className="form-control">
              <label className="label font-bold">Day Rate</label>
              <input
                type="number"
                value={day_rate}
                onChange={(e) => setday_rate(Number(e.target.value))}
                className="input w-full input-bordered"
                placeholder="Day Rate"
              />
            </div>
            </div>
            <div className="modal-action">
              <button type="button" className="btn" onClick={handleChange}>
                Close
              </button>
              {!isMutating ? (
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              ) : (
                <button type="button" className="btn loading">
                  Updating...
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
