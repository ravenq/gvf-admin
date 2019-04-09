# gvf-admin

[![Build Status](https://travis-ci.org/ravenq/gvf-admin.svg?branch=master)](https://travis-ci.org/ravenq/gvf-admin)

> The admin for the GVF project.

## dev

install dependences.

```sh
yarn
```

config server url in ./config/index.js

```js
export default {
  BASE_API: 'http://localhost:8080/v1',
  UPLOAD_URL: '//upload-z0.qiniup.com/', // see https://developer.qiniu.com/kodo/manual/1671/region-endpoint
  UPLOAD_BASE_URL: 'http://7xjtu1.com1.z0.glb.clouddn.com/'
}
```

run.

```sh
yarn dev
```

## run in node

```sh
yarn build
yarn start
```

## run in pm2

```sh
yarn global add pm2

pm2 start yarn --name "gvf-amdin" -- run start
```

## docker

build

```sh
docker build -t gvf-admin .
```

start a container.

```sh
docker run -d --name gvf-admin -p 9977:9977 gvf-admin
```
