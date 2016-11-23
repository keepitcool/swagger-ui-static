# swaggerstatic
Local web server for swagger

## Run with node
```
npm install -g swagger-static
swagger-static
```

To change port or root dir
```
npm install -g swagger-static
swagger-static -p 1234 -d ./swaggers_dir
```

## Run with docker
```
docker run -d -p 3000:3000 -v $PWD/swaggers_dir:/files keepitcool/swagger-static
```

To change port or root dir
```
docker run -d -e PORT=4000 -e ROOT_DIR=/my_dir -p 4000:4000 -v $PWD/swaggers_dir:/my_dir keepitcool/swagger-static
```