import { Box, Container, LinearProgress } from "@mui/material";
import { PropsWithChildren, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AUTH_STATE, useAuth } from "../../providers/AuthProvider";
import { useContinueUrl } from "../../hooks/useContinueUrl";
import { paths, ROUTES } from "../../routes";
import { Footer } from "./Footer";
import { Header } from "./Header";

export interface LayoutProps extends PropsWithChildren {}

export function Layout(props: LayoutProps) {
  const { children } = props;

  const { pathname } = useLocation();
  const { state } = useAuth();

  const { redirectWithContinueUrl, navigateToContinueURL } = useContinueUrl();

  useEffect(() => {
    if (
      pathname !== paths[ROUTES.LOGIN] &&
      state === AUTH_STATE.UNAUTHENTICATED
    ) {
      redirectWithContinueUrl(paths[ROUTES.LOGIN]);
    } else if (
      pathname === paths[ROUTES.LOGIN] &&
      state === AUTH_STATE.AUTHENTICATED
    ) {
      navigateToContinueURL(paths[ROUTES.CHARACTER_SELECT]);
    }
  }, [pathname, state]);

  if (state === AUTH_STATE.LOADING) {
    return <LinearProgress />;
  }

  return (
    <Box minHeight={"100vh"} display={"flex"} flexDirection={"column"}>
      <Header />
      <Container
        maxWidth={"xl"}
        sx={(theme) => ({
          py: 3,
          backgroundColor: theme.palette.background.paper,
          flexGrow: 1,
          [theme.breakpoints.down("sm")]: {
            paddingBottom: 7,
          },
        })}
      >
        {children}
      </Container>
      <Footer />
    </Box>
  );
}
