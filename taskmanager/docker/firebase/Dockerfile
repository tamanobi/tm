FROM openjdk:slim

RUN set -ex \
  && apt-get update \
  && apt-get install -y curl \
  && curl -sL https://deb.nodesource.com/setup_16.x | bash \
  && apt-get install -y nodejs \
  && npm install -g firebase-tools
COPY firebase.json firebase.json

CMD firebase emulators:start --project $PROJECTID --token $FIREBASE_TOKEN
