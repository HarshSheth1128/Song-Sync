# We're using the node alpine image
FROM node:10

# Create the application directory and set it as the working directory
RUN mkdir -p /usr/src/api/

# Set the working directory
WORKDIR /usr/src/api

# Copy everything over
COPY . .

# Install the dependencies
RUN npm install

# Install nodemon
RUN npm install -g nodemon

# Install knex
RUN npm install -g knex

# Copy the contents of this folder to /api
EXPOSE 80

# Run the app
CMD ["nodemon", "index.js"]

