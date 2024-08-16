import { useEffect, useState } from "react";

const Home = () => {
  const [phones, setPhones] = useState([]);
  useEffect(() => {
    fetch("/phones.json")
      .then((res) => res.json())
      .then((data) => setPhones(data));
  }, []);
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
    </div>
  );
};

export default Home;
