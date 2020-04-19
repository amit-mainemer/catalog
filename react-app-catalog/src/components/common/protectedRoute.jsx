import React from "react";
import { Route, Redirect } from "react-router-dom";
import adminService from "../../services/admin";

const ProtectedRoute = ({ path, component: Component, render, ...rest }) => {
  const admin = adminService.getCurrentAdmin();
  return (
    <Route
      {...rest}
      render={props => {
        if (!admin)
          return (
            <Redirect
              to={{
                pathname: "/sign-in",
                state: { from: props.location }
              }}
            />
          );
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default ProtectedRoute;