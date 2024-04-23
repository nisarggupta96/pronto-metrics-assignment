# Metrics Aggregation

### Architecture

<img src="https://cdn.discordapp.com/attachments/1029157532960313344/1232379858211049472/Screenshot_2024-04-23_at_10.47.25_PM.png?ex=66293eae&is=6627ed2e&hm=45f29e707deadd924dbae974f34a387281c84978e4b9161f7c2040838321e5d6&">

### Tech Stack

Server (Python):
zmq, FastAPI (uvicorn), multiprocessing, sse_starlette

Client (React - Vite):
Chakra-UI, EventSource (listener), react-leaflet, react-leaflet-tracking-marker

### Steps to run

1. InfluxDB

```
docker run \
 --name influxdb2 \
 --publish 8086:8086 \
 --mount type=volume,source=influxdb2-data,target=/var/lib/influxdb2 \
 --mount type=volume,source=influxdb2-config,target=/etc/influxdb2 \
 --env DOCKER_INFLUXDB_INIT_MODE=setup \
 --env DOCKER_INFLUXDB_INIT_USERNAME=ADMIN_USERNAME \
 --env DOCKER_INFLUXDB_INIT_PASSWORD=ADMIN_PASSWORD \
 --env DOCKER_INFLUXDB_INIT_ORG=ORG_NAME \
 --env DOCKER_INFLUXDB_INIT_BUCKET=METRICS \
 --env DOCKER_INFLUXDB_INIT_RETENTION=30d \
 --env DOCKER_INFLUXDB_INIT_ADMIN_TOKEN=my-super-secret-auth-token \
 influxdb:2

```

2. Log in to InfluxDB UI with credentials and get the API token and set that in server environment/configuration

```
export INFLUXDB_TOKEN={TOKEN_VALUE}
```

3. To run the Python server, run the following command after installing the libraries - influxdb_client, fastapi, uvicron, sse_starlette

```
python main.py
```

4. To run the client, run the following command

```
cd client/metrics/client
npm install
npm run dev
```

### To Do / Improvements

1. Tests (Unit tests, Integration tests)
2. Packaging (Docker, K8s)

3. Server

    - Deal with bad data (Cleaning)
    - Graceful error handling
    - Separate data gathering from API server (Shared synchronized data store)
    - Distributed processing (MapReduce based stream analysis)
    - Caching layer between server and clients to support more socket connections

4. Client
    - Error handling (Server failure, bad data)
    - Performance improvement (Bandwidth consumed)
    - UI Improvements (Responsive)
    - Configurable data refresh rate (Mobile users)
