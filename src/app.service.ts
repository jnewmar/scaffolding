import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  static health(): string {
    return 'OK';
  }
}
