# We're using the node alpine image
FROM node:10

# Create the application directory and set it as the working directory
RUN mkdir -p /usr/src/ui/

# Set the working directory
WORKDIR /usr/src/ui

# Copy everything over
COPY . .

ENV PATH /usr/src/ui/node_modules/.bin:$PATH

# Install the dependencies
RUN npm install
RUN npm install react-scripts@3.0.1 -g --silent

EXPOSE 80

# Run the app
CMD ["npm", "start"]
