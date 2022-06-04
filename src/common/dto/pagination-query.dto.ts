import { Type } from 'class-transformer';
import { IsOptional, IsPositive } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional() // 可选值
  @IsPositive() // 如果是正数， 则大于0
  @Type(() => Number) // 将传输过来的字符串转为数字
  limit: number;

  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  offset: number;
}
