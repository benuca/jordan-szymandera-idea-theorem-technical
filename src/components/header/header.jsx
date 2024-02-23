import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { styled } from "@mui/system";
import { Box } from "@mui/material";

import logo from "../../assets/logo.png";

const Logo = styled("img")(({ theme }) => ({
  height: "32px",
  [theme.breakpoints.down("sm")]: {
    height: "16px",
  },
}));

function Header() {
  return (
    <AppBar
      sx={{ backgroundColor: "#252f3d", marginBottom: "45px", boxShadow: 0 }}
      position="static"
    >
      <Toolbar>
        <Box
          sx={{
            paddingLeft: { lg: "166px" },
          }}
        >
          <Logo src={logo} alt="Idea Theorem Logo" />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
