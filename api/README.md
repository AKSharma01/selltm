# Nodejs with mongodb and MSG91 API integration 

[![Nodejs version](https://img.shields.io/badge/nodejs-9.11.1-blue.svg)](https://nodejs.org/en/blog/release/v9.11.1/) [![NPM](https://img.shields.io/badge/npm-6.4.1-skyblue.svg)](https://www.npmjs.com/package/npm/v/6.4.1) [![Babel](https://img.shields.io/badge/babel--cli-6.26.0-green.svg)](https://www.npmjs.com/package/babel-cli)

Register new user with valid phone no using MSG91 api 



__Table of content__
    
- [Install](#install)
- [Local WorkSpace](#local-workspace)
- [Authors](#authors)


# Install
> Pre-requirement
**node.js**, **loopback**, **mongodb**

#### Install The Node.Js And NMP Packages On Ubuntu 16.04 / 18.04 LTS
```sh
>>> sudo curl -sL https://deb.nodesource.com/setup_9.x -o nodesource_setup.sh
>>> sudo bash nodesource_setup.sh
>>> sudo apt-get install nodejs
>>> nodejs -v
v9.11.1
```
#### Install latest version of NPM
```sh
>>> npm install -g npm@6.4.1
>>> npm -v
6.4.1
```
#### Install [Loopback](https://loopback.io/doc/en/lb3/)
```sh
>>> npm install -g loopback-cli
```
#### Install latest version of [MongoDB](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/) for Ubuntu 16.04 (Xenial)
```sh
>>> sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 9DA31620334BD75D9DCB49F368818C72E52529D4
>>> echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/4.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.0.list
>>> sudo apt-get update
>>> sudo apt-get install -y mongodb-org
>>> sudo mkdir /data/db -p
>>> sudo service mongodb status
Active: active (running)
```

## Local WorkSpace
 ```sh
 >>> sudo git clone https://github.com/AKSharma01/selltm.git
 >>> cd selltm
 >>> sudo npm install (to install project dependencies)
 >>> sudo npm run start
Web server listening at: http://localhost:7000
Browse your REST API at http://localhost:7000/explorer
 ```
## Postman
```sh
>>> link : https://www.getpostman.com/collections/3290fdb3c425d440c4a6
```

 # Authors
 - Akash Kumar Sharma ([github.com/AKSharma01](https://github.com/Aakashsharma9))
 

 
