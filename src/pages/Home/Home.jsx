import { Pagination } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";

const Home = () => {
  const totalPhonesCount = useLoaderData();
  const [itemPerPage, setItemPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const { data: phones = [] } = useQuery({
    queryKey: ["phones", itemPerPage, currentPage],
    queryFn: async () => {
      const { data } = await axios.get(
        `http://localhost:5000/phones?page=${currentPage}&limit=${itemPerPage}`
      );
      return data;
    },
  });
  return (
    <div>
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
      {/* <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      /> */}
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
