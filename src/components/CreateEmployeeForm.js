import React, { useState } from 'react';
import { TextField, MenuItem, Select, Button, Box, InputLabel, FormControl } from '@mui/material';
import { makeStyles } from '@mui/styles';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { AlertDialog } from 'med-dialog-modal';
import { STATES_US } from '../utils/constants';


const useStyle = makeStyles(() => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  btnPosition: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 17
  }
}));

const CreateEmployeeForm = () => {
  const today = new Date();
  const classes = useStyle();
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [dateBirth, setDateBirth] = useState(new Date('1997-05-28'));
  const [startDate, setStartDate] = useState(new Date());
  const [street, setStreet] = useState('');
  const [stateName, setStateName] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [department, setDepartment] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const onOpenModal = () => setOpenModal(true);
  const onCloseModal = () => setOpenModal(false);

  let infoLocalStorage = JSON.parse(localStorage.getItem('employee')) || [];

  const convertDate = (date) => {
    const month = date.getUTCMonth();
    const day = date.getUTCDate() + 1;
    const year = date.getUTCFullYear();
    return `${ year }-${ month }-${ day }`;
  };

  const infoEmployee = {
    firstname,
    lastname,
    startDate: convertDate(startDate),
    department,
    dateBirth: convertDate(dateBirth),
    street,
    city,
    stateName,
    zipCode
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    infoLocalStorage.push(infoEmployee);

    const infosEmployeeStorage = JSON.stringify(infoLocalStorage);
    localStorage.setItem('employee', infosEmployeeStorage);

    onOpenModal();
  };

  const handleChange = (e, set) => {
    set(e.target.value);
  };

  const handleChangeDepartment = (event) => {
    setDepartment(event.target.value);
  };

  const handleChangeDate = (date, setter) => {
    const month = date.getUTCMonth();
    const day = date.getUTCDate() + 1;
    const year = date.getUTCFullYear();
    const formattedDate = new Date(year, month, day);
    setter(formattedDate);
  };


  return (
      <>
        <form>
          <Box
              sx={ {
                '& .MuiTextField-root': { m: 1, width: 300 }
              } }
              className={ classes.form }
          >
            <TextField
                type="text"
                id="firstname"
                label="FirstName"
                variant="outlined"
                value={ firstname }
                onChange={
                  (e) => handleChange(e, setFirstname) }
            />
            <TextField
                type="text"
                id="lastName"
                label="LastName"
                variant="outlined"
                value={ lastname }
                onChange={
                  (e) => handleChange(e, setLastname) }
            />
            <LocalizationProvider dateAdapter={ AdapterDateFns }>
              <DatePicker
                  label="Date of Birth"
                  value={ dateBirth }
                  onChange={ (date) => handleChangeDate(date, setDateBirth) }
                  renderInput={ (params) => <TextField { ...params } /> }
                  maxDate={today}
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={ AdapterDateFns }>
              <DatePicker
                  label="Start Date"
                  value={ startDate }
                  onChange={ (date) => handleChangeDate(date, setStartDate) }
                  renderInput={ (params) => <TextField { ...params } /> }
              />
            </LocalizationProvider>
            <TextField
                type="text"
                id="street"
                label="Street"
                variant="outlined"
                value={ street }
                onChange={
                  (e) => handleChange(e, setStreet) }
            />
            <TextField
                type="text"
                id="city"
                label="City"
                variant="outlined"
                value={ city }
                onChange={
                  (e) => handleChange(e, setCity) }
            />

            <select aria-required="true" name="state" id="state" onChange={ (e) => setStateName(e.target.value) }
                    required
                    value={ stateName }>
              { STATES_US.map(state => {
                return (<option key={ state.name } value={ state.name }>{ state.name }</option>);
              }) }
            </select>
            
            <TextField
                id="outlined-number"
                label="Zip Code"
                type="number"
                InputLabelProps={ {
                  shrink: true
                } }
                value={ zipCode }
                onChange={
                  (e) => handleChange(e, setZipCode) }
            />
            <FormControl sx={ { m: 1, width: 300 } }>
              <InputLabel id="demo-simple-select-label">Department</InputLabel>
              <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={ department }
                  label="Department"
                  onChange={ handleChangeDepartment }
              >
                <MenuItem value="sales">Sales</MenuItem>
                <MenuItem value="engineering">Engineering</MenuItem>
                <MenuItem value="hr">Human Resources</MenuItem>
                <MenuItem value="legal">Legal</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box
              className={ classes.btnPosition }
          >
            <Button
                type="submit"
                variant="contained"
                disableElevation
                onClick={ (e) => handleSubmit(e) }
            >
              Save
            </Button>
          </Box>
        </form>
        <AlertDialog
            title="Good Job"
            description="Employee successfully created !"
            btnCloseContent="close"
            open={ openModal }
            onCancel={ onCloseModal }
        />
      </>
  );
};

export default CreateEmployeeForm;