import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Container from '@mui/material/Container';
import { makeStyles } from '@mui/styles';
import routes from './routes';


const useStyle = makeStyles((theme) => ({
  container: {
   backgroundColor: '#f4f7ea'
  }
}));

function Router() {
  const classes = useStyle();
  return (
      <>
        <BrowserRouter>
          <Container
              className={ classes.container }
              fixed
          >
            <Routes>
              <Route path={ routes.ROOT }
                     element={ <CreateEmployee
                     /> }
                     strict exact />
              <Route path={ routes.EMPLOYEE }
                     element={ <DataGridEmployee
                     /> }
                     strict exact />
              <Route path={ routes.DEFAULT } element={
                <Navigate to={ routes.ROOT } /> }
                     strict exact />
            </Routes>
          </Container>
        </BrowserRouter>
      </>
  );
}

export default Router;