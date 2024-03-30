import { useState } from "react";
import {
    Button,
    TextField,
    Typography,
    Box,
    Stack,
    Dialog,
    DialogContent,
    DialogActions,
} from "@mui/material/";
import React from "react";
import axios from "axios";
import { hostname } from "../hostname";
import { useAlert } from "../components/global/context-alert-dialog";

function Login() {
    const [userData, setUserData] = useState({
        email: "",
        password: "",
        showPassword: false,
    });
    const { openAlert, setOpenAlert } = useAlert();

    const handleChange = (prop) => (event) => {
        setUserData({ ...userData, [prop]: event.target.value });
    };


    const onClickLogin = async (e) => {
        e.preventDefault();
        try {
            // const response = await fetch(`${hostname}/api/auth/token`, {
            //     method: 'POST',
            //     headers: {
            //       'Content-Type': 'application/x-www-form-urlencoded',
            //     },
            //     body: new URLSearchParams({
            //       username: userData.email,
            //       password: userData.password,
            //     }),
            //   });
            //   const data = await response.json();
            const { data } = await axios.post(
                `${hostname}/api/auth/token`,
                new URLSearchParams({
                    username: userData.email,
                    password: userData.password,
                }),
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                }
            );
            if (data.status === "success") {
                //   localStorage.setItem("Authenticated", "Authenticated");
                localStorage.setItem("TOKEN", data.access_token);
                localStorage.setItem("role", data.role);
                localStorage.setItem("permission", data.permission);
                localStorage.setItem("component", data.component);
                // Cookies.set('role', data.role, { expires: new Date().setDate(new Date().getDate() + 8 * 60 * 60 * 1000) });
                // Cookies.set('permission', data.permission, { expires: new Date().setDate(new Date().getDate() + 8 * 60 * 60 * 1000) });
                // Cookies.set('component', data.component, { expires: new Date().setDate(new Date().getDate() + 8 * 60 * 60 * 1000) });
                window.location.href = "/";
            } else {
                setOpenAlert({
                    status: true,
                    type: "error",
                    message: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง",
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const styles = {
        paperContainer: {
            backgroundImage: `url(${"/images/login-img.avif"})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
        },
    };

    return (
        <>
            <Box style={styles.paperContainer}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        minHeight: "100vh",
                    }}
                >
                    <Box
                        sx={{
                            p: 5,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                            backgroundColor: "white",
                            borderRadius: "9px",
                            border: "2px solid #dcdcdc",
                            boxShadow:
                                "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
                        }}
                    >
                        <Stack
                            direction="column"
                            alignItems="center"
                            justifyContent="flex-start"
                        >
                            <Stack direction={{ xs: "column", md: "row" }} sx={{ mb: -2 }}>
                                <img
                                    src="/images/company/atel-06.png"
                                    alt=""
                                    style={{ height: "15rem" }}
                                />
                            </Stack>
                            <form onSubmit={onClickLogin}>
                                <Stack direction="column" spacing={1}>
                                    <Typography sx={{ mb: -1, mt: 1 }}>
                                        Username
                                    </Typography>
                                    <TextField
                                        size="small"
                                        // required
                                        onChange={handleChange("email")}
                                        sx={{ width: "30ch" }}
                                        placeholder="Enter username"
                                        variant="outlined"
                                    />
                                    <Typography style={{ marginBottom: "-7px" }}>
                                        Password
                                    </Typography>
                                    <TextField
                                        size="small"
                                        // required
                                        onChange={handleChange("password")}
                                        sx={{ width: "30ch" }}
                                        placeholder="Enter password"
                                        variant="outlined"
                                        type="password"
                                    />
                                </Stack>
                                {/* <Box display="flex" flexDirection="row" sx={{ mt: -1 }}>
                  <input type="checkbox" style={{ accentColor: "#177bfe" }} />
                  <p style={{ fontSize: "14px", color: "grey" }}>remember me</p>
                </Box> */}
                                <Button
                                    sx={{ boxShadow: 0, borderRadius: "3px", mt: 2 }}
                                    variant="contained"
                                    color="warning"
                                    fullWidth
                                    type="submit"
                                >
                                    SUBMIT
                                </Button>
                            </form>
                        </Stack>
                    </Box>
                </Box>
            </Box>
        </>
    );
}

export default Login;
