import React from 'react';
import { Box, Link } from '@mui/material';
import paths from '../Router/routes';
import CreateEmployeeForm from '../../components/CreateEmployeeForm';


function CreateEmployee() {
  return (
      <Box
          sx={ {
            mt: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          } }
      >
        <Link href={ paths.EMPLOYEE } underline="always">
          Current employees
        </Link>
        <CreateEmployeeForm />
      </Box>
  );
}

export default CreateEmployee;