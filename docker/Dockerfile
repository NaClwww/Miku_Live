# 使用官方的 Nginx 镜像作为基础镜像
FROM nginx:alpine

# 安装依赖
RUN apk update && apk add --no-cache bash

# 将构建的文件复制到 Nginx 的默认静态文件目录
COPY build /usr/share/nginx/html

# 复制自定义的 Nginx 配置文件
COPY nginx.conf /etc/nginx/nginx.conf

# 暴露端口 8880
EXPOSE 8880

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]
