import ShipmentList from "components/ShipmentList";
import { getShipments } from "services/ApiAdmin";

const AdminShipmentList = () => {
    return (
        <>
            <ShipmentList
                role="admin"
                getShipments={ getShipments }
            />
        </>
    );
}

export default AdminShipmentList;