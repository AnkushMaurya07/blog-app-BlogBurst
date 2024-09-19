import React, { useState } from "react";
import { Container, Logo, Logoutbtn } from "../index.js";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const authStatus = useSelector(state => state.auth.status);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to control sidebar visibility

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <header
        className="py-3 shadow-black text-lg font-bold"
        style={{ backgroundColor: "#006d77", color: "#112A46" }}
      >
        <Container>
          <nav className="flex items-center justify-between">
            <div className="mr-4 flex items-center">
              <Link to="/">
                <Logo width="70px" />
              </Link>
              <div className="text-4xl text-white">BlogBurst</div>
            </div>

            {/* Hamburger Button for Small Screens */}
            <button
              className="lg:hidden block text-white focus:outline-none"
              onClick={toggleSidebar}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>

            {/* Nav Items for Large Screens */}
            <ul className="hidden lg:flex ml-auto">
              {navItems.map(item =>
                item.active ? (
                  <li key={item.name}>
                    <button
                      className="inline-block text-black px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                      onClick={() => navigate(item.slug)}
                    >
                      {item.name}
                    </button>
                  </li>
                ) : null
              )}
              {authStatus && (
                <li>
                  <Logoutbtn />
                </li>
              )}
            </ul>
          </nav>
        </Container>
      </header>

      {/* Sidebar for Small Screens */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden"
          onClick={toggleSidebar} // Close sidebar when clicking outside
        >
          <div
            className="fixed top-0 right-0 w-3/4 max-w-xs h-full bg-white shadow-lg p-5"
            onClick={e => e.stopPropagation()} // Prevent closing when clicking inside sidebar
          >
            <button
              className="text-black mb-6"
              onClick={toggleSidebar}
            >
              Close
            </button>
            <ul>
              {navItems.map(item =>
                item.active ? (
                  <li key={item.name} className="mb-4">
                    <button
                      className="w-full text-left text-black px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                      onClick={() => {
                        navigate(item.slug);
                        toggleSidebar(); // Close sidebar after navigation
                      }}
                    >
                      {item.name}
                    </button>
                  </li>
                ) : null
              )}
              {authStatus && (
                <li>
                  <Logoutbtn />
                </li>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
