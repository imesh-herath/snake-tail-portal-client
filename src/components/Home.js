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
  
  return (
    <>
      <Appbar />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell align="left">Name</StyledTableCell>
              <StyledTableCell align="left">Sickness</StyledTableCell>
              <StyledTableCell align="left">Experiencing</StyledTableCell>
              <StyledTableCell align="left">Breathing</StyledTableCell>
              <StyledTableCell align="left">Bleeding</StyledTableCell>
              <StyledTableCell align="left">Changes</StyledTableCell>
              <StyledTableCell align="left">Bitten Time</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patients
              .sort((a, b) => b.bitten_time.seconds - a.bitten_time.seconds) // Sort by bitten time in descending order
              .map((row, index) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell component="th" scope="row">
                    {index + 1}
                  </StyledTableCell>
                  <StyledTableCell align="left">{row.name}</StyledTableCell>
                  <StyledTableCell align="left">{row.sickness}</StyledTableCell>
                  <StyledTableCell align="left">{row.experiencing}</StyledTableCell>
                  <StyledTableCell align="left">{row.breathing}</StyledTableCell>
                  <StyledTableCell align="left">{row.bleeding}</StyledTableCell>
                  <StyledTableCell align="left">{row.changes}</StyledTableCell>
                  <StyledTableCell align="left">
                    {moment(row.bitten_time.seconds * 1000).format("DD MMM YYYY hh:mm a")}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
