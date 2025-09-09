const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');


require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 4000;

//  Aquí defines tus claves directamente
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

let accessToken = null;
let expiresAt = 0;

app.use(cors());
app.use(express.json());

async function obtenerToken() {
  const now = Date.now();

  if (accessToken && now < expiresAt) {
    return accessToken;
  }

  const params = new URLSearchParams();
  params.append('grant_type', 'client_credentials');
  params.append('client_id', CLIENT_ID);
  params.append('client_secret', CLIENT_SECRET);

  const res = await fetch('https://api.petfinder.com/v2/oauth2/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params.toString(),
  });

  const data = await res.json();

  console.log('Token response:', data);

  if (!res.ok) {
    throw new Error(`Error al obtener token: ${data.error} - ${data.error_description}`);
  }

  accessToken = data.access_token;
  expiresAt = Date.now() + (data.expires_in - 60) * 1000;

  return accessToken;
}

app.get('/api/animals', async (req, res) => {
  const { status } = req.query;

  try {
    const token = await obtenerToken();

    const url = new URL('https://api.petfinder.com/v2/animals');
    if (status) url.searchParams.append('status', status);

    url.searchParams.append('type', 'dog');

    const petfinderResponse = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!petfinderResponse.ok) {
      const errorBody = await petfinderResponse.text();
      console.error('Error de Petfinder API:', petfinderResponse.status, errorBody);
      return res.status(500).json({ error: 'Error en Petfinder API', details: errorBody });
    }

    const data = await petfinderResponse.json();

    res.json(data);
  } catch (error) {
    console.error('Error interno del servidor:', error);
    res.status(500).json({ error: 'Error al obtener datos de Petfinder', details: error.message });
  }
});






app.listen(PORT, () => {
  console.log(`✅ Backend corriendo en http://localhost:${PORT}`);
});
