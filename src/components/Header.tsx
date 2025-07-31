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
} from "@mui/material";
import { CustomLink } from "./CustomLink";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";

import { Link } from "@tanstack/react-router";
const StyledCustomLink = styled(CustomLink)(
  ({ theme }) => css`
    color: ${theme.palette.common.white};
  `
);

export function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <IconButton
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
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Reviewdle
          </Typography>

            <Stack direction="row" spacing={2}>
              <Button component={Link} to="/archives/17" color="inherit">
                Daily
              </Button>
              <Button component={Link} to="/archives" color="inherit">
                Archives
              </Button>
              <Button component={Link} to="/daily/add" color="inherit">
              Add
            </Button>
            </Stack>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button component={Link} to="/Admin" color="inherit">
              Admin
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
