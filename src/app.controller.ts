import { Controller, Get, HttpCode } from '@nestjs/common';
// appserver的作用是将业务逻辑与Controller分离
import { AppService } from './app.service';

// controller 用于处理请求
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  // 可以通过HttpCode中修改响应code
  // @HttpCode(202)
  // 如果响应要要脱离nest框架标准， 可以使用@res()
  getHello(): string {
    return this.appService.getHello();
  }
}
