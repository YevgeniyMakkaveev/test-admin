import React, { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import Loading from "components/shared-components/Loading";

const Pages = ({ match }) => (
  <Suspense fallback={<Loading cover="content" />}>
    <Switch>
      <Route
        path={`${match.url}/clients-list`}
        component={lazy(() => import(`./clients-list`))}
      />
    </Switch>
  </Suspense>
);

export default Pages;
