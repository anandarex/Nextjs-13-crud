"use client";

import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function AddProduct() {
  const [id, setID] = useState("");
  const [name, setname] = useState("");
  const [month_rate, setmonth_rate] = useState("");
  const [day_rate, setday_rate] = useState("");
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);

  const router = useRouter();

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();

    setIsMutating(true);

    await fetch("https://67037f39bd7c8c1ccd41a62e.mockapi.io/rent-car/api/v1/cars", {
      method: "POST",
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

    setname("");
    setID("");
    setmonth_rate("");
    setday_rate("");

    router.refresh();
    setModal(false);
  }

  function handleChange() {
    setModal(!modal);
  }

  return (
    <div>
      <button className="btn" onClick={handleChange}>
        Add New Car
      </button>

      <input
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
      />

      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add New Car</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label font-bold">Car Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setname(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Car Name"
              />
            </div>
            <div className="form-control">
              <label className="label font-bold">Month Rate</label>
              <input
                type="text"
                value={month_rate}
                onChange={(e) => setmonth_rate(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Month Rate"
              />
            </div>
            <div className="form-control">
              <label className="label font-bold">Day Rate</label>
              <input
                type="text"
                value={day_rate}
                onChange={(e) => setday_rate(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Day Rate"
              />
            </div>
            <div className="form-control">
              <label className="label font-bold">Upload Image</label>
              <input 
                type="file"
                id="input"
                accept="image/*"
                placeholder="Image"
              />
            </div>
            <div className="modal-action">
              <button type="button" className="btn" onClick={handleChange}>
                Close
              </button>
              {!isMutating ? (
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              ) : (
                <button type="button" className="btn loading">
                  Saving...
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
