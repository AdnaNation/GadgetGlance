import { Pagination } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";

const Home = () => {
  const totalPhonesCount = useLoaderData();
  const [itemPerPage, setItemPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const { data: phones = [], refetch } = useQuery({
    queryKey: [
      "phones",
      itemPerPage,
      currentPage,
      search,
      category,
      brand,
      price,
    ],
    queryFn: async () => {
      const { data } = await axios.get(
        `http://localhost:5000/phones?page=${currentPage}&limit=${itemPerPage}&search=${search}&category=${category}&brand=${brand}&price=${price}`
      );
      return data;
    },
  });

  const handleSearch = (e) => {
    refetch();
    setSearch(e.target.value);
  };
  const handleCategory = (e) => {
    refetch();
    setCategory(e.target.value);
  };
  const handleBrand = (e) => {
    refetch();
    setBrand(e.target.value);
  };
  const handlePrice = (e) => {
    refetch();
    setPrice(e.target.value);
  };
  return (
    <div>
      <div>
        <div className="form-control">
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="Search"
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-control">
          <select
            className="select select-bordered w-full"
            value={category}
            onChange={handleCategory}
          >
            <option value={""}>Category</option>
            <option value="phone">Phone</option>
            <option value="tab">Tab</option>
            <option value="watch">Watch</option>
          </select>
        </div>

        <div className="form-control">
          <select
            className="select select-bordered w-full"
            value={brand}
            onChange={handleBrand}
          >
            <option value={""}>Brand</option>
            <option value="Apple">Apple</option>
            <option value="Samsung">Samsung</option>
            <option value="Oppo">Oppo</option>
            <option value="Huawei">Huawei</option>
          </select>
        </div>
        <div className="form-control">
          <select
            className="select select-bordered w-full"
            value={price}
            onChange={handlePrice}
          >
            <option value={""}>Price Range</option>
            <option value={"A"}>$0 - $100</option>
            <option value={"B"}>$100 - $500</option>
            <option value={"C"}>$500 - $1000</option>
            <option value={"D"}>$1000 - $2000</option>
          </select>
        </div>
      </div>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {phones.map((phone) => (
          <div key={phone.phone_name} className="card glass lg:mx-20">
            <figure>
              <img src={phone.image} alt={phone.phone_name} />
            </figure>
            <div className="card-body">
              <h2 className="card-title mx-auto">{phone.phone_name}</h2>
              <div className="flex text-xs md:text-xl">
                <p>Brand: {phone.brand}</p>
                <p>Price: ${phone.price}</p>
                <p>Rating: 4.99</p>
              </div>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Learn now!</button>
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className={`flex justify-center items-center mt-16`}>
        <Pagination
          color={"primary"}
          isCompact
          showControls
          total={Math.ceil(totalPhonesCount / itemPerPage)}
          initialPage={1}
          page={currentPage}
          onChange={(page) => setCurrentPage(page)}
        />
      </section>
    </div>
  );
};

export default Home;
