import { Tabs, TabsProps } from "@mui/material";

export interface StyledTabsProps extends TabsProps {}

export function StyledTabs(props: StyledTabsProps) {
  return (
    <Tabs
      TabIndicatorProps={{
        sx: (theme) => ({
          height: "100%",
          backgroundColor: theme.palette.grey[300],
          borderRadius: theme.shape.borderRadius,
        }),
      }}
      TabScrollButtonProps={{
        sx: {
          height: "100%",
        },
      }}
      sx={(theme) => ({
        py: 0,
        backgroundColor: theme.palette.background.default,
        borderBottom: `1px solid ${theme.palette.divider}`,
        alignItems: "center",
      })}
      variant={"scrollable"}
      scrollButtons
      allowScrollButtonsMobile
      indicatorColor="secondary"
      {...props}
    />
  );
}
