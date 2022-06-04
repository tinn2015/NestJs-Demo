import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Flavor } from './flavor.entity';

// 每个@Entity 对应着一个数据库表， 这里会生成一个coffee表
@Entity() // sql table === 'coffee'
export class Coffee {
  @PrimaryGeneratedColumn() // 主键， 生成自增id
  id: number;

  @Column() // 生成列
  name: string;

  @Column({ nullable: true }) // 可以为null
  description: string;

  @Column()
  brand: string;

  @Column({ default: 0 })
  recommendations: number;

  // @Column('json', { nullable: true }) // 存json格式数据， 且可为空
  @JoinTable()
  @ManyToMany((type) => Flavor, (flavor) => flavor.coffees, {
    cascade: true,
  })
  flavors: Flavor[];
}
