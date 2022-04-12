import React from "react";
import { Box, Group } from "@mantine/core";
import { Link } from "react-router-dom";

interface MenuItemProps {
  label: string;
  link?: string;
  children?: React.ReactNode;
}

const MenuItem = (props: MenuItemProps) => {
  const { children, link } = props;

  const CustomBox = () => {
    if (link) {
      return (
          <Box <typeof Link> component={Link} to={link}>
            <Box sx={boxTheme} p="xs">
              <Group>
                {children && children}
              </Group>
            </Box>
          </Box>
      )
    } else {
      return (
          <Box sx={boxTheme} p="xs">
            <Group>
              {children && children}
            </Group>
          </Box>
      )
    }
  }

  let boxTheme = (theme:any) => ({
    '&:hover': {
      backgroundColor:
          theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
    },
  });
  return (
      <CustomBox/>
  );
}

export default MenuItem;