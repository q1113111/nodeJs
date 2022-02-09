(async () => {
    const axios = require('axios');
    try {
        const { data } = await axios.get('https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=rdec-key-123-45678-011121314#')
        console.log(data.records)
    } catch (e) {
        console.log(e)
    }

})()