### 静态文件部署

FROM alpine:3.10
WORKDIR /mysite
RUN apk add --update npm 
# RUN apk add nginx && apk add --update npm 
COPY package.json package-lock.json nginx.conf .npmrc /mysite/
RUN npm install
# RUN npm install && mv -f ./nginx.conf /etc/nginx/conf.d/ && rm -f /etc/nginx/conf.d/default.conf
COPY . /mysite/
RUN npm run build && rm -rf node_modules && mkdir -p /run/nginx
# CMD nginx -g 'daemon off;'

################

### nodejs服务部署

# FROM alpine:3.10
# WORKDIR /mysite
# # RUN apk add nginx && mv -f ./nginx.conf /etc/nginx/conf.d/ && rm -f /etc/nginx/conf.d/default.conf
# COPY . /mysite/
# RUN node ./server/server.js
# # CMD nginx -g 'daemon off;'

############