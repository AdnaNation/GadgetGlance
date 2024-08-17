import { Pagination } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const Home = () => {
  const [totalPhonesCount, setTotalPhonesCount] = useState(0);
  const [itemPerPage, setItemPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [sort, setSort] = useState("");
  const { data: phones = [], refetch } = useQuery({
    queryKey: [
      "phones",
      itemPerPage,
      currentPage,
      search,
      category,
      brand,
      price,
      sort,
    ],
    queryFn: async () => {
      const { data } = await axios.get(
        `http://localhost:5000/phones?page=${currentPage}&limit=${itemPerPage}&search=${search}&category=${category}&brand=${brand}&price=${price}&sort=${sort}`
      );
      setTotalPhonesCount(data.totalPhonesCount);
      return data.phones;
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
  const handleSort = (e) => {
    refetch();
    setSort(e.target.value);
  };
  const handleRefresh = () => {
    refetch();
    setSearch("");
    setCategory("");
    setBrand("");
    setPrice("");
    setSort("");
  };
  return (
    <div>
      <div className="flex gap-1 flex-col md:flex-row justify-center my-3">
        <div className="form-control">
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="Search"
            className="input input-bordered w-full"
          />
        </div>
        <div className="flex flex-col md:flex-row gap-1 justify-center">
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

          <div className="form-control">
            <select
              className="select select-bordered w-full"
              value={sort}
              onChange={handleSort}
            >
              <option value={""}>Sort by:</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
              <option>Date Added: Newest First</option>
            </select>
          </div>
        </div>
      </div>
      <div className="text-center">
        <button
          onClick={handleRefresh}
          className=" border rounded px-2 btn-success "
        >
          Refresh
        </button>
      </div>
      <h2 className="text-2xl text-center underline mb-2">Our Gadgets</h2>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:mx-20">
        {phones.map((phone) => (
          <div key={phone.phone_name} className="card pt-4 glass">
            <figure>
              <img src={phone.image} alt={phone.phone_name} />
            </figure>
            <div className="card-body">
              <h2 className="card-title mx-auto">{phone.phone_name}</h2>
              <p>{phone.description.slice(0, 80)}...</p>
              <div className="flex text-xs md:text-[16px]">
                <p>Brand: {phone.brand}</p>
                <p>Price: ${phone.price}</p>
                <p>Rating: 4.99</p>
              </div>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">View Details</button>
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className={`flex justify-center items-center mt-16`}>
        <Pagination
          color={"primary"}
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
