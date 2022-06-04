import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { CoffeesModule } from '../coffees/coffees.module';
import { CoffeeRatingService } from './coffee-rating.service';

@Module({
  imports: [
    // 示例 可以动态导入一个模块
    // DatabaseModule.register({
    //   type: 'postgres',
    //   host: 'localhost',
    //   password: 'password',
    //   port: 5432,
    // }),
    CoffeesModule,
  ], // 当前module依赖CoffeeModlue， 依赖注入可以注入另一个module, 需要CoffeeModule中exports
  providers: [CoffeeRatingService],
})
export class CoffeeRatingModule {}
