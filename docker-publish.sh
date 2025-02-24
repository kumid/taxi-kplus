docker build -t shoh2025/nestjs-app:1.0.0 .
docker tag shoh2025/nestjs-app:1.0.0 shoh2025/nestjs-app:1.0.0
docker push shoh2025/nestjs-app:1.0.0

docker build -f Dockerfile.web -t shoh2025/expo-web-app:1.0.0 .
docker tag shoh2025/expo-web-app:1.0.0 shoh2025/expo-web-app:1.0.0
docker push shoh2025/expo-web-app:1.0.0

docker build -f Dockerfile.pg -t shoh2025/postgres:1.0.0 .
docker tag shoh2025/postgres:1.0.0 shoh2025/postgres:1.0.0
docker push shoh2025/postgres:1.0.0