import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ApiKeyGuard } from './common/guards/api-key.guard';
import { WrapResponseInterceptor } from './common/interceptors/wrap-response.interceptor';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    //这就是一个pipe
    new ValidationPipe({
      whitelist: true, // 确保无效的属性都会被剥离或者删除
      forbidNonWhitelisted: true, // 存在非白名单属性时停止处理请求选项， 抛出错误
      transform: true, // 将收到的数据格式转为DTO期望的， 还可以自动转换类型
      // transformOptions: {
      //   enableImplicitConversion: true // 这个属性可以自动推导类型， 不用再通过@Type()指定类型
      // }
    }),
  );
  // 对http 请求 响应做拦截处理
  app.useGlobalFilters(new HttpExceptionFilter());
  //添加路由守卫
  // app.useGlobalGuards(new ApiKeyGuard());
  // 拦截器
  app.useGlobalInterceptors(
    new WrapResponseInterceptor(),
    new TimeoutInterceptor(),
  );

  // 生成api文档
  const options = new DocumentBuilder()
    .setTitle('Iluvcoffee')
    .setDescription('Coffee App')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
