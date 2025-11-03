import Card from "../components/Card";
const Orders = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Orders Management</h2>
      <Card>
        <p className="text-sm text-gray-600">
          List of orders, their status, and actions (update status/view details)
          will appear here.
        </p>
      </Card>
    </div>
  );
};
export default Orders;
