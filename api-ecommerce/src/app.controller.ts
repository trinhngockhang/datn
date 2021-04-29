import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { Get, Controller } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  async root(): Promise<string> {
    const t = 0/0;
    throw new Error('aa');
    const a = await this.test();
    console.log(a);
    return 'Hello World!';
  }
  async test(){
    try {
      return new HttpException('b',403);
    } catch(e){
      console.log('XXXX')
      return new HttpException('a',400);
    }
  }
}