# WMS Rocketseat Hackathon
  
## Overview
This project is developed with the intent to be submitted into the first Rocketseat Hackathon.

We're developing one WMS(Warehouse Management System).

## Installation & Running
First of all, you will need nodeJS and docker in their latest versions.

You will need to install the project dependencies, with:
```shell
yarn OR npm install
```

The app is shipped with docker, so running our docker-compose script will install the project Database and keep it running until downed.
To install docker compose, run:
```shell
docker-compose up -d
```

After the docker-compose execution, the project will be running at: **http://localhost:3333**
Make sure that this port is available
