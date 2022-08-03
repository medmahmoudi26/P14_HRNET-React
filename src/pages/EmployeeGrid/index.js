import React, { useState, useEffect } from 'react';
import { Container, Link, Box } from '@mui/material';
import paths from '../Router/routes';
import { LABEL_DATA_GRID } from '../../utils/constants';
import DataTables from 'datatables-plugin-react';
import Table from "react-responsive-data-table";

const DataGrid = ({ data }) => {
  return data.length > 0 && <Table style={{
    opacity: 0.8,
    backgroundColor: "#00113a",
    color: "#ffffff",
    textAlign: "center"
  }}
  tableStyle="table table-hover table-striped table-bordered table-borderless table-responsive"
  pages={true}
  pagination={true}
  onRowClick={() => {}} // if You Want Table Row Data OnClick then assign this {row => console.log(row)}
  page={true}
  errormsg="Error. . ."
  loadingmsg="Loading. . ."
  isLoading={false} 
  sort={true} 
  title="Customers"
  search={true}
  size={10}
  data={{
    head: {
      firstname: "Firstname",
      lastname: "Lastname",
      startDate: "Last Date",
      department: "Department",
      dateBirth: "Date of birth",
      street: "Street",
      city: "City",
      stateName: "State Name",
      zipCode: "Zip code"
    },
    data: data 
  }} />;
};


const DataGridEmployee = () => {
  const [employeeList, setEmployeeList] = useState([]);

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem('employee'));
    setEmployeeList(data);
  }, []);

  return (
    <Container fixed>
      <Box
          sx={ {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            pt: 9
          } }
      >
        <Link href={ paths.ROOT } underline="always">
          Home
        </Link>
        <Box
            sx={ { m: 10 } }
        >
          {
            !employeeList
                ? <>
                  <p>There are no employees at the moment, Create it !</p>
                  <Link href={ paths.ROOT } underline="always">
                    Create Employee
                  </Link>
                </>
                : <DataGrid
                    data={ employeeList } />
          }
        </Box>
      </Box>
      </Container>
  );
};

export default DataGridEmployee;