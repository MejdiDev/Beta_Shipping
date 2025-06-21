import React from "react";
import { createPopper } from "@popperjs/core";
import { useHistory } from "react-router-dom";

const UserDropdown = () => {
  const history = useHistory();
  // dropdown props

  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();

  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };
  const handleLogout = (e) => {
    e.preventDefault();
    history.push("/firstpage"); // Navigate back to the first page
  };

  const handleProfileClick = (e) => {
    history.push("/clients/profileClient"); // Navigate to the clientprofile page
  };

  return (
    <>
      <a
        className="text-blueGray-500 block border-black"
        href="#pablo"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <div className="items-center flex flex-row -mt-5">
          <span className="w-12 h-12 text-base text-black bg-lightBlue-400 inline-flex items-center justify-center rounded-full shadow-lg">
            <i className="fas fa-user-circle text-3xl  "></i>
          </span>
        </div>
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-sm z-50 float-left py-2 list-none text-left rounded-lg border-3 shadow-lg min-w-48"
        }
      >
        <button className="text-sm px-4   whitespace-nowrap bg-transparent text-blueGray-700"
        onClick={() => history.push("/client/profileClient")}>
           Profile
        </button>
        <a
          href="#pablo"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={handleProfileClick}
        >
          Settings
        </a>
        <a
          href="#pablo"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={handleLogout}
        >
          Logout
        </a>
        <div className="h-0 my-2 border border-solid border-blueGray-100" />
      </div>
    </>
  );
};

export default UserDropdown;
