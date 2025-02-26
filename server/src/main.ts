import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); 
  
  app.enableCors({
    origin: (origin, callback) => {
      // console.log(origin, "Origin...................................");
      // Allow localhost and any IP in the 192.168.0.* range
      const allowedOrigins = [
        'http://localhost:8081', 
        // 'http://192.168.0.17:8081',
        process.env.FRONTEND_URL
      ];

      if(!origin || origin == undefined || origin == null){
        callback(null, true);
        return
      }

      // console.log(process.env.FRONTEND_URL, "FRONTEND_URL...................................");
       
      if (allowedOrigins.includes(origin)) {
        callback(null, true); // Allow the origin
      } else {
        callback(new Error('Not allowed by CORS')); // Reject the origin
      }
    },   
    methods: 'GET,POST,PUT,PATCH,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  });
  await app.listen(3000);
}
bootstrap();
