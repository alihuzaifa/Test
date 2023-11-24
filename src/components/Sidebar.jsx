import { useState } from "react";
import {
  Drawer,
  Box,
  IconButton,
  ListItem,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { ChevronLeft, ChevronRightOutlined } from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";
import FlexBetween from "@/components/FlexBetween";
import Logo from "@/assets/images/images.png";
const Sidebar = ({
  isNonMobile,
  drawerWidth,
  isSideBarOpen,
  setIsSideBarOpen,
}) => {
  const [active, setActive] = useState("customer");
  const navItem = [
    {
      text: "Customer",
      icon: <PersonIcon />,
    },
  ];
  return (
    <Box component="nav">
      {isSideBarOpen && (
        <Drawer
          open={isSideBarOpen}
          onClose={() => {
            setIsSideBarOpen(false);
          }}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              backgroundColor: "#015249",
              boxSizing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
            },
          }}
        >
          <Box width={"100%"}>
            <Box m={"1.5rem 2rem 2rem 3rem"}>
              <FlexBetween>
                <Box
                  display={"flex"}
                  alignItems="center"
                  justifyContent={"center"}
                  gap={"0.5rem"}
                >
                  <Box component={"img"} src={Logo} alt="logo" width={160} />
                </Box>
                {!isNonMobile && (
                  <IconButton
                    onClick={() => {
                      setIsSideBarOpen(!isSideBarOpen);
                    }}
                  >
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <List>
              {navItem?.map(({ text, icon }) => {
                if (!icon) {
                  return (
                    <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                      {text}
                    </Typography>
                  );
                }
                const lcText = text.toLowerCase();
                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        setActive(lcText);
                      }}
                      sx={{
                        backgroundColor:
                          active == lcText ? "#043933" : "transparent",
                        color: active == lcText ? "#fff" : "#fff",
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          color: active == lcText ? "#fff" : "#fff",
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {active === lcText && <ChevronRightOutlined />}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};
export default Sidebar;