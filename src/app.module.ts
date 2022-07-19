import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { StudentModule } from './student/student.module';
import { HrModule } from './hr/hr.module';

@Module({
  imports: [AdminModule, StudentModule, HrModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
