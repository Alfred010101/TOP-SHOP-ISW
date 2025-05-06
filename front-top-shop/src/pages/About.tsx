import {
  Box,
  Typography,
  Container,
  Grid,
  Paper,
  Toolbar,
} from "@mui/material";

const About = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 8, mb: 4 }}>
      <Toolbar></Toolbar>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Sobre Nosotros
      </Typography>

      <Typography variant="body1" gutterBottom sx={{ mb: 2 }}>
        En <strong>TOP-SHOP</strong>, nos apasiona ayudarte a expresar tu estilo
        único. Somos una tienda especializada en ropa personalizada que te
        permite diseñar tus propias prendas con facilidad y creatividad.
      </Typography>

      <Typography variant="body1" gutterBottom sx={{ mb: 3 }}>
        Desde camisetas hasta sudaderas, trabajamos con materiales de alta
        calidad y tecnología de impresión de vanguardia para ofrecerte productos
        duraderos y con excelente acabado. Nuestra misión es brindarte una
        experiencia divertida, personalizada y satisfactoria al vestir.
      </Typography>

      <Box sx={{ my: 4 }}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom fontWeight="bold">
            Nuestra Misión
          </Typography>
          <Typography variant="body1">
            Ayudarte a llevar tu creatividad al siguiente nivel. Queremos que
            cada persona pueda crear ropa única, original y con identidad
            propia. Nos enfocamos en la innovación y la satisfacción total del
            cliente.
          </Typography>
        </Paper>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Contáctanos
            </Typography>
            <Typography variant="body1">
              <strong>Email:</strong> topshop@topshop.com
            </Typography>
            <Typography variant="body1">
              <strong>Teléfono:</strong> +52 55 1234 5678
            </Typography>
            <Typography variant="body1">
              <strong>Dirección:</strong> Calle Pricipal #123, Toluca, Edo. Mex
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Horarios de Atención
            </Typography>
            <Typography variant="body1">
              Lunes a Viernes: 9:00 am - 6:00 pm
            </Typography>
            <Typography variant="body1">Sábados: 10:00 am - 2:00 pm</Typography>
            <Typography variant="body1">Domingos: Cerrado</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default About;
