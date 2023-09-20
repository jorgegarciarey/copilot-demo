# Create a dockerfile with node image
# Create a directory to hold the application code inside the image, this will be the working directory for your application
# Set the working directory to /usr/src/app
# Copy package.json and package-lock.json to the working directory
# Install npm
# Copy the current directory contents into the container at /usr/src/app
# Make port 3000 available to the world outside this container
# Run Nodeserver.js when the container launches
# Write a docker comand to build the image and tag it as mynodeapp

FROM node:latest
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "node", "nodeserver.js" ]




