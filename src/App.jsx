import { useEffect, useState } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./reduxStore/authSlice";
import { Footer, Header } from "./components";
// import Header from "./components";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  // const [userName, setUserName] = useState("");
  const userAuth = useSelector(state => state.auth);

  useEffect(() => {
    authService
      .getCurrentUser()
      .then(userData => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <div className="`h-screen w-screen   bg-gray-300 dark:bg-gray-900` ">
      <div className="w-full h-full ">
        <Header />
        <div className="text-3xl   font-bold dark:text-white py-3 flex justify-center">
          <h5 className="text-blue-900  ">"Feed Your Mind:</h5>
          <h5 className="text-red-700"> Start Your Journey with Our Blog"</h5>
        </div>
        <main>
          <h2 className="text-2xl font-bold text-center">
            {userAuth.status === true
              ? "Welcome, " + userAuth.userData.name
              : ""}
          </h2>

          <Outlet />
        </main>
        <main className="align-bottom">
          <Footer />
        </main>
      </div>
    </div>
  ) : (
    <div className="w-screen h-screen bg-white text-fuchsia-950">
      Loading.......
    </div>
  );

  // return (
  //   <>
  //     <div>
  //       <h2>A Blog App with Appwrite</h2>
  //     </div>
  //   </>
  // );
}

export default App;
