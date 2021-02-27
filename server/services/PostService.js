const gsheetService = require('./GsheetService')

const getPosts = async (filters) => {
    return gsheetService.getRows("Posts")
        .then((res) => {
            if (filters) { 
                // filter rows that match one of any tags
                let filter = {}
                for (const tag of filters.split(',')) {
                    filter[tag] = true
                }

                let tagIdx = res.keymap['tags']
                let filteredRows = []
                for (const row of res.rows) {
                    found = false
                    for (const tag of row[tagIdx].split(',')) {
                        if (tag in filter) {
                            found = true
                            break
                        }
                    }
                    if (found) {
                        filteredRows.push(row)
                    }
                }
                res.rows = filteredRows 
                res.nrows = res.rows.length
            }
            return res
        })
        .catch((err) => {
            throw new Error(err)
        })
}

module.exports = {
    getPosts: getPosts
}