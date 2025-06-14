import React from "react";
import { Box, Button } from "@mui/material";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const EmailPagination = ({ emailsPerPage, totalEmails, currentPage, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalEmails / emailsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <Box mt={2} display="flex" justifyContent="center" alignItems="center">
      <Button
        variant="outlined"
        disabled={currentPage === 1}
        onClick={() => paginate(currentPage - 1)}
        sx={{ marginRight: 2 }}
      >
        <KeyboardArrowLeftIcon />
      </Button>
      {/* {pageNumbers.map((number) => (
        <Button
          key={number}
          variant={number === currentPage ? "contained" : "outlined"}
          onClick={() => paginate(number)}
          sx={{ margin: "0 2px" }}
        >
          {number}
        </Button>
      ))} */}
      <Button
        variant="outlined"
        disabled={currentPage === Math.ceil(totalEmails / emailsPerPage)}
        onClick={() => paginate(currentPage + 1)}
        sx={{ marginLeft: 2 }}
      >
        <KeyboardArrowRightIcon />
      </Button>
    </Box>
  );
};

export default EmailPagination;
