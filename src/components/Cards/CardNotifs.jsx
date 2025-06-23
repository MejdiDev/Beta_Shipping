import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { MarkNotifAsRead } from "services/ApiAll";
import { capitalizeWords } from "services/ApiQuote";

function timeAgo(date) {
    const now = new Date();
    const pastDate = new Date(date);  // Ensure the input date is parsed correctly
    const diffInMilliseconds = now - pastDate;  // Difference in milliseconds

    const seconds = 1000;
    const minutes = seconds * 60;
    const hours = minutes * 60;
    const days = hours * 24;
    const weeks = days * 7;
    const months = days * 30; // Approximation
    const years = days * 365;

    let timeAgoString = '';

    if (diffInMilliseconds < minutes) {
        const diffInSec = Math.floor(diffInMilliseconds / seconds);
        timeAgoString = `${diffInSec} second${diffInSec > 1 ? 's' : ''} ago`;
    } else if (diffInMilliseconds < hours) {
        const diffInMin = Math.floor(diffInMilliseconds / minutes);
        timeAgoString = `${diffInMin} minute${diffInMin > 1 ? 's' : ''} ago`;
    } else if (diffInMilliseconds < days) {
        const diffInHours = Math.floor(diffInMilliseconds / hours);
        timeAgoString = `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    } else if (diffInMilliseconds < weeks) {
        const diffInDays = Math.floor(diffInMilliseconds / days);
        timeAgoString = `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    } else if (diffInMilliseconds < months) {
        const diffInWeeks = Math.floor(diffInMilliseconds / weeks);
        timeAgoString = `${diffInWeeks} week${diffInWeeks > 1 ? 's' : ''} ago`;
    } else if (diffInMilliseconds < years) {
        const diffInMonths = Math.floor(diffInMilliseconds / months);
        timeAgoString = `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
    } else {
        const diffInYears = Math.floor(diffInMilliseconds / years);
        timeAgoString = `${diffInYears} year${diffInYears > 1 ? 's' : ''} ago`;
    }

    return timeAgoString;
}

const CardNotifs = ({ notification, isFinal }) => {
  const { content, referenceModel, createdAt, read, contentId, userId, _id } = notification;
  const history = useHistory();

  const getNotifIcon = type => {
      switch(type.toLowerCase()) {
          case "offer": 
              return { bg: "#fec07e", icon: "fa fa-usd" }

          case "shipment": 
              return { bg: "#f47c6e", icon: "fa fa-ship" }

          case "quote": 
              return { bg: "#4ea855", icon: "fa fa-pencil-square" }

          case "document": 
              return { bg: "#f8cc46", icon: "fa fa-file-text" }

          case "task": 
              return { bg: "#79c4ef", icon: "fa fa-tasks" }
      }
  }

  return (
    <>
      <div
        className={`flex p-4 rounded-lg bg-white border shadow ${isFinal ? "mb-0" : "mb-4"}`}
      >
        <div className="flex-1 flex gap-3">
          <div style={{ backgroundColor: getNotifIcon(referenceModel).bg, width: "50px", height: "50px" }} className="rounded-full p-3 flex items-center justify-center text-white">
            <i className={`${ getNotifIcon(referenceModel).icon } text-xl`}></i>
          </div>

          <div className="flex flex-col">
            <h4 className="text-md text-gray-600">{ content }</h4>
            <p style={{ color: "#a0a9b0" }} className="text-sm">{ timeAgo(createdAt)  }</p>
          </div>
        </div>
        
        <div className="flex items-center justify-center ml-4">
          <button onClick={() => {
              MarkNotifAsRead(_id)
                .then((response) => {
                  console.log(response);
                  
                  history.push(`/${userId.role}/${referenceModel.toLowerCase()}/${contentId._id}`);
                })
                .catch((error) => {
                    console.error("Error fetching quotes:", error);
                });
            }}

            style={{ backgroundColor: (read ? '#FFFFFF' : '#e8f4ff'), color: (read ? '#a0a9b0' : '#3595e3'), borderColor: (read ? '#a0a9b0' : '#3595e3') }}
            className="font-semibold py-2 px-3 border-2 rounded cursor-pointer"
          >
            View { capitalizeWords(referenceModel) }
          </button>
        </div>
      </div>
    </>
  );
};

export default CardNotifs;