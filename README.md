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

1. Add event sourcing (will be on a different branch) - DONE!
2. Add event bus like Kafka for interservice communication (will be on a different branch)
3. Add a caching service like redis (will be on a different branch)
