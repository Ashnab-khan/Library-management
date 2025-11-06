
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";
import "./data/EmployeeTable.css";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
import { useEffect, useState } from "react";
import "../tables/tables.css"


function Addnewbook() {
  const { columns, rows } = authorsTableData();
  const { columns: pColumns, rows: pRows } = projectsTableData();
  const [book, setBook] = useState({
    title: "",
    standard: "",
    desc: "",
    price: null,
    cover: ""
  });

  // ------------------------------------------------------------------
  const [tableBooks, setTableBooks] = useState([]);
  // all books from your API and store them in a local state.
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("https://library-management-s4mr.onrender.com/librarybooks");
        setTableBooks(res.data); // Assuming your API returns an array of books
      } catch (err) {
        console.log("Error fetching books:", err);
      }
    };

    fetchBooks();
  }, []);
  // ----------------------- your API and store books ---------------------


  const navigate = useNavigate()

  const handleChange = (e) => {
    setBook(prev => ({ ...prev, [e.target.name]: e.target.value }))
  };

  console.log(book, "checkingvalue is coming");

  const handleClick = async e => {
    e.preventDefault()
    try {
      // await axios.post("http://localhost:8800/books", book)
      await axios.post("https://library-management-s4mr.onrender.com/librarybooks", book)
      navigate("/dashboard")
    } catch (err) {
      console.log(err);
    }
  }

  // -------------------------------------------------------------------
  // -------------------------------------------------------------------

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            {/* <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Authors Table
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card> */}
            <div className='form tables-form'>
              <h3>Add New-Book</h3>
              <div className="tables-form-input">
                <input className="tables-input-child" type="text" placeholder='title' onChange={handleChange} name='title' />
                <select className="tables-input-child" onChange={handleChange} name='standard'>
                  <option value="">Select Standard</option>
                  <option value="First" id="1">First</option>
                  <option value="Second" id="2">Second</option>
                  <option value="Third" id="3">Third</option>
                  <option value="Fourth" id="4">Fourth</option>
                </select>
                <input className="tables-input-child" type="text" placeholder='desc' onChange={handleChange} name='desc' />
                <input className="tables-input-child" type="number" placeholder='price' onChange={handleChange} name='price' />
                <input className="tables-input-child" type="text" placeholder='cover' onChange={handleChange} name='cover' />
              </div>
              <div className="tables-form-btn">
                <button className='formbutton' onClick={handleClick}>Added</button>
              </div>
            </div>

          </Grid>
          <Grid item xs={12}>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Addnewbook;
