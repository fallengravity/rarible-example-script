const axios = require('axios');

// Example of Fetching Item Data which includes Name, Description, Centralized Image URL, Owners (Internal API) Rate limit 2000 per minute
function getItemData() {
    axios.get('https://api-mainnet.rarible.com/items/0x9f7a104b3107e383eec1428350cad516d3533981:24').then((response) => {
        console.log(`Item Name: ${response.data.properties.name}`);
        console.log(`Item Description: ${response.data.properties.description}`);
        console.log(`Item Image: ${response.data.properties.imageBig}`);
        console.log(`Item Owners: ${response.data.item.owners}`);
    });
}

getItemData();

// Example of looking up owner details (Internal API) Rate limit 2000 per minute
function getOwnerData() {
    axios.get('https://api-mainnet.rarible.com/items/0x9f7a104b3107e383eec1428350cad516d3533981:24').then((response) => {
        const ownerArray = response.data.item.owners;
        ownerArray.forEach((owner) => {
            axios.get(`https://api-mainnet.rarible.com/users/${owner}`).then((resp) => {
                console.log(resp.data);
            });
        });
    })
}

getOwnerData();

// Example of Looking up item history (Sales & Transfers Only) More Info on: https://docs.opensea.io/reference#retrieving-asset-events Rate limit unknown

function getItemEvents() {
    axios.get('https://api.opensea.io/api/v1/events?asset_contract_address=0x9f7a104b3107e383eec1428350cad516d3533981&token_id=24&event_type=successful&transfer&only_opensea=false&offset=0&limit=20').then((response) => {
        const itemEvents = response.data.asset_events;
        itemEvents.forEach((event) => {
            console.log(event);
        });
    })
}

getItemEvents();