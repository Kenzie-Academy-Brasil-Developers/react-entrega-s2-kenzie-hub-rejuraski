import { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";

const Routes = () => {
  const [authenticated, setAuthenticated] = useState();

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("KenzieHub:token"));

    if (token) {
      return setAuthenticated(true);
    }
  }, [authenticated]);

  return (
    <div>
      <Switch>
        <Route exact path="/login">
          <Login
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
          />
        </Route>
        <Route exact path="/register">
          <Register authenticated={authenticated} />
        </Route>
        <Route exact path="/dashboard/:id">
          <Dashboard authenticated={authenticated} />
        </Route>
      </Switch>
    </div>
  );
};

export default Routes;
