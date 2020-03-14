FROM node:12-buster-slim

WORKDIR /usr/src/app

COPY package.json .

EXPOSE 8080

# Run the specified command within the container.
CMD [ "yarn", "run", "dev" ]

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .
