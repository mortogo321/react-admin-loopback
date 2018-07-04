# react-admin-loopback
The demo of [react-admin](https://github.com/marmelab/react-admin) and [loopback](https://loopback.io) with [mongodb](https://www.mongodb.com/)

### installation
##### loopback
~~~
cd server
yarn or npm install
~~~

##### react-admin
~~~
cd web
yarn npm install
~~~

### run
##### loopback
~~~
cd server
yarn start or node .
~~~

to access api explorer, go to http://localhost:3000/__explorer

##### react-admin
~~~
cd web
yarn start or npm start
~~~

and go to http://localhost:4000  
default user credential

~~~
username: admin
password: *1234#
~~~

you can change port number at `/web/.env` file as
~~~
PORT=4000
~~~

### build
~~~
cd web
yarn build or npm build
~~~

run the command above will build `react-admin` into `/server/client`.