import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DrizzleModule } from './drizzle/drizzle.module'; 
import { ConfigModule } from '@nestjs/config';  
import { CarModule } from './cars/cars.module';
import { NumbersModule } from './numbers/numbers.module';
import { PaymentsModule } from './payments/payments.module';
import { UserModule } from './user/user.module';
import { AuthMiddleware } from './middleware/auth.middleware';


@Module({
  imports: [
    DrizzleModule,
    CarModule,  
    NumbersModule,
    PaymentsModule, 
    ConfigModule.forRoot({ isGlobal: true }), NumbersModule, PaymentsModule, UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
}) 

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'api/v1/users', method: RequestMethod.ALL }, // Исключает /api/v1/users
        { path: 'api/v1/users/(.*)', method: RequestMethod.ALL } // Исключает все подмаршруты
      )
      .forRoutes("*");
  }
}