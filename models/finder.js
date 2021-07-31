 
const axios = require('axios');


class Finder {
   constructor() {
      this.history = [];
   }
    
   async findByCity(place) {
      //First http request of the application
      
      const axiosInstance = axios.create({
         baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
         params: {
            access_token: process.env.MAPBOX_TOKEN,
            limit: 7,
            language: 'es',
         }
      });
      
      try {
         const result = await axiosInstance.get();
         return result.data.features.map(place => ({
            id: place.id, 
            name: place.place_name_es, 
            lon: place.center[0],
            lat: place.center[1]
         }));
      } catch (error) {
         console.log('Ocurrio un error', error);
      }
  }

   async getWeather(currentPlace) {
      const { lon, lat } = currentPlace;
      const axiosInstance = axios.create({
         baseURL: 'https://api.openweathermap.org/data/2.5/weather',
         params: {
            lat, 
            lon,
            appid: process.env.OPENWEATHER_TOKEN,
            units: 'metric',
            lang: 'es'
         }
      })
      
      try {
         const { data } = await axiosInstance.get()
         return { 
            temp: data.main.feels_like,
            tempMin: data.main.temp_min,
            tempMax: data.main.temp_max
         }
      } catch (error) {
         console.log(error);
      }
   }

   printHistory() {
      /*this.history.length > 0 ?
      this.history.forEach( search => console.log(search)) :
      console.log('There are not searches yet'); */
      console.log(this.history, this.history.length)
   }
   
   addSearchToHistory(currentPlace) {
      const { name, lon, lat } = currentPlace;
      const search = new Search(name, lon, lat);

      if (this.history.length <= 7) {
         this.history.push(search);
      } else {
         this.history.push(search);
         this.history.shift();
      }
   }
}

class Search {
   constructor(name, lon, lat) {
      this.date = new Date().toISOString()
      this.name = name,
      this.lon = lon,
      this.lat = lat;
   }
}

module.exports = { 
   Finder, 
   Search 
}

