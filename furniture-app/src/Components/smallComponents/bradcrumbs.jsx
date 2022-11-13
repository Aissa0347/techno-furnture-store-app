import { Link } from "react-router-dom";
import { Breadcrumbs } from "@mantine/core";

function Bradcrumbs({ locations = [], color }) {
  let items;

  items = locations.map((location) => (
    <Link to={location?.path || ""} key={location.label}>
      {location.label}
    </Link>
  ));
  return (
    <div className="breadcrumbs">
      <Breadcrumbs separator="→">{items}</Breadcrumbs>
    </div>
  );
}

export default Bradcrumbs;
