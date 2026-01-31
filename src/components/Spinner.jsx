// Option 1: Ring Loader
import { RingLoader } from "react-spinners";

const Spinner = () => {
  return (
    <>
      <section
        className="flex flex-col gap-2 bg-gray-900 w-full"
        style={{
          // minHeight: "560px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <RingLoader color="#3b82f6" size={65} />
        <p className="text-white/80 text-sm mt-2">Loading...</p>
      </section>
    </>
  );
};

export default Spinner;
