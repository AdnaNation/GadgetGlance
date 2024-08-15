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
      <h1>This is Home</h1>
      Length: {phones.length}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {phones.map((phone) => (
          <div key={phone.phone_name} className="card glass">
            <figure>
              <img src={phone.image} alt="car!" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{phone.phone_name}</h2>
              <p>{phone.brand}</p>
              <p>${phone.price}</p>
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
