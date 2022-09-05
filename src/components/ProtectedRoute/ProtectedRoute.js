import React from "react";
import { Redirect, Route } from "react-router-dom";

export default function ProtectedRoute({
  loggedIn,
  component: Component,
  ...props
}) {
  return (
    <Route>
      {loggedIn ? <Component {...props} /> : <Redirect to="/" />}
    </Route>
  );
}
