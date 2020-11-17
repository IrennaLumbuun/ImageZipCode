# SimpleUI with HttpRequest

Sends HTTP Post Request to `http://localhost:8081/post` with payload
```json
{
  "base64":"string from form"
}
```

### Project setup
```
npm install
```
### Compiles and hot-reloads for development
```
npm run serve
```
### Compiles and minifies for production
```
npm run build
```
### Lints and fixes files
```
npm run lint
```
### Docker
```
docker build -t someTag . && docker run -p 8080:8080 someTag:latest
```
### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
