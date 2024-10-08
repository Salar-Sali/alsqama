import MenuIcon from "@mui/icons-material/Menu";
import { Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { servicesPageEndpoint } from "~/bootstrap/helper/endpoints";
import langKey from "~/bootstrap/i18n/langKey";
import {
  StyledBurgerMenuItem,
  StyledServicesBurger,
  StyledServicesBurgerIconButton,
} from "~/support/header/services-burger/style";

const ServicesBurger = () => {
  //ui logic
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { t } = useTranslation();
  return (
    <StyledServicesBurger>
      <StyledServicesBurgerIconButton onClick={handleClick}>
        <MenuIcon sx={{ fontSize: "inherit" }} />
      </StyledServicesBurgerIconButton>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleClose}>
          <StyledBurgerMenuItem
            $isSelected={false}
            to={servicesPageEndpoint.chalets}
          >
            {t(langKey.global.chalets)}
          </StyledBurgerMenuItem>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <StyledBurgerMenuItem
            $isSelected={false}
            to={servicesPageEndpoint.halls}
          >
            {t(langKey.global.halls)}
          </StyledBurgerMenuItem>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <StyledBurgerMenuItem
            $isSelected={false}
            to={servicesPageEndpoint.hotels}
          >
            {t(langKey.global.hotels)}
          </StyledBurgerMenuItem>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <StyledBurgerMenuItem
            $isSelected={false}
            to={servicesPageEndpoint.appartments}
          >
            {t(langKey.global.apartments)}
          </StyledBurgerMenuItem>
        </MenuItem>
      </Menu>
    </StyledServicesBurger>
  );
};

export default ServicesBurger;
