import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Slide from "@mui/material/Slide";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import SchoolIcon from "@mui/icons-material/School";

const sxSmallScreenTitle = {
  display: { xs: "flex", md: "none" },
  flexGrow: 0,
  fontFamily: "monospace",
  fontWeight: 700,
  letterSpacing: ".2rem",
  color: "inherit",
  textDecoration: "none",
  alignSelf: "right",
  textAlign: "right",
  mr: 0,
};
const sxBigScreenTitle = {
  mr: 2,
  display: { xs: "none", md: "flex" },
  fontFamily: "monospace",
  fontWeight: 700,
  letterSpacing: ".3rem",
  color: "inherit",
  textDecoration: "none",
};

const sxSchoolIconSmall = {
  display: { xs: "flex", sm: "flex", md: "none" },
  mr: 1,
  flexGrow: 0,
  justifyContent: "right",
};
const sxSchoolIconBig = {
  display: { xs: "none", md: "flex" },
  mr: 1,
};

function HeaderAppBar(props) {
  const { pages } = props;
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleMenuClick = () => {
    setAnchorElNav(null);
  };

  function HideOnScroll(props) {
    const { children, window } = props;

    const trigger = useScrollTrigger({
      target: window ? window() : undefined,
    });

    return (
      <Slide appear={false} direction="down" in={!trigger}>
        {children}
      </Slide>
    );
  }

  return (
    <HideOnScroll>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: "#818ca8",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{
              display: "flex",
            }}
          >
            <SchoolIcon sx={sxSchoolIconBig} />
            <Typography
              variant="h6"
              noWrap
              component={RouterLink}
              to="/"
              sx={sxBigScreenTitle}
            >
              LEARN WORDS
            </Typography>
            {/* меню бургер для маленьких экранов */}
            <Box
              sx={{
                flexGrow: 0,
                display: { xxs: "flex", md: "none" },
              }}
            >
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                disableEnforceFocus
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem
                    key={page.route}
                    onClick={handleMenuClick}
                    component={RouterLink}
                    to={"/" + page.route}
                  >
                    <Typography textAlign="center">{page.menuTitle}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <SchoolIcon sx={sxSchoolIconSmall} />
            {/* заголовок для маленьких экранов */}
            <Typography
              variant="h5"
              component={RouterLink}
              to="/"
              sx={sxSmallScreenTitle}
            >
              LEARN WORDS
            </Typography>
            {/* меню для больших экранов, скрыто для маленьких */}
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
              }}
            >
              {pages.map((page) => (
                <Button
                  component={RouterLink}
                  to={"/" + page.route}
                  key={page.route}
                  onClick={handleMenuClick}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page.menuTitle}
                </Button>
              ))}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </HideOnScroll>
  );
}
export default HeaderAppBar;
