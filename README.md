# Deployment guidelines
## Development
Start in development with the guidelines in each project.

## Prodution
### Back-end
#### Deploy back-end with Docker
Build: 
`docker-compose build`

Run: `docker-compose up -d`
### Front-end
We need to build one website at a time.  
To build a website, cd each website and run `npm run build`  
And then using a web server such as Nginx or Apache to render static file.