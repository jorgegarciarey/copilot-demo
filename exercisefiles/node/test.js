//write npm command line to install mocha
//npm install --global mocha

//command to run this test file
//mocha test.js

const assert = require('assert');
const http = require('http');
const localhost = 'http://localhost:3000';

const server = require('./NodeServer');

describe('Node Server', () => {
    it('Should return "key not passed" if key is not passed', (done) => {
        http
        .get(localhost + '/get' , (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                assert.equal(data, 'key not passed');
                done();
            });
        });
    });

    // Add test to check get when key is equal to Jorge
    it('Should return "Hello Jorge" if key is equal to Jorge', (done) => {
        http
        .get(localhost + '/get?key=Jorge' , (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                assert.equal(data, 'Hello Jorge');
                done();
            });
        });
    });

    // Add test to check validatephoneNumber
    it('Should return "Phone number has a Spanish format" if phone number is valid', (done) => {
        http
        .get('http://localhost:3000/ValidatePhoneNumber?phoneNumber=666666666' , (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                assert.equal(data, 'Phone number has a Spanish format');
                done();
            });
        });
    });

    // Add test to return Phone number does not have a Spanish format if phone number is not valid
    it('Should return "Phone number does not have a Spanish format" if phone number is not valid', (done) => {
        http
        .get('http://localhost:3000/ValidatePhoneNumber?phoneNumber=6666666666' , (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                assert.equal(data, 'Phone number does not have a Spanish format');
                done();
            });
        });
    });

    // Add test to check validateSpanishDNI
    it('Should return "DNI has a Spanish format" if DNI is valid', (done) => {
        http
        .get('http://localhost:3000/ValidateSpanishDNI?dni=12345678A' , (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                assert.equal(data, 'DNI has a Spanish format');
                done();
            });
        });
    });

    // Add test for returnColorCode red should return code #FF0000
    it('Should return "#FF0000" if color is red', (done) => {
        http
        .get('http://localhost:3000/ReturnColorCode?color=red' , (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                assert.equal(data, '#FF0000');
                done();
            });
        });
    });

    // Add test for DaysBetweenDates 2019-01-01 and 2019-01-02 should return 1
    it('Should return "1" if date1 is 2019-01-01 and date2 is 2019-01-02', (done) => {
        http
        .get('http://localhost:3000/DaysBetweenDates?date1=2019-01-01&date2=2019-01-02' , (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                assert.equal(data, '1');
                done();
            });
        });
    });

    // Add test for DaysBetweenDates with invalid dates
    it('Should return "Invalid date" if date1 is 2019-01-01 and date2 is 2019-01-32', (done) => {
        http
        .get('http://localhost:3000/DaysBetweenDates?date1=2019-01-01&date2=2019-01-32' , (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                assert.equal(data, 'Invalid date');
                done();
            });
        });
    });

    // Add test for DaysBetweenDates with date1 greater than date2
    it('Should return date1 greater than date2 if date1 is 2023-01-02 and date2 is 2019-01-01', (done) => {
        http
        .get('http://localhost:3000/DaysBetweenDates?date1=2023-01-02&date2=2019-01-01' , (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                assert.equal(data, 'Date 1 is greater than Date 2');
                done();
            });
        });
    });

    // Add test for GetMovieByDirector with director name
    it('Should a 200 status code if director name is "Steven Spielberg"', (done) => {
        http
        .get('http://localhost:3000/MoviesByDirector?director=Steven Spielberg' , (res) => {
            assert.equal(res.statusCode, 200);
            done();
        });
    });




});
