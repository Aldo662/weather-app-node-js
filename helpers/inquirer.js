const inquirer = require('inquirer');
const colors = require('colors');

console.log('Inicio de inquirer.js')

const mainMenu = async () => {

	const headerfooter = '  =========================  '
	const title = '             Menu            '

	console.clear();
	console.log(colors.rainbow(headerfooter));
	console.log(colors.white(title));
	console.log(colors.rainbow(headerfooter), '\n');

   const choices = [
      { name: `${colors.red('1)')} Found a city`, value: 1 },
      { name: `${colors.red('2)')} History`, value: 2 },
      { name: `${colors.red('3)')} Exit`, value: 3 },
   ];

   const questions = {
      type: 'list',
      name: 'opt',
      message: 'Select an option',
      choices
   };

   const { opt } = await inquirer.prompt([questions]);
   return opt
}

const pause = async () => {
   const questions = {
      type: 'input',
      name: 'I dont care',
      message: `Press ${colors.red('Enter')} to continue...`,
   }
   await inquirer.prompt([questions])
};

const readInput = async () => {
   const question =  {
      type: 'input',
      name: 'city',
      message: 'Please type one city:',
   };
   console.clear();
   const { city } = await inquirer.prompt([question]);
   return city
}

const citiesMenu = async places => {

   const question = {
      type: 'list',
      name: 'place',
      message: 'Choose the city that you want',
      pageSize: 8,
   };
   
   question.choices = places.map(place => ({name: place.name, value: place.id})) 

   const { place } = await inquirer.prompt([question]);
   return place;
}

const showFinalInfo = (place, weatherInfo) => {
	const headerfooter = '  =========================  '
	const title = '             Info            '

	console.clear();
	console.log(colors.rainbow(headerfooter));
	console.log(colors.white(title));
	console.log(colors.rainbow(headerfooter), '\n');

   console.log(`${colors.blue('#')} ${place.name}`)
   console.log(`${colors.blue('#')} Lat: ${place.lat}`)
   console.log(`${colors.blue('#')} Lon: ${place.lon}`) 
   console.log(`${colors.blue('#')} Temperature: ${weatherInfo.temp}°`)
   console.log(`${colors.blue('#')} Min Temperature: ${weatherInfo.tempMin}°`)
   console.log(`${colors.blue('#')} Max Temperature: ${weatherInfo.tempMax}°\n`)
}

module.exports = {
   mainMenu,
   pause,
   readInput,
   citiesMenu,
   showFinalInfo
}
