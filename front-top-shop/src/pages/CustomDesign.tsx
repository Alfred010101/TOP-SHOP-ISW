import {
  Box,
  Typography,
  Grid,
  MenuItem,
  TextField,
  Button,
  Paper,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import ShirtPreview from "../components/ShirtPreview";

const COLOR_OPTIONS = [
  "#ffffff",
  "#000000",
  "#e53935",
  "#8e24aa",
  "#3949ab",
  "#1e88e5",
  "#00acc1",
  "#43a047",
  "#fdd835",
  "#fb8c00",
  "#6d4c41",
  "#90a4ae",
];

const CustomDesign = () => {
  const [shirtType, setShirtType] = useState("Hombre");
  const [color, setColor] = useState("#ffffff");
  const [sleeve, setSleeve] = useState("Corta");
  const [neck, setNeck] = useState("Redondo");
  const [size, setSize] = useState("M");
  const [design, setDesign] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setDesign(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Personaliza tu Playera
      </Typography>

      <Grid
        container
        spacing={4}
        justifyContent="center"
        alignItems="flex-start"
      >
        {/* Panel de controles */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <TextField
              select
              label="Tipo"
              fullWidth
              size="small"
              margin="dense"
              value={shirtType}
              onChange={(e) => setShirtType(e.target.value)}
            >
              {["Hombre", "Mujer", "Niño", "Niña"].map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              label="Manga"
              fullWidth
              size="small"
              margin="dense"
              value={sleeve}
              onChange={(e) => setSleeve(e.target.value)}
            >
              {["Corta", "Larga", "Sin mangas"].map((opt) => (
                <MenuItem key={opt} value={opt}>
                  {opt}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              label="Cuello"
              fullWidth
              size="small"
              margin="dense"
              value={neck}
              onChange={(e) => setNeck(e.target.value)}
            >
              {["Redondo", "V", "Polo"].map((opt) => (
                <MenuItem key={opt} value={opt}>
                  {opt}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              label="Talla"
              fullWidth
              size="small"
              margin="dense"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            >
              {["XS", "S", "M", "L", "XL"].map((opt) => (
                <MenuItem key={opt} value={opt}>
                  {opt}
                </MenuItem>
              ))}
            </TextField>

            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" gutterBottom>
                Color de la playera
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {COLOR_OPTIONS.map((c) => (
                  <IconButton
                    key={c}
                    onClick={() => setColor(c)}
                    sx={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      bgcolor: c,
                      border: color === c ? "2px solid #000" : "1px solid #ccc",
                      p: 0,
                    }}
                  >
                    {color === c && (
                      <CheckIcon sx={{ color: "#fff", fontSize: 16 }} />
                    )}
                  </IconButton>
                ))}
              </Box>
            </Box>

            <Box sx={{ mt: 2 }}>
              <Button
                variant="contained"
                component="label"
                fullWidth
                size="small"
              >
                Cargar diseño
                <input
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Vista previa */}
        <Grid item xs={12} md={5}>
          <ShirtPreview
            color={color}
            design={design}
            type={shirtType}
            sleeve={sleeve}
            neck={neck}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default CustomDesign;
