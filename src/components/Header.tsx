import {
  AppBar,
  Box,
  Toolbar,
  css,
  styled,
  Button,
  IconButton,
  Stack,
  Typography,
  MenuItem,
  Menu,
  Container,
} from "@mui/material";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { CustomLink } from "./CustomLink";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";

import { Link, useNavigate } from "@tanstack/react-router";
import React from "react";
import PlayCircle from "@mui/icons-material/PlayCircle";
const StyledCustomLink = styled(CustomLink)(
  ({ theme }) => css`
    color: ${theme.palette.common.white};
  `
);

export function Header() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
            size="large"
            edge="start"
            color="inherit"
            aria-label="logo"
            component={Link}
            to="/"
          >
            <LocalMoviesIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            fontSize="20px"
            component="a"
            sx={{
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",

              fontWeight: 700,
              fontSize: "2rem",
              px: 2,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Reviewdle
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "flex" } }}>
          <IconButton
  component={Link}
  to="/reviewdle/17"
  color="inherit"
  sx={{ px: 2 }}
>
  <PlayCircle sx={{ fontSize: "2rem" }} color="primary" />
</IconButton>

<IconButton
  component={Link}
  to="/reviewdle"
  color="inherit"
  sx={{ px: 2 }}
>
  <CalendarMonthIcon sx={{ fontSize: "2rem" }} color="primary" />
</IconButton>
          </Box>
          <Box>
            <Button
              sx={{ flexGrow: 0,fontSize: "1.7rem", px: 2 }}
              aria-control={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              color="inherit"
            >
              Admin
            </Button>
            <Box>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                slotProps={{
                  list: {
                    "aria-labelledby": "basic-button",
                  },
                }}
              >
                <MenuItem
                  sx={{fontSize: "1.5rem", px: 2}}
                  onClick={() => {
                    navigate({ to: "/reviewdle/admin" });
                    handleClose();
                  }}
                >
                  Calendar
                </MenuItem>
                <MenuItem
                 sx={{fontSize: "1.5rem", px: 2}}
                  onClick={() => {
                    navigate({ to: "/reviewdle/admin/add" });
                    handleClose();
                  }}
                >
                  Add game
                </MenuItem>
              </Menu>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
