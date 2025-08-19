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
              <Button component={Link} to="/reviewdle/17" color="inherit">
                Daily
              </Button>
              <Button component={Link} to="/reviewdle" color="inherit">
                Archives
              </Button>
              <Box sx={{
                display:"flex",
                justifyContent:"flex-end"
              }}>
 
              <Button component={Link} to="/reviewdle/admin/add" color="inherit">
              Add
            </Button>
            <Button component={Link} to="/reviewdle/admin" color="inherit">
              Admin Calendar
            </Button>               
              </Box>
            </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
