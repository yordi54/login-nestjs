import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { mongodbConfig } from 'mongodb.config';
import  { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      mongodbConfig.uri, 
    ),
    UsersModule 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
