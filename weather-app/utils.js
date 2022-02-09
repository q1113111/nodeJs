const axios = require('axios'); 
const getWeather = async(address,callback)=>{
    const local = encodeURI(address)
    try {
        const { data } = await axios.get(`https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-534290A9-979A-4C9A-A678-636BB81ED455&locationName=${local}`)
        callback(data.records)
    } catch (e) {
        const error ='not find'
        callback(error)
    }
}

module.exports = {
    getWeather
}