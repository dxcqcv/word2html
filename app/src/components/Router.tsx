import React from 'react';
import Loadable from 'react-loadable';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import routeCodes from '@/config/routeCodes';
import MyLoadingComponent from './MyLoadingComponent';

const AsyncHome = Loadable({
  loader: () => import('@/components/Home'),
  loading: MyLoadingComponent,
});

const App: React.FC = () => {
  const { HOME } = routeCodes;

  return (
    <div>
      <Switch>
        <Route path={HOME} exact={true} component={AsyncHome} />
        <Redirect to={HOME} />
      </Switch>
    </div>
  );
};
export default withRouter(App);
