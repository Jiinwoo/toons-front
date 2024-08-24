# Build stage
FROM node:18-alpine as build

WORKDIR /app

# Install yarn
RUN apk add --no-cache yarn

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Set version berry
RUN yarn set version berry

# Install dependencies
RUN yarn install --immutable

# Copy the rest of the application code
COPY . .

# Build the application
RUN yarn run build

# Production stage
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]