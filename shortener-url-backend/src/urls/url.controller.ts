import { Controller, Get, Param } from '@nestjs/common';
import { URLService } from './url.service';
import { URL } from 'src/graphql.schema';
import { Response } from 'express';
import { Res } from '@nestjs/common';

@Controller('url')
export class URLController {
  private _urlService: URLService | undefined;
  constructor(private urlService: URLService) {
    this._urlService = urlService;
  }
  
  @Get(':extension')
  async findAll(@Param('extension') extension, @Res() res: Response): Promise<string> {
    const result: URL = await this._urlService.findOne(extension);
    res.redirect(result.longURL);
    return ;
  }
}