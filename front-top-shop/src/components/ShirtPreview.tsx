import { Box, Typography } from "@mui/material";

interface Props {
  color: string;
  design: string | null;
  type: string;
  sleeve: string;
  neck: string;
}

const ShirtPreview = ({ color, design, type, sleeve, neck }: Props) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: 400,
        borderRadius: 2,
        bgcolor: "#fff",
        boxShadow: 3,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Typography variant="h6" sx={{ p: 2 }}>
        Vista previa
      </Typography>

      <Box
        sx={{
          backgroundColor: color,
          width: 250,
          height: 300,
          margin: "0 auto",
          borderRadius: "12px",
          position: "relative",
        }}
      >
        {design && (
          <img
            src={design}
            alt="Diseño cargado"
            style={{
              position: "absolute",
              top: "30%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              maxWidth: "150px",
              maxHeight: "150px",
            }}
          />
        )}
      </Box>

      <Box textAlign="center" sx={{ mt: 2 }}>
        <Typography variant="body2">Tipo: {type}</Typography>
        <Typography variant="body2">Manga: {sleeve}</Typography>
        <Typography variant="body2">Cuello: {neck}</Typography>
      </Box>
    </Box>
  );
};

export default ShirtPreview;
