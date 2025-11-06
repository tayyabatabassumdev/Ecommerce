import Button  from "@/components/ui/Button";
import heroo from "@/assets/heroo.jpg";
import { useNavigate } from "react-router-dom";

export default function InspirationSection() {
  const navigate = useNavigate();

  return (
    <section className="py-20 text-center px-6 md:px-10">
      <h3 className="text-3xl font-bold mb-4">
        50+ Beautiful Rooms Inspiration
      </h3>
      <p className="text-gray-500 mb-8">
        Our designer ideas will inspire your next home makeover.
      </p>

      <Button
        onClick={() => navigate("/shop")}
        className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-full"
      >
        Explore More
      </Button>

      <div className="flex flex-wrap justify-center gap-6 mt-10">
        {[1, 2, 3].map((num) => (
          <img
            key={num}
            src={heroo}
            alt="inspiration"
            className="w-[300px] rounded-xl shadow-lg hover:scale-105 duration-500"
          />
        ))}
      </div>
    </section>
  );
}
