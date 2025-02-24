docker build -t shoh2025/taxi-backend:1.0.0 .
docker tag shoh2025/taxi-backend:1.0.0 shoh2025/taxi-backend:1.0.0
docker push shoh2025/taxi-backend:1.0.0

docker build -f Dockerfile.web -t shoh2025/taxi-web-app:1.0.0 .
docker tag shoh2025/taxi-web-app:1.0.0 shoh2025/taxi-web-app:1.0.0
docker push shoh2025/taxi-web-app:1.0.0

docker build -f Dockerfile.pg -t shoh2025/taxi-pg:1.0.0 .
docker tag shoh2025/taxi-pg:1.0.0 shoh2025/taxi-pg:1.0.0
docker push shoh2025/taxi-pg:1.0.0