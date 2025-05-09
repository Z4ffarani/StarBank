# Production code section

FROM node:18-alpine
RUN apk add --no-cache git
WORKDIR /app
ARG NEXT_PUBLIC_BACKEND_URL
ENV NEXT_PUBLIC_BACKEND_URL=${NEXT_PUBLIC_BACKEND_URL}
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]


# Development code section

# FROM node:18-alpine
# RUN apk add --no-cache git
# WORKDIR /app
# ARG NEXT_PUBLIC_BACKEND_URL
# ENV NEXT_PUBLIC_BACKEND_URL=${NEXT_PUBLIC_BACKEND_URL}
# COPY package.json ./
# RUN npm install
# COPY . .
# EXPOSE 3000