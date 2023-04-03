#FROM mhart/alpine-node:11 AS builder
#WORKDIR /app
#COPY . .

#RUN npm install -g yarn
#RUN yarn
#RUN yarn build

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx

#COPY --from=builder /app/build /usr/share/nginx/html
COPY ./build /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]