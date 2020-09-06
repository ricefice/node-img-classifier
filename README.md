# ***node-img-classifier***

**Node Img Classifier** microservice takes image via file upload or remote url and show predictions for the object in image using tensorflow models

## Installation

```nvm i 12.18```

```npm i```

## Run

```npm start```

## Endpoints

| method |               request path               |    request body     |                                                        response                                                        |
| ------ | :--------------------------------------: | :-----------------: | :--------------------------------------------------------------------------------------------------------------------: |
| GET    | /classify/{remote_url}/{model}/{version} |         N/A         | `{"success":true,"code":200,"predictions":[{"className":"panda...","probability":0.9995842576026917}], errors: []...}` |
| POST   |                /classify                 | multipart/form-data |                                                        as above                                                        |

## Docker

build

```docker build -t img-classifier .```

run

```docker run -p 3001:3001 -d img-classifier```

## K8s

coming soon xx

### Supported Models

- mobilenet v1

### Licensing

MIT
