import { HashRouter as RouterContainer } from 'react-router-dom';
import React, { FC } from 'react';
import Router from '@/components/Router';
import GlobalStyles from '@/global/globalStyles';

const Main: FC = () => {
  return (
    <>
      <GlobalStyles />
      {
        <RouterContainer>
          <Router />
        </RouterContainer>
      }
    </>
  );
};

export default Main;
