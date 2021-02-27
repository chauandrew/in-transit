const { JWT } = require('google-auth-library')
const axios = require('axios');

// Using 5 different service accounts to balance rate-limiting
const CLIENT_EMAIL1 = process.env.REACT_APP_GOOGLE_CLIENT_EMAIL1;
const PRIVATE_KEY1 = process.env.REACT_APP_GOOGLE_SERVICE_PRIVATE_KEY1.replace(/\\n/gm, '\n'); // use real line breaks
const CLIENT_EMAIL2 = process.env.REACT_APP_GOOGLE_CLIENT_EMAIL2;
const PRIVATE_KEY2 = process.env.REACT_APP_GOOGLE_SERVICE_PRIVATE_KEY2.replace(/\\n/gm, '\n'); // use real line breaks
const CLIENT_EMAIL3 = process.env.REACT_APP_GOOGLE_CLIENT_EMAIL3;
const PRIVATE_KEY3 = process.env.REACT_APP_GOOGLE_SERVICE_PRIVATE_KEY3.replace(/\\n/gm, '\n'); // use real line breaks
const CLIENT_EMAIL4 = process.env.REACT_APP_GOOGLE_CLIENT_EMAIL4;
const PRIVATE_KEY4 = process.env.REACT_APP_GOOGLE_SERVICE_PRIVATE_KEY4.replace(/\\n/gm, '\n'); // use real line breaks
const CLIENT_EMAIL5 = process.env.REACT_APP_GOOGLE_CLIENT_EMAIL5;
const PRIVATE_KEY5 = process.env.REACT_APP_GOOGLE_SERVICE_PRIVATE_KEY5.replace(/\\n/gm, '\n'); // use real line breaks

const CLIENT_EMAILS = [CLIENT_EMAIL1, CLIENT_EMAIL2, CLIENT_EMAIL3, CLIENT_EMAIL4, CLIENT_EMAIL5]
const PRIVATE_KEYS = [PRIVATE_KEY1, PRIVATE_KEY2, PRIVATE_KEY3, PRIVATE_KEY4, PRIVATE_KEY5]

const GOOGLE_AUTH_SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

const config = require('../config/google-sheets.json')

// TODO: these requests will fail after 1000 rows (eg A1:Z1000). Eventually
// move on to use something more dynamic

/**
 * Authenticate Google Sheets API with service account.
 * @returns {string} authorization string
 */
const authorize = async () => {
    const i = Math.floor(Math.random() * 5)
    const client = new JWT({
        email: CLIENT_EMAILS[i],
        key: PRIVATE_KEYS[i],
        scopes: GOOGLE_AUTH_SCOPES
    })
    const creds = await client.authorize();
    return `${creds.token_type} ${creds.access_token}`
}

/**
 * Get all rows from a gsheet where the first row contains column names,
 * and the rest contain data. Make sure new sheets are added to 
 * '/src/config/google-sheets.json' to query data. 
 * 
 * Gsheets api documentation here: 
 * https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.values/get
 * 
 * @param {string} sheetName - the name of the sheet to search
 * @param {Object} [filters={}] - case insensitive equality filters to match
 * @returns {Object} Object with 'columnNames', 'keymap', 'rows', and 'nrows' features
 */
const getRows = async (sheetName, filters = {}) => {
    // check that sheet and filters exist
    if (!(sheetName in config)) {
        throw new Error(`Error: Could not find sheet '${sheetName}'`);
    } else if (typeof (filters) !== 'object') {
        console.log(`Warning: Could not filter by '${filters}'.` +
            ' Defaulting to {} instead.');
        filters = {};
    }

    // Authorize gsheets + query sheet for rows
    let url = "https://sheets.googleapis.com/v4/spreadsheets/" +
        `${config[sheetName]['spreadsheetId']}/values/${sheetName}!A1:Z1000`
    let opts = { headers: { "authorization": (await authorize()) } }
    let rows = (await axios.get(url, opts)).data.values
    let columnNames = rows.shift() // 0th element of 'rows' holds column names

    // Build response + filter rows
    let filterIndices = {}; // map column numbers to filters
    for (const filter in filters) {
        let index = columnNames.indexOf(filter);
        if (index === -1) {
            throw new Error(`Error: column ${filter} does not exist in sheet ${sheetName}`);
        }
        filterIndices[index] = filters[filter];
    }
    let response = {
        'columnNames': columnNames,
        'keymap': {},
        'rows': []
    };
    // Generate keymap of columnName -> columnNum
    for (let i = 0; i < columnNames.length; i++) {
        response['keymap'][columnNames[i]] = i;
    }

    // filter rows by given search query
    for (let i = 0; i < rows.length; ++i) {
        let valid = true;
        for (const column in filterIndices) {
            if (rows[i][column] != filterIndices[column]) {
                valid = false;
                break;
            }
        }
        if (valid) {
            response['rows'].push(rows[i]);
        }
    }
    response['nrows'] = response['rows'].length
    return response;
}

/**
 * Append rows to a given sheet. 
 * @param {string} sheetName the name of the sheet to search
 * @param {Array} rows 2d array of rows to append
 * @return {Object} returns Object summarizing results of the insert
 */
const appendRows = async (sheetName, rows) => {
    if (!(sheetName in config)) {
        throw new Error(`Error: Could not find sheet '${sheetName}'`);
    } else if (!Array.isArray(rows) || rows.length == 0) {
        throw new Error(`Error: could not append rows ${rows}. Must pass in a 2d array`);
    }
    // build request, authorize, return data
    let url = "https://content-sheets.googleapis.com/v4/spreadsheets/" +
        `${config[sheetName]['spreadsheetId']}/values/${sheetName}!A1:Z1000:append` +
        "?valueInputOption=RAW&includeValuesInResponse=true" +
        "&insertDataOption=INSERT_ROWS&alt=json";
    let opts = { headers: { "authorization": (await authorize()) } }
    let data = { "values": rows }
    let res = (await axios.post(url, data, opts))
    return res.data
}

module.exports = {
    getRows: getRows,
    appendRows: appendRows
}