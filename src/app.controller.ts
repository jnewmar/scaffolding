import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  // eslint-disable-next-line no-empty-function
  constructor(private readonly appService: AppService) {}

  @Get('health')
  health(): string {
    return AppService.health();
  }
}
