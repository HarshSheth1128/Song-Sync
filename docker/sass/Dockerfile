# We're using the node alpine image
FROM node:10

# Create the application directory and set it as the working directory
RUN mkdir -p /usr/src/ui/src

# Set the working directory
WORKDIR /usr/src/ui


RUN apt-get update && \
    apt-get -y install sudo

RUN sudo chmod -R 775 /usr/local/lib/node_modules/

ENV PATH /usr/local/lib/node_modules/node-sass/bin:$PATH

# Install the dependencies
RUN npm install -g node-sass --unsafe-perm

RUN ls -a /usr/local/lib/node_modules/node-sass/bin
RUN which node-sass

EXPOSE 80

# Run the app
CMD ["node-sass", "--watch", "src/styles/scss", "-o", "src/styles/css"]
