import { useCallback, useEffect, useState } from "react";
// import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import "../styles/Sidebar.css";
// import Cookies from "js-cookie";

const Sidebar = ({ children }) => {
  const location = useLocation();
  const [locat, setLocat] = useState("");
  // const { Pharmacy } = useSelector((state) => state.PharmacySlice);
  const loc = useCallback(() => {
    setLocat(location.pathname);
  }, [location.pathname]);
  useEffect(() => {
    loc();
  }, [loc]);

  const Logout = () => {
    // Cookies.remove("SuperAdminToken");
    // Cookies.remove("SuperAdminName");
    // Cookies.remove("SuperAdminId");
    // browserHistory()
    // navigate("/login", { replace: true });
  };
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const menuItem = [
    // {
    //   id: 1,
    //   path: "/",
    //   name: "Dashboard",
    //   icon: "icon-dashboard",
    // },
    {
      id: 2,
      path: "/profile",
      name: "My Account",
      icon: "icon-opencart",
    },
    {
      id: 3,
      path: "/payment",
      name: "Payment Options",
      icon: "icon-category",
    },
    {
      id: 4,
      path: "/currentOrders",
      name: "My Orders",
      icon: "icon-user-tie",
    },
    {
      id: 5,
      path: "/address",
      name: "Delivery Addresses",
      icon: "icon-tools",
    },
    // {
    //   id: 6,
    //   path: "/favorite",
    //   name: "Favorites",
    //   icon: "icon-contact_mail",
    // },
    // {
    //   id: 7,
    //   path: "/",
    //   name: "Invoices",
    //   icon: "icon-contact_mail",
    // },
    // {
    //   id: 8,
    //   path: "/",
    //   name: "Setting",
    //   icon: "icon-contact_mail",
    // },
    // {
    //   id: 9,
    //   path: "/",
    //   name: "Help",
    //   icon: "icon-contact_mail",
    // },
  ];
  // const {}
  return (
    <div
      // className=" flex"
      style={{
        // display: "none",
        display: locat.includes("/login") ? "none " : "flex",
      }}
    >
      <div
        // style={{ width: isOpen ? "200px" : "50px" }}
        className={`sidebar ${isOpen ? "SideActive" : "SideNormal"}`}
      >
        <div className="top_section">
          {/* {Cookies.get("PharLogo") && (
            <div className=" relative LogoImgContainet ">
              <img
                src={Cookies.get("PharLogo")}
                alt={Cookies.get("PharName")}
                style={{ display: isOpen ? "block" : "none" }}
                className="logo"
              ></img>
            </div>
          )} */}
          <div
            style={{ marginLeft: isOpen ? "50px" : "0px" }}
            className={`bars ${!isOpen ? "BarsActive" : "BarsNone"}`}
          >
            <span className="icon-menu" onClick={toggle}></span>
          </div>
          <div
            style={{ marginLeft: isOpen ? "50px" : "0px" }}
            className="close"
          >
            <span
              className="icon-close"
              onClick={() => setIsOpen(false)}
            ></span>
          </div>
        </div>
        {menuItem.map((item) => (
          <NavLink
            to={item.path}
            key={item.id}
            className={`link ${locat === item.path ? "ActiveLink" : ""}`}

            // activeclassName="active"
          >
            <div className="icon">
              <span className={item.icon}></span>
            </div>
            <div
              style={{ display: isOpen ? "block" : "none" }}
              className="link_text"
            >
              {item.name}
            </div>
          </NavLink>
        ))}
        <NavLink to={"/login"} className="link" onClick={() => Logout()}>
          <div className="icon">
            <span className={"icon-exit"}></span>
          </div>
          <div
            style={{ display: isOpen ? "block" : "none", cursor: "pointer" }}
            className="link_text"
          >
            Logout
          </div>
        </NavLink>
      </div>
      <main>{children}</main>
    </div>
  );
};

export default Sidebar;
