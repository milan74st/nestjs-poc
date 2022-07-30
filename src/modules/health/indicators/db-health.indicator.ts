/* istanbul ignore file */
import { Injectable } from '@nestjs/common';
import {
  HealthIndicator,
  HealthIndicatorResult,
  HealthCheckError,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';

@Injectable()
export class DbHealthIndicator extends HealthIndicator {
  constructor(private readonly typeOrmHealthIndicator: TypeOrmHealthIndicator) {
    super();
  }

  async isHealthy(key: string): Promise<HealthIndicatorResult> {
    try {
      await this.typeOrmHealthIndicator.pingCheck('TypeOrm DB Check');
      return this.getStatus(key, true);
    } catch (error) {
      console.error('\x1b[31m' + 'TypeOrm DB Check: Database Check failed!' + '\x1b[0m');
      console.error(error);
      console.error(
        '##########################################################################################################################################',
      );
      throw new HealthCheckError('DbHealthIndicator failed', this.getStatus(key, false));
    }
  }
}
