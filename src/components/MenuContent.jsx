import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import {Link, useLocation} from 'react-router';
import { icons, menuConfig } from '../config/menuConfig';
import PropTypes from 'prop-types';

export default function MenuContent({ role }) {
  const menuItems = menuConfig[role] || [];
  const location = useLocation();

  const currentPath = location.pathname.split('/').slice(2).join('/') || "/";
  const to = (menu) => {
    localStorage.setItem("currentMenu", JSON.stringify(menu));
  }

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List dense>
        {menuItems.map((item, index) => {
          const IconComponent = icons[item.icon];
          const isActive = `/${currentPath}` === item.path;
          const path = `/${role}${item.path}`;

          return (
            <ListItem key={index} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                component={Link}
                onClick={() => to(item, path)}
                to={path}
                style={{ textDecoration: 'none', color: '#FFFFFF' }}
                selected={isActive}
                sx={{
                  // bgcolor: isActive ? 'primary.light' : 'inherit',
                  // color: isActive ? 'primary.dark' : 'inherit',
                  borderRadius: 2,
                  px: 3,
                  py: 2,
                  minHeight: 48,
                }}
              >
                <ListItemIcon >
                  {<IconComponent />}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Stack >
  );
}

MenuContent.propTypes = {
  role: PropTypes.string.isRequired,
}