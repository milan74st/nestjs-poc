import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PocService } from './poc.service';

@ApiTags('POC nestjs oracle')
@Controller()
export class PocController {
  constructor(private readonly pocService: PocService) {}

  @Post()
  async createRecords(): Promise<any> {
    return await this.pocService.createRecords();
  }
}
