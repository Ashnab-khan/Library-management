import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

function LogoutButton() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            // Call backend API
            const response = await axios.post("https://library-management-s4mr.onrender.com/signoutlibrary");

            if (response.data.success) {
                alert("👋 Logged out successfully!");
                // Redirect to login page
                navigate("/LibSignIn");
            } else {
                alert("⚠️ Logout failed!");
            }
        } catch (error) {
            console.error("Logout Error:", error);
            alert("⚠️ Something went wrong during logout!");
        }
    };

    return (

        <DashboardLayout>
            <MDBox pt={6} pb={3}>
                <Grid container spacing={6}>
                    <Grid className="login-Section" item xs={12}>
                        <button
                            onClick={handleLogout}
                            style={{
                                backgroundColor: "#d9534f",
                                color: "#fff",
                                border: "none",
                                padding: "10px 20px",
                                borderRadius: "6px",
                                cursor: "pointer",
                            }}
                        >
                            Logout
                        </button>
                    </Grid>
                </Grid>
            </MDBox>
        </DashboardLayout>

    );
}

export default LogoutButton;
