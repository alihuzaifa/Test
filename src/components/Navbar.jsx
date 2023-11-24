import { Menu as MenuIcon } from "@mui/icons-material";
import FlexBetween from "@/components/FlexBetween";
import { AppBar, Toolbar, IconButton, Typography, Box } from "@mui/material";
const Navbar = ({ isSideBarOpen, setIsSideBarOpen }) => {
  return (
    <AppBar
      sx={{
        position: "static",
        background: "#fff",
        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
        }}
      >
        <FlexBetween>
          <Box
            display={"flex"}
            gap={"1rem"}
            alignItems={"center"}
            marginLeft={"3px"}
          >
            <IconButton
              onClick={() => {
                setIsSideBarOpen(!isSideBarOpen);
              }}
            >
              <MenuIcon sx={{ fontSize: "25px", color: "#000" }} />
            </IconButton>
            <Typography variant="h4" color={"#000"} fontWeight="bold">
              Customer
            </Typography>
          </Box>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};
export default Navbar;
