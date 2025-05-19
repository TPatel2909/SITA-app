const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const axios = require('axios');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// 🔁 Shared Config
const BASE_URL = 'http://192.168.0.179:81/home/SITA/app/entityRestService';
const DEFAULT_ENTITY_ID = '7e1116a15ce336eca73a9285dfc2b8ac.020025AD005FA1F0881140647627AB0B';
const COMMON_HEADERS = {
  'Content-Type': 'application/json',
  'Samlart': 'e0pBVkEtQUVTL0dDTS9Ob1BhZGRpbmd9A8Drqzxw3P+oCnAhfp1vyiwYLbfixOkQ8UkSNupeaHdBRekG1sR8Wos4V0ui37Kfa80KBCwIEID1c4FF/guo01iFL0WSeFPIq4YCs8OhuK/Sw1v7GMd0daiBZQb1qYVYSIBrVrtGufyM8beHo8I=',
  'Cookie': 'e0pBVkEtQUVTL0dDTS9Ob1BhZGRpbmd92Sct4LRR6gp2uoC4SVU5FbkatIveL2qbU4yMiEfZmDZk87YjhtMseSKNC7b+WaVK7tCS7+Y/aQIWvCphmjI5fo9pkZwcFViaKQChTbXlMx48h+RKQKrtSVvRJfiflTD8H800YW19Cu1mO5lotext=1.rO0ABXNyABFqYXZhLnV0aWwuSGFzaE1hcAUH2sHDFmDRAwACRgAKbG9hZEZhY3RvckkACXRocmVzaG9sZHhwP0AAAAAAAAN3CAAAAAQAAAACdAAOT3JnYW5pemF0aW9uRE50AC5vPVNJVEEsY249Y29yZHlzLGNuPWRlZmF1bHRJbnN0LG89ZGN4ZWltLmxvY2FsdAAGQXV0aElEdAAET1REU3g='
};

// 🟢 GET
app.get('/api/appworks-data', async (req, res) => {
  const {entityId, itemId} = req.query;
  
  if (!entityId && !itemId) {
    return res.status(400).json({ error: 'Missing required query parameter: entityId or itemId' });
  }

  // Determine endpoint
  let url = '';
  if (itemId) {
    url = `${BASE_URL}/Items(${itemId})?include=All,Usage,Relation.ToOne.TargetGhostItem,Layout.Element=${entityId}&language=en-US`;
    //console.log(url);
  } else if (entityId) {
    url = `${BASE_URL}/Elements(${entityId})/ResultItems?include=PropDescs,Rules,Usage&language=en-US`;
  } else {
    return res.status(400).send('Missing required query parameter: entityId or itemId');
  }

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: COMMON_HEADERS
    });

    const contentType = response.headers.get('content-type') || '';
    const rawText = await response.text();

    console.log('🟡 AppWorks raw response:');

    if (contentType.includes('application/json')) {
      res.json(JSON.parse(rawText));
    } else {
      console.error('🔴 Non-JSON or error response from AppWorks:', rawText);
      res.status(response.status).send(rawText);
    }
  } catch (error) {
    console.error('🔴 Proxy error:', error);
    res.status(500).send('Internal Server Error');
  }
});

/*// 🟡 POST
app.post('/api/appworks-data', async (req, res) => {
  console.log('🔔 Backend hit! Body:', req.body);

  const entityId = DEFAULT_ENTITY_ID;
  const url = `${BASE_URL}/Elements(${entityId})/ResultItems`;

  try {
    const response = await axios.post(url, req.body, {
      headers: COMMON_HEADERS
    });

    console.log('🟢 AppWorks response:', response.data);
    res.status(201).send(response.data);

  } catch (error) {
    console.error('🔴 AppWorks error:', error.response?.data || error.message);
    res.status(error.response?.status || 500).send(error.response?.data || 'Internal Server Error');
  }
}); 

// 🔵 PUT
app.put('/api/appworks-data/:id', async (req, res) => {
  const recordId = req.params.id;
  const entityId = DEFAULT_ENTITY_ID;
  const url = `${BASE_URL}/Elements(${entityId})/ResultItems(${recordId})`;

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: COMMON_HEADERS,
      body: JSON.stringify(req.body)
    });

    const rawText = await response.text();
    console.log('🟢 AppWorks update response:');

    if (response.ok) {
      res.status(200).send(rawText);
    } else {
      res.status(response.status).send(rawText);
    }
  } catch (error) {
    console.error('🔴 Error updating AppWorks record:', error);
    res.status(500).send('Internal Server Error');
  }
});  */

app.listen(PORT, () => {
  console.log(`✅ Proxy server running at http://localhost:${PORT}`);
});
