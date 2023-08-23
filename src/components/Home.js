import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Appbar from "./Appbar";
import { db } from "../firebase-config"
import { collection, getDocs } from "firebase/firestore"
import moment from "moment/moment";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function CustomizedTables() {
  const [patients, setPatients] = React.useState([]);
  const patientsCollectionRef = collection(db, "patients");
  React.useEffect(() => {
    const getPatients = async () => {
      const data = await getDocs(patientsCollectionRef);
      setPatients(data.docs.map((doc) => ({ ...doc.data(), id: doc.id, data})))
      console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id, data})))
    }
    getPatients()
  }, [])
  
  function createData(id, patient_name, snake_image_url, bitten_time, phone_number) {
    return { id, patient_name, snake_image_url, bitten_time, phone_number };
  }
  
  const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Cupcake", 305, 3.7, 67, 4.3),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
  ];



  return (
    <>
      <Appbar />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell align="left">Patient Name</StyledTableCell>
              <StyledTableCell align="left">Snake Image URL</StyledTableCell>
              <StyledTableCell align="left">Bitten Time</StyledTableCell>
              <StyledTableCell align="left">Phone Number</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patients.map((row,index) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row">
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell align="left">{row.patient_name}</StyledTableCell>
                <StyledTableCell align="left">{row.snake_image_url}</StyledTableCell>
                <StyledTableCell align="left">{moment(row.bitten_time.seconds * 1000).format("DD MMM YYYY hh:mm a")}</StyledTableCell>
                <StyledTableCell align="left">{row.phone_number}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
