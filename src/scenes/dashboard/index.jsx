import FlexBetween from "@/components/FlexBetween";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import { Box, Button, Input, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, filterUser, replaceUserAtIndex } from "../../state";
import GlobalModal from "./GlobalModal";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
const Dashboard = () => {
  const allUser = useSelector((state) => state?.user);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const init = async () => {
    const getData = await axios.get("https://reqres.in/api/users?page=1");
    if (getData?.status === 200) {
      const userList = getData?.data?.data?.map(
        ({ first_name, last_name, email, avatar, id }) => {
          return {
            name: `${first_name} - ${last_name}`,
            email,
            avatar,
            id,
            first_name,
            last_name,
          };
        }
      );
      //  it will only add those who is not in the redux
      userList?.forEach((obj) => {
        if (!allUser.some((item) => item.id === obj.id)) {
          dispatch(addUser(obj));
        }
      });
    } else {
      toast.error(`Error in fetching data`, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  useEffect(() => {
    init();
  }, []);
  const handleEdit = (row) => {
    formik.setFieldValue("email", row.email);
    formik.setFieldValue("avatar", row.avatar);
    formik.setFieldValue("first_name", row.first_name);
    formik.setFieldValue("last_name", row.last_name);
    formik.setFieldValue("id", row.id);
    formik.setFieldValue("isEdit", true);
    setOpen(true);
  };
  const columns = [
    {
      field: "avatar",
      headerName: "Customer Image",
      flex: 1,

      renderCell: ({ row }) => {
        return (
          <img
            src={row?.avatar}
            alt={row?.id}
            style={{
              width: 50,
              height: 50,
              borderRadius: "50%",
            }}
          />
        );
      },
    },
    {
      field: "id",
      headerName: "Customer ID",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Customer Name",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Customer Email",
      flex: 1,
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <div>
            <Button
              sx={{
                backgroundColor: "#fff",
                color: "#000",
                fontSize: "10px",
                fontWeight: "bold",
                padding: "5px",
                marginRight: "5px",
                "&:hover": {
                  backgroundColor: "#fff",
                  color: "#000",
                  opacity: 1,
                },
              }}
              onClick={() => {
                handleEdit(row);
              }}
            >
              Edit
            </Button>
            <Button
              sx={{
                backgroundColor: "red",
                color: "#fff",
                fontSize: "10px",
                fontWeight: "bold",
                padding: "5px",
                "&:hover": {
                  backgroundColor: "red",
                  opacity: 1,
                },
              }}
              onClick={() => {
                toast.success(`Deleted Successfully`, {
                  position: "top-right",
                  autoClose: 1000,
                  hideProgressBar: false,
                  closeOnClick: false,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
                dispatch(filterUser(row?.id));
              }}
            >
              <DeleteIcon sx={{ mr: "10px", fontSize: 15 }} />
              Delete
            </Button>
          </div>
        );
      },
    },
  ];
  const validationSchema = Yup.object().shape({
    avatar: Yup.string().required("Please provide image"),
    first_name: Yup.string().required("Please provide first name"),
    last_name: Yup.string().required("Please provide last name"),
    email: Yup.string()
      .email("Please provide email")
      .required("Please provide email"),
  });
  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      avatar: "",
      isEdit: false,
      id: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const { first_name, last_name, email, avatar, isEdit, id } = values;
      if (isEdit) {
        const obj = {
          name: `${first_name} ${last_name}`,
          email: email,
          avatar: avatar,
          id,
          last_name,
          first_name,
        };
        const index = allUser?.findIndex((item) => item.id === id);
        dispatch(replaceUserAtIndex({ index, obj }));
        formik.resetForm();
        toast.success(`Update Successfully`, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setOpen(false);
      } else {
        const obj = {
          name: `${first_name} ${last_name}`,
          email: email,
          avatar: avatar,
          id: new Date().getTime(),
          last_name,
          first_name,
        };
        dispatch(addUser(obj));
        formik.resetForm();
        toast.success(`Added Successfully`, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setOpen(false);
      }
    },
  });
  const handleFileInputChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64String = e.target.result;
        formik.setFieldValue("avatar", base64String);
      };
      reader.readAsDataURL(selectedFile);
    }
  };
  return (
    <Box m="1.5rem 2.5rem">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        limit={1}
        hideProgressBar={false}
        newestOnTop
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={true}
        theme="light"
      />
      <FlexBetween>
        <Box>
          <Button
            sx={{
              backgroundColor: "#015249",
              color: "#fff",
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              "&:hover": {
                backgroundColor: "#015249",
                opacity: 1,
              },
            }}
            onClick={() => {
              setOpen(true);
            }}
          >
            <AddIcon sx={{ mr: "10px" }} />
            Add Customer
          </Button>
        </Box>
      </FlexBetween>
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: "#fff",
            backgroundColor: "#fff",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#76ada7",
            color: "#015249",
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: "#015249",
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: "#76ada7",
            color: "#015249",
            borderTop: "none",
          },
        }}
      >
        <DataGrid
          // components={{ Toolbar: GridToolbar }}
          rows={allUser}
          columns={columns}
        />
      </Box>
      <GlobalModal open={open} size={"sm"}>
        <Box
          style={{
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
            marginTop: "10px",
            marginBottom: "10px",
            cursor: "pointer",
          }}
        >
          <CloseIcon
            color="red"
            onClick={() => {
              setOpen(false);
            }}
          />
        </Box>
        <Box
          display="grid"
          gap="15px"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
        >
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="First Name"
            name="first_name"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.first_name}
            error={!!formik.touched.first_name && !!formik.errors.first_name}
            helperText={formik.touched.first_name && formik.errors.first_name}
            sx={{ gridColumn: "span 4", marginTop: "5px", marginBottom: "5px" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Last Name"
            name="last_name"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.last_name}
            error={!!formik.touched.last_name && !!formik.errors.last_name}
            helperText={formik.touched.last_name && formik.errors.last_name}
            sx={{ gridColumn: "span 4", marginTop: "5px", marginBottom: "5px" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="email"
            label="Email"
            name="email"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.email}
            error={!!formik.touched.email && !!formik.errors.email}
            helperText={formik.touched.email && formik.errors.email}
            sx={{ gridColumn: "span 4", marginTop: "5px", marginBottom: "5px" }}
          />
        </Box>
        <Box
          sx={{
            justifyContent: "flex-start",
            display: "flex",
            marginTop: "5px",
          }}
        >
          <Input
            type="file"
            id="file-input"
            name="avatar"
            onChange={handleFileInputChange}
            sx={{
              width: "100%",
              flexGrow: 1,
            }}
          />
        </Box>
        {formik.errors.avatar && formik.touched.avatar ? (
          <div
            style={{
              textAlign: "center",
              color: "red",
              fontWeight: "bold",
            }}
          >
            {formik.errors.avatar}{" "}
          </div>
        ) : null}
        <Box
          sx={{ justifyContent: "center", display: "flex", marginTop: "20px" }}
        >
          <Button
            sx={{
              backgroundColor: "#015249",
              color: "#fff",
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              "&:hover": {
                backgroundColor: "#015249",
                opacity: 1,
              },
            }}
            onClick={() => {
              formik.submitForm();
            }}
          >
            {formik?.values?.isEdit ? (
              <>
                <UpgradeIcon sx={{ mr: "10px" }} />
                Update
              </>
            ) : (
              <>
                <AddIcon sx={{ mr: "10px" }} />
                Add
              </>
            )}
          </Button>
        </Box>
      </GlobalModal>
    </Box>
  );
};
export default Dashboard;