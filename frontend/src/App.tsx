import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Layout from "./layouts/Layout";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import AddHotel from "./pages/AddHotel";

import { useAppContext } from "./contexts/AppContext";
import Hotels from "./pages/Hotels";
import EditHotel from "./pages/EditHotel";
import Search from "./pages/Search";

const App = () => {
  const { isLoggedIn } = useAppContext();

  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element={
            <Layout>
              <p>Home page</p>
            </Layout>
          }
        />
        <Route
          path='/search'
          element={
            <Layout>
              <Search />
            </Layout>
          }
        />
        <Route
          path='/register'
          element={
            <Layout>
              <Register />
            </Layout>
          }
        />
        <Route
          path='/sign-in'
          element={
            <Layout>
              <SignIn />
            </Layout>
          }
        />

        {isLoggedIn && (
          <>
            <Route
              path='/hotel/me'
              element={
                <Layout>
                  <Hotels />
                </Layout>
              }
            />
            <Route
              path='/hotel/me/:hotelId'
              element={
                <Layout>
                  <EditHotel />
                </Layout>
              }
            />
            <Route
              path='/hotel/add'
              element={
                <Layout>
                  <AddHotel />
                </Layout>
              }
            />
            <Route
              path='/hotel/edit/:hotelId'
              element={
                <Layout>
                  <EditHotel />
                </Layout>
              }
            />
          </>
        )}

        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </Router>
  );
};

export default App;
