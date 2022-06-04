import { Module } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import { Event } from '../events/entities/event.entity';
import { COFFEE_BRANDS } from './coffees.constants';
import { ConfigModule } from '@nestjs/config';

class ConfigService {}
class DevelopmentConfigService {}
class ProductionConfigService {}

// module装饰器 可以传controllers, exports, imports, providers
@Module({
  // 注入ConfigModule, 可以在依赖的service中通过ConfigModule获取环境配置
  imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event]), ConfigModule],
  controllers: [CoffeesController],
  providers: [
    CoffeesService,
    { provide: COFFEE_BRANDS, useValue: ['buddy brew', 'nescafe'] }, // useValue
    {
      provide: ConfigService, // 通过useClass可以动态的注入
      useClass:
        process.env.NODE_ENV === 'development'
          ? DevelopmentConfigService
          : ProductionConfigService,
    },
    // 还可以通过useFactor
    // { provide: COFFEE_BRANDS, useFactory: () => ['buddy brew', 'nescafe'] },
  ],

  // providers: [{provide: CoffeesService, useValue: new MockCoffeeService()}], // 通过useValue的方式可以替换CoffeesService的值
  exports: [CoffeesService],
})
export class CoffeesModule {}
