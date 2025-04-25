import * as Icons from '@mui/icons-material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router';
import { menuConfig } from '../config/menuConfig';
import PropTypes from 'prop-types';
import {Fragment} from "react";
import Divider from "@mui/material/Divider";

export default function MenuContent({ role, currentPath, to }) {
  const menuItems = menuConfig[role] || [];

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List dense>
        {menuItems.map((section, sectionIndex) => (
          <Fragment key={sectionIndex}>
            {sectionIndex > 0 && (<Divider sx={{mb: 1, mt: 2}} />)}
            {section.menu.map((item, index) => {
              const IconComponent = Icons[item.icon];
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
          </Fragment>
        ))}
      </List>
    </Stack >
  );
}

MenuContent.propTypes = {
  role: PropTypes.string.isRequired,
  currentPath: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
}