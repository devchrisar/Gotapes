import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { AuthContext } from "./utils/contexts";
import { isUserLogedApi } from "./api/auth";
import Routing from "./routes/Routing";
import { HelmetProvider } from "react-helmet-async";

export default function App() {
  const [user, Setuser] = useState(null);
  const [loadUser, setLoadUser] = useState(false);
  const [refreshCheckLogin, setRefreshCheckLogin] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      const loggedUser = await isUserLogedApi();
      Setuser(loggedUser);
      setRefreshCheckLogin(false);
      setLoadUser(true);
    };

    checkAuthentication();
  }, [refreshCheckLogin]);

  if (!loadUser) return null;

  return (
    <HelmetProvider>
      <AuthContext.Provider value={user}>
        <Routing
          user={user}
          refreshCheckLogin={refreshCheckLogin}
          setRefreshCheckLogin={setRefreshCheckLogin}
        />
        <Toaster
          position="top-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable
          pauseOnHover
        />
      </AuthContext.Provider>
    </HelmetProvider>
  );
}
