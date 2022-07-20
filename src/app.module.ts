import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { StudentModule } from './student/student.module';
import { HrModule } from './hr/hr.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import dbConfiguration from './config/db.config';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [dbConfiguration],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        ...configService.get('database'),
      }),
    }),
    AdminModule,
    StudentModule,
    HrModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
