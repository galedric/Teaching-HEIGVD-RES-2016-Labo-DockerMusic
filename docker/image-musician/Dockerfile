FROM node:latest
COPY src /opt/app/
RUN cd /opt/app && npm install
ENTRYPOINT ["node", "/opt/app/musician.js"]
