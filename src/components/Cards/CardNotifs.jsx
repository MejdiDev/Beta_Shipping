import { Link } from "react-router-dom/cjs/react-router-dom";

const CardNotifs = ({ notification, userName }) => {
  const { content, type, createdAt, read } = notification;

  return (
    <div
      className={`flex p-4 rounded-lg shadow-md mb-4 ${
        read ? 'bg-gray-100' : 'bg-blue-100'
      }`}
    >
      <div className="flex-1">
        <h4 className="font-semibold text-lg">{userName}</h4>
        <p className="text-sm text-gray-600">{content}</p>
        <div className="text-xs text-gray-500">{new Date(createdAt).toLocaleString()}</div>
      </div>
      <div className="flex items-center justify-center ml-4">
        <span
          className={`${
            type === 'shipment'
              ? 'text-green-500'
              : type === 'offer'
              ? 'text-orange-500'
              : 'text-blue-500'
          }`}
        >
          <i className={`fas fa-${type === 'shipment' ? 'box' : type === 'offer' ? 'tag' : 'clipboard'}`}></i>
        </span>
      </div>

      <Link
        to='/client/offer/id'
      >
          View Details
      </Link>
    </div>
  );
};

export default CardNotifs;