# Microservices Demo

To run this demo make sure you have `docker-compose` installed.

To start:

```
cd web/webapp
npm install
npm run build
```

Then from project root directory:

```
docker-compose up [-d]
```

### Future Plans

1. Add event bus like Kafka (will be on a different branch)
2. Add a caching service like redis (will be on a different branch)
