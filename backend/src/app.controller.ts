import { Controller, Get,  InternalServerErrorException,
} from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return 'AHOP backend';
  }

  @Get('health')
  getHealth() {
    return {
      status: 'UP',
    };
  }

  @Get('version')
  getVersion() {
    return {
      version: process.env.APP_VERSION ?? 'local',
    };
  }

  @Get('fail')
  getFail() {
    throw new InternalServerErrorException("Controlled production failure")
  }
}