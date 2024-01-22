const express = require('express');
const axios = require('axios');
const pug = require('pug');

const app = express();

const private_app_token = 'pat-eu1-509b02b8-801c-45ee-b4dc-a2d3db0a59cb';

app.get('/', async (req, res) => {
    const contactsEndpoint = 'https://api.hubspot.com/crm/v3/objects/contacts';
    const headers = {
        Authorization: `Bearer ${private_app_token}`,
        'Content-Type': 'application/json'
    }
    try {
        const response = await axios.get(contactsEndpoint, { headers });
        const contactsData = response.data;

        res.render('homepage', { title: 'Hubspot Test', message: 'Banby', contacts: contactsData });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(3000, () => console.log('Listenning on http://localhost:3000'));