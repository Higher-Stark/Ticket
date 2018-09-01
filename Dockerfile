 # 指定我们的基础镜像是node，版本是v8.0.0
 FROM node:8.0.0
 
 # 将根目录下的文件都copy到container（运行此镜像的容器）文件系统的app文件夹下
 ADD . /app/build
 # cd到app文件夹下
 WORKDIR /app
 Run cd /app

 RUN npm install -g serve
 
 # 容器对外暴露的端口号
 EXPOSE 5000
 
 # 容器启动时执行的命令，类似npm run start
 CMD ["serve", "-s", "build"]
