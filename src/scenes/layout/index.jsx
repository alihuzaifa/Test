import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

const Layout = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);

  return (
    <Box
      display={isNonMobile ? "flex" : "block"}
      width={"100%"}
      height={"100%"}
      overflow={"hidden"}
    >
      <Sidebar
        data={{}}
        isNonMobile={isNonMobile}
        drawerWidth={"250px"}
        isSideBarOpen={isSideBarOpen}
        setIsSideBarOpen={setIsSideBarOpen}
      />
      {/* <Box
        sx={{
          flexGrow: 1,
        }}
      >
        <Navbar
          isSideBarOpen={isSideBarOpen}
          setIsSideBarOpen={setIsSideBarOpen}
        />
        <Outlet />
      </Box> */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          height: "100%", // Ensure this Box fills the height of the parent
        }}
      >
        <Navbar
          isSideBarOpen={isSideBarOpen}
          setIsSideBarOpen={setIsSideBarOpen}
        />
        <Box
          sx={{
            flexGrow: 1,
            overflow: "hidden", // Add overflow to handle content overflow
          }}
        >
          {/* Ensure the Outlet or main content renders here */}
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
