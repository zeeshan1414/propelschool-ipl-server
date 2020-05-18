const csvtojson = require('csvtojson');
const fs = require('fs');
const economicalBowlers = require('./economicalBowlers');

const MATCHES_FILE_PATH = "./csv_data/matches.csv";
const DELIVERIES_FILE_PATH = "./csv_data/deliveries.csv";
const JSON_OUTPUT_FILE_PATH = "./data.json";

async function prepareData() {
    const matches = await csvtojson().fromFile(MATCHES_FILE_PATH);
    const deliveries = await csvtojson().fromFile(DELIVERIES_FILE_PATH);
    let topEconomicalBowlers = economicalBowlers(matches, deliveries);
    save(topEconomicalBowlers);
}

// save to the data.json
function save(result) {
    const jsonString = JSON.stringify(result);
    fs.writeFile(JSON_OUTPUT_FILE_PATH, jsonString, "utf8", err => {
        if (err) {
          console.error(err);
        }
      });
}

prepareData();