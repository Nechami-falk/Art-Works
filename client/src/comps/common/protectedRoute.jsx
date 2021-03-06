import React from "react";
import { Route, Redirect } from "react-router-dom";
import userService from "../../services/userService";

const ProtectedRoute = ({ path, component: Component, render, ...rest }) => {
  const currentAdmin = userService.getCurrentAdmin();
  return (
    <Route
      {...rest}
      render={props => {
        if (! currentAdmin)
          return (
            <Redirect
              to={{
                pathname: "/",
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