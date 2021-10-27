import React from "react";
import { Route, Redirect } from "react-router-dom";
import userService from "../../services/userService";

const ProtectedRouteUser = ({ path, component: Component, render, ...rest }) => {
  const currentUser = userService.getCurrentUser();
  return (
    <Route
      {...rest}
      render={props => {
        if (! currentUser)
          return (
            <Redirect
              to={{
                pathname: "/signup",
                state: { from: props.location }
              }}
            />
          );
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default ProtectedRouteUser;