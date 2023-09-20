// write a nodejs server that will expose a method call "get" that will return the value of the key passed in the query string
// example: http://localhost:3000/get?key=hello
// if the key is not passed, return "key not passed"
// if the key is passed, return "hello" + key
// if the url has other methods, return "method not supported"
// when server is listening, log "server is listening on port 3000"

const http = require('http');
const url = require('url');
const fs = require('fs');
const request = require('request');

function getName(name) {
  return 'Hello ' + name;
}

function daysBetweenDates(date1, date2) {
  var date1_ms = Date.parse(date1);
  var date2_ms = Date.parse(date2);
  var difference_ms = date2_ms - date1_ms;

  if (difference_ms < 0) {
    return 'Date 1 is greater than Date 2';
  }
  else if (isNaN(difference_ms)) {
    return 'Invalid date';
  }

  const diffDays = Math.ceil(difference_ms / (1000 * 60 * 60 * 24));
  return diffDays;
}

function validatePhoneNumber(phoneNumber) {
  // Regex to validate phone number in Spanish format
  const regex = /^(\+34|0034|34)?[ -]*(6|7)[ -]*([0-9][ -]*){8}$/;
  const isValid = regex.test(phoneNumber);

  if (isValid) {
    return 'Phone number has a Spanish format';
  }
  return 'Phone number does not have a Spanish format';
}

function validateSpanishDNI(dni) {
  const regex = /^\d{8}[a-zA-Z]$/;
  const isValid = regex.test(dni);

  if (isValid) {
    return 'DNI has a Spanish format';
  }
  return 'DNI does not have a Spanish format';
}

function getColorCode(colorName) {
  const colors = JSON.parse(fs.readFileSync('colors.json', 'utf8'));
  const color = colors.find((color) => color.color === colorName);

  const colorCode = color.code.hex;

  if (colorCode) {
    return colorCode;
  }

  return 'Color not found';
}

function getMoviesByDirector(director) {
  var apiKey = "4cadb27e";
  var urlMovies = "https://www.omdbapi.com/?i=tt3896198&apikey=" + apiKey


  // Get Titles given a director with request
  request(urlMovies + '&s=' + director, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var films = JSON.parse(body);
      var movies = ""

      // Get all the movies
      for (var i = 0; i < films.Search.length; i++) {
        var movie = films.Search[i];
        movies += movie.Title + ", ";
      }

      console.log(movies);
      if (movies) {
        return movies;
      } else {
        return 'No movies found';
      }
    }
  });
}


const server = http.createServer((req, res) => {
  // Create a heatlh check method in a endpoint
  if (req.url === '/health') {
    res.end('UP')
  }
  // Create a method to return a Hello given a name in an endpoint /get
  else if (req.url.startsWith('/get')) {
    const queryObject = url.parse(req.url, true).query;
    if (queryObject.key) {
      const name = getName(queryObject.key);
      res.end(name);
    } else {
      res.end('key not passed');
    }
  }

  // Calculate days between two dates given two dates in an endpoint /DaysBetweenDates
  else if (req.url.startsWith('/DaysBetweenDates')) {
    const queryObject = url.parse(req.url, true).query;
    if (queryObject.date1 && queryObject.date2) {
      const date1 = new Date(queryObject.date1);
      const date2 = new Date(queryObject.date2);

      var diffDays = daysBetweenDates(date1, date2);

      res.end(diffDays.toString());
    } else {
      res.end('Dates not passed');
    }
  }

  //Create an endpoint /ValidatePhoneNumber that returns true if the phone number is valid and false if it is not
  else if (req.url.startsWith('/ValidatePhoneNumber')) {
    const queryObject = url.parse(req.url, true).query;
    if (queryObject.phoneNumber) {
      const phoneNumber = queryObject.phoneNumber;
      const isValid = validatePhoneNumber(phoneNumber);

      res.end(isValid);
    } else {
      res.end('Phone number not passed');
    }
  }

  // Create an endpoint /ValidateSpanishDNI that returns true if the DNI is valid and false if it is not
  else if (req.url.startsWith('/ValidateSpanishDNI')) {
    const queryObject = url.parse(req.url, true).query;
    if (queryObject.dni) {
      const dni = queryObject.dni;
      const isValid = validateSpanishDNI(dni);

      res.end(isValid);
    } else {
      res.end('DNI not passed');
    }
  }

  // Create an endpoint /ReturnColor that returns the rgb color given a color name
  else if (req.url.startsWith('/ReturnColorCode')) {
    const queryObject = url.parse(req.url, true).query;
    if (queryObject.color) {
      const color = queryObject.color;
      const colorCode = getColorCode(color);

      res.end(colorCode);
    } else {
      res.end('Color not passed');
    }
  }

  // Create an ednpoint /MoviesByDirector that returns the movies of a director given a director name
  else if (req.url.startsWith('/MoviesByDirector')) {
    var apiKey = "4cadb27e";
    var urlMovies = "https://www.omdbapi.com/?i=tt3896198&apikey=" + apiKey

    const queryObject = url.parse(req.url, true).query;

    if (queryObject.director) {
      const director = queryObject.director;

      request(urlMovies + '&s=' + director, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          var films = JSON.parse(body);
          var movies = ""

          for (var i = 0; i < films.Search.length; i++) {
            var movie = films.Search[i];
            movies += movie.Title + ", ";
          }
          if (movies) {
            res.end(movies);
          } else {
            res.end('No movies found');
          }
        }
      });

    } else {
      res.end('Director not passed');
    }
  }


});

server.listen(3000, () => {
  console.log('server is listening on port 3000');
});
