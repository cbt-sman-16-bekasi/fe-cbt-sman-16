import * as Icons from '@mui/icons-material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import {Link, useLocation} from 'react-router';
import { menuConfig } from '../config/menuConfig';
import PropTypes from 'prop-types';
import {Fragment, useEffect, useState} from "react";
import Box from '@mui/material/Box';
import ComingSoonBadge from "./common/ComingSoonBadge.jsx";
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import Collapse from "@mui/material/Collapse";

export default function MenuContent({ role, to }) {
  const [menu, setMenu] = useState(menuConfig[role]) || [];
  const currentPath = useLocation();

  const collapse = (section, index) => {
    if (section.collapse === undefined || section?.menu === undefined || section?.menu === null || section?.menu?.length === 0) return
    section.collapse = !section.collapse;
    menu[index] = section;
    setMenu([...menu]);
  }

  useEffect(() => {
    menu?.forEach((section) => {
      if (section.menu) {
        section?.menu.forEach((item) => {
          if (item.path === `/${currentPath.pathname?.split('/').slice(2).join('/')}`){
            section.collapse = true;
          }
        })
      }
    })
  }, [])

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List dense>
        {menu?.map((section, sectionIndex) => {
          const SectionIcon = Icons[section.icon];
          const sectionPath = `/${role}${section.path}`;
          return (
            <Fragment key={sectionIndex}>
              <ListItem key={`sectionMenu${sectionIndex}`} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  component={section?.menu?.length > 0 ? 'div' : Link}
                  onClick={() => {
                    to(section, sectionPath)
                    collapse(section, sectionIndex)
                  }}
                  to={section?.menu?.length > 0 ? null : sectionPath}
                  style={{ textDecoration: 'none', color: '#424242' }}
                  selected={currentPath.pathname.includes(section.path)}
                  sx={{
                    borderRadius: 2,
                    px: 3,
                    py: 2,
                    minHeight: 48,
                  }}
                >
                  <ListItemIcon>
                    <SectionIcon />
                  </ListItemIcon>

                  <ListItemText
                    primary={
                      <Box display="flex" alignItems="left" flexDirection="column" gap={1}>
                        {section.text}
                        {section.comingSoon && (<ComingSoonBadge />)}
                      </Box>
                    }
                  />
                  {section?.menu ? (section?.collapse ? <ExpandMore /> : <ExpandLess />) : null}
                </ListItemButton>
              </ListItem>

              {section?.menu?.map((item, index) => {
                const IconComponent = Icons[item.icon];
                const isActive = currentPath.pathname.includes(item.path);
                const path = `/${role}${item.path}`;

                return (
                  <Collapse in={section.collapse} key={`itemMenu${index}`} timeout="auto" unmountOnExit>
                    <ListItem key={index} disablePadding sx={{ display: 'block', pl: 4 }}>
                      <ListItemButton
                        component={Link}
                        onClick={() => to(item, path)}
                        to={path}
                        style={{ textDecoration: 'none', color: '#424242' }}
                        selected={isActive}
                        sx={{
                          borderRadius: 2,
                          px: 3,
                          py: 2,
                          minHeight: 48,
                        }}
                      >
                        <ListItemIcon>
                          {<IconComponent />}
                        </ListItemIcon>

                        <ListItemText
                          primary={
                            <Box display="flex" alignItems="left" flexDirection="column" gap={1}>
                              {item.text}
                              {item.comingSoon && (<ComingSoonBadge />)}
                            </Box>
                          }
                        />
                      </ListItemButton>
                    </ListItem>
                  </Collapse>
                );
              })}
            </Fragment>
          )
          }
        )
        }
      </List>
    </Stack>

  );
}

MenuContent.propTypes = {
  role: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
}