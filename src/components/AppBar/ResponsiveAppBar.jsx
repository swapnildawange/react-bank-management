import LogoutIcon from "@mui/icons-material/Logout";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../redux/user/action";

const ResponsiveAppBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        background: "rgba(106, 84, 149,1)",
        backdropFilter: "blur(20px)",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h4"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              justifyContent: "flex-start",
              fontWeight: "bold",
              display: { xs: "flex" },
            }}
          >
            Bank Management
          </Typography>

          {user?.isAuthenticated && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleLogout} sx={{ p: 0 }}>
                  <LogoutIcon sx={{ color: "white" }} />
                </IconButton>
              </Tooltip>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
