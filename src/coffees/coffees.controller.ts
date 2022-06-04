import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Patch,
  Delete,
  Inject,
  UsePipes,
  SetMetadata,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { ValidationPipe } from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';
import { ParseIntPipe } from '../common/pipes/parse-int.pipe';

// @UsePipes(ValidationPipe) // 这个pipe只对当前controller有效
@Controller('coffees')
export class CoffeesController {
  constructor(
    private readonly coffeesService: CoffeesService,
    @Inject(REQUEST) private readonly request: Request, // 注入请求可以获得请求头、cookie等
  ) {
    console.log('CoffeeController created');
  }

  // @UsePipes(ValidationPipe) // 这个pipe只对当前方法有效
  // @SetMetadata('isPublic', true) // 将该路由设置为公共路由， 无需经过权限认证
  @Public() // 自己封装一个装饰器
  @Get()
  async findAll(@Query() paginationQuery: PaginationQueryDto) {
    // 模拟请求超时
    // await new Promise((resolve) => setTimeout(resolve, 5000));
    return this.coffeesService.findAll(paginationQuery);
  }

  @Get(':id')
  // ParseIntpipe是一个自定义pipe
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.coffeesService.findOne(parseInt(id));
  }

  @Post()
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    console.log('createCoffeeDto', createCoffeeDto instanceof CreateCoffeeDto);
    return this.coffeesService.create(createCoffeeDto);
  }

  @Patch(':id')
  // @Body(ValidationPipe) 这样可以只用于验证body参数
  update(@Param('id') id: string, @Body() updateCoffeeDto: UpdateCoffeeDto) {
    console.log('updateCoffeeDto', updateCoffeeDto);
    return this.coffeesService.update(parseInt(id), updateCoffeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coffeesService.remove(parseInt(id));
  }
}
