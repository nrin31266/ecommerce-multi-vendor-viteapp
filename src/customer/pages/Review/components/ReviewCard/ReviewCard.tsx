import { Delete } from "@mui/icons-material";
import { Avatar, Box, Grid, Grid2, IconButton, Rating } from "@mui/material";
import { red } from "@mui/material/colors";
import React from "react";

const ReviewCard = () => {
  return (
    <div className="flex justify-between">
      <div>
        <Grid2 container spacing={2}>
          <Grid xs={1}>
            <Box>
              <Avatar
                className="text-white"
                sx={{ width: 56, height: 56, bgcolor: "#9155FD" }}
              >
                Z
              </Avatar>
            </Box>
          </Grid>
          <Grid xs={9}>
            <div className="space-y-2">
              <div>
                <p className="font-semibold text-lg">User name is here</p>
                <p className="opacity-70">Day rate is here 12/12/2012</p>
              </div>
            </div>
            <Rating readOnly value={4} precision={1} />
          </Grid>
        </Grid2>
        <p>
          Value for money product, great product Lorem ipsum dolor sit amet
          consectetur
        </p>
        <div className="mt-3">
          <img
            className="w-24 h-24 object-cover"
            src="https://i.pinimg.com/736x/63/96/62/639662ec644cd0369c5817aa33b1a1f2.jpg"
            alt=""
          />
        </div>
      </div>

      <div>
      <IconButton>
        <Delete sx={{ color: red[700] }} />
      </IconButton>
      </div>
    </div>
  );
};

export default ReviewCard;
