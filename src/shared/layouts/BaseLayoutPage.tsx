import { Box, useMediaQuery, useTheme } from "@mui/material";

interface IBaseLayoutPageProps {
  children: React.ReactNode;
  toolbar?: React.ReactNode;
}

export const BaseLayoutPage: React.FC<IBaseLayoutPageProps> = ({
  children,
  toolbar,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        height: "100vh",
      }}
    >
      {toolbar}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${isMobile ? 0 : 240}px)` },
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
