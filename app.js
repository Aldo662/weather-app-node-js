require('dotenv').config()
const {
   mainMenu,
   pause,
   readInput,
   citiesMenu,
   showFinalInfo,
}  = require('./helpers/inquirer');

const { Finder } = require('./models/finder.js')

//Main Loop
const main = async () => {

   let result;
   const finder = new Finder();

   do {
      result = await mainMenu();

      switch (result) {
         case 1:
            //City provided by the user
            const city = await readInput(); 

            // Return an array wich match with the user search
            const arrayPlaces = await finder.findByCity(city);

            // Menu based on arrayPlaces
            const idPlace = await citiesMenu(arrayPlaces);

            const currentPlace = arrayPlaces.find(place => place.id == idPlace);

            //Get weather - return an object containing the necessary data
            const weather = await finder.getWeather(currentPlace);            
           
            finder.addSearchToHistory(currentPlace)

            //Show the final information
            showFinalInfo(currentPlace, weather);
            break;

         case 2:
            finder.printHistory();
            break;
      }

      await pause();

   } while (result !== 3);
};

main();

//Enlaces Map--box
//https://www.mapbox.com/
//https://docs.mapbox.com/api/search/geocoding/

//Prueba de peticion http
//https://reqres.in/
