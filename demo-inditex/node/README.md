# Activate GitHub Copilot using Nodejs

Demo project for running labs to evaluate Copilot viability

## Instructions

- Download to local the exercicefile folder
- Open NodeServer.js and begin by writing a Nodejs server, check the first suggestions based on the initial text
- Open test.js file and analyze the current test
- Open a command prompt and run the test (mocha test.js)
- See the result, it should display something like:

``` bash
mocha test.js
server is listening on port 3000

  Node Server

    √ should return "key not passed" if key is not passed

  1 passing (34ms)

```

- In the NodeServer.js develop the rest of the methods described in the Exercise described in the section below (do not forget to open color.json file in Visual Studio Code, so CoPilot get all the context to make better recommendations)
- In the Test.js file add the methods to test the functionality
- Run the tests to verify that all is working
- Open the dockerfile file, and fill it, in order to create a docker container with a node image that can run the web server
- Create command to run docker in port 4000
- Test that the application is working in port 4000
- In the **nodeserver.js** file, you can type a new line like //run a curl command to test the server

So we can see how CoPilot based on the current file produces a curl command, to be executed in command line

- Also you can be more specific like: //run a curl command to test the daysBetweenDates method

So it generates a test for a specific method

## Exercise

The exercise consist of building a web server using Nodejs that serves the request of various functionality.

The requests that the server must attend are the following:

- **/hello** :

Receive by querystring a parameter called name and return a hello name message.

- **/daysBetweenDates**:

Receive by query string 2 parameters date1 and date 2 and calculate the days that are between those two dates.

- **/validatePhoneNumber**:

Receive by querystring a parameter called phoneNumber. Validate phoneNumber with Spanish format, for example +34666777888
if phoneNumber is valid return "valid"
if phoneNumber is not valid return "invalid"

- **/validateSpanishDNI**:

Receive by querystring a parameter called dni and calculate DNI letter

if DNI is valid return "valid"
if DNI is not valid return "invalid"

We will create automated tests to check that the functionality is correctly implemented.
