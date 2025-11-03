import Card from "../components/Card";
const Coupons = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Coupons</h2>
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">All Coupons</h3>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
            + Create Coupon
          </button>
        </div>
        <p className="text-sm text-gray-600">
          Coupon list, expiry, and usage details will be displayed here.
        </p>
      </Card>
    </div>
  );
};
export default Coupons;
