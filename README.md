```
// mongodb
// sudo systemctl start/status/restart/reload mongod
// mongod --dbpath /home/dzy/Documents/mongodb-data/next-social-v1 --bind_ip 0.0.0.0 --port 27017 --replSet rs0
// default connect to 27017
// mongo
//   > rs.initiate()
```

run `npx prisma db push` to add indexes

```
Environment variables loaded from .env
Prisma schema loaded from prisma/schema.prisma
Datasource "db": MongoDB database "next-social-v1" at "localhost:27017"
Applying the following changes:

[+] Unique index `User_email_key` on ({"email":1})


🚀  Your database indexes are now in sync with your Prisma schema. Done in 142ms

✔ Generated Prisma Client (v5.12.1) to ./node_modules/@prisma/client in 56ms


```
