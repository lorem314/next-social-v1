## 重启 mongo 服务

```shell
sudo systemctl start/status/restart/reload mongod
```

## 开启 mongodb 服务

```shell
mongod --dbpath /home/dzy/Documents/mongodb-data/next-social-v1 --bind_ip 0.0.0.0 --port 27017 --replSet rs0
```

## 开启 replicaSet (只运行一次)

default connect to 27017

```shell
mongo
> rs.initiate()
```
