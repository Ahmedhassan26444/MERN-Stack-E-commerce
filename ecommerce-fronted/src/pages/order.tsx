import { useState, type ReactElement } from "react";
import TableHOC from "../components/admin/TableHOC";
import type { Column } from "react-table";
import { Link } from "react-router-dom";
type DataType = {
  _id: string;
  amount: number;
  quantity: number;
  discount: number;
  status: ReactElement;
  action: ReactElement;
};

const column: Column<DataType>[] = [
  {
    Header: "ID",
    accessor: "_id",
  },
  {
    Header: "Quantity",
    accessor: "quantity",
  },
  {
    Header: "Discount",
    accessor: "discount",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];


const Order= () => {

    const [rows] = useState<DataType[]>([
  {
    _id: "asdasdasdasd",
    amount: 45454,
    quantity: 23,
    discount: 5666,
    status: <span className="red">Processing</span>,
    action: <Link to={`/oder/$asdasdasdasd`}>Veiw</Link>,
  },
]);
  const Table = TableHOC<DataType>(
    column,
    rows,
    "dashboard-product-box",
    "Orders",
    rows.length>6
  )();

  return (
    <div className="container">
      <h1>My Orders</h1>
      {Table}
    </div>
  );
};

export default Order;