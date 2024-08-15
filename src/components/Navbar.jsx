const Navbar = () => {
  return (
    <div className="navbar bg-green-800 md:px-20 flex-col md:flex-row justify-between">
      <div className=" flex justify-center md:justify-start">
        <a className="btn btn-ghost text-xl md:text-2xl text-white">
          GadgetGlance
        </a>
      </div>
      <div className=" gap-2">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-80"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
