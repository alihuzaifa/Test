import React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

const GlobalModal = ({ open, children, size = "sm", height = "auto" }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    overflow: "scroll",
    display: "block",
    transform: "translate(-50%, -50%)",
    boxShadow: 24,
    borderRadius: 2,
    bgcolor: "background.paper",
    p: 2,
  };

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      style={{ backdropFilter: "blur(5px)" }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box
          sx={style}
          height={height}
          width={size === "sm" ? "400px" : size === "md" ? "600px" : "900px"}
        >
          {children}
        </Box>
      </Fade>
    </Modal>
  );
};

export default GlobalModal;
