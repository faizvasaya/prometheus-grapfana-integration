# Prometheus Grafana Integration with NodeJS APIs

This repository demonstrates how to integrate prometheus and grafana in a NodeJS HTTP API to monitor APIs for
reliability and uptime.

[![NodeJS](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/en/) [![Prometheus](https://img.shields.io/badge/Prometheus-000000?style=for-the-badge&logo=prometheus&labelColor=000000)](https://prometheus.io/) [![Grafana](https://img.shields.io/badge/Grafana-F2F4F9?style=for-the-badge&logo=grafana&logoColor=orange&labelColor=F2F4F9
)](https://grafana.com/) [![ExpressJS](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/) [![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)](https://www.javascript.com/) [![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white
)](https://www.docker.com/) [![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white
)](https://www.npmjs.com/)


## Architecture
Fololowing is the architecture of the application.
[![Architecure Diagram](https://raw.githubusercontent.com/faizvasaya/prometheus-grapfana-integration/main/architecture.jpg)](https://raw.githubusercontent.com/faizvasaya/prometheus-grapfana-integration/main/architecture.jpg)

- cAdvisor (Container Advisor) provides container users an understanding of the resource usage and performance characteristics of their running containers. It is a running daemon that collects, aggregates, processes, and exports information about running containers. 
- Prometheus collects container monitoring metrics from cadvisor and custom metrics form NodeJS Http /metrics endpoint every 5 seconds and stores it.
- The Grafana visualization service then pulls the data from prometheus for the purpose of metrics visualization.

## Environment setup

- Install Docker
- Clone the repository
- Run `npm install`
- Run `npm run start`
- Go to following URL from your browser to confirm that the APIs are running: `http://localhost:3001/flip-coins?times=100`
- Run `docker-compose up --build`
- Hit the following URL 5-10 times: `http://localhost:3001/flip-coins?times=100` 
- Wait for 5 seconds and then goto the following URL: `http://localhost:3000/?orgId=1`. Here you should be able to see the grafana dashboard.

## Grafana Dashboard
[![Dashboard](https://raw.githubusercontent.com/faizvasaya/prometheus-grapfana-integration/main/Dashboard.png)](https://raw.githubusercontent.com/faizvasaya/prometheus-grapfana-integration/main/Dashboard.png)

- The above dashboard shows the following metrics:
    - Tails per flip
    - Heads per flip
    - Flips per minute
    - Uptime of the API

## Author

Faizal Vasaya

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/faizalvasaya/) [![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/FaizalVasaya)

## License

MIT

**Free Software, Hell Yeah!**