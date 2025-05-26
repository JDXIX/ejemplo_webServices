const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());

// Endpoint para obtener coordenadas de una dirección con OpenStreetMap
app.get('/geocode', async (req, res) => {
    const address = req.query.address;
    if (!address) {
        return res.status(400).json({ error: "Debes proporcionar una dirección" });
    }

    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json`;

    try {
        const response = await axios.get(url);
        const data = response.data;

        if (data.length > 0) {
            const location = data[0];
            return res.json({
                latitud: location.lat,
                longitud: location.lon,
                direccion: location.display_name
            });
        } else {
            return res.status(404).json({ error: "Dirección no encontrada" });
        }
    } catch (error) {
        return res.status(500).json({ error: "Error al obtener datos de OpenStreetMap" });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
