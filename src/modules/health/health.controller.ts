/* istanbul ignore file */
import { Controller, Get } from '@nestjs/common';
import { ApiInternalServerErrorResponse, ApiTags } from '@nestjs/swagger';
import { HealthCheck, HealthCheckService } from '@nestjs/terminus';
import { DbHealthIndicator } from './indicators/db-health.indicator';

@ApiTags('Health Check')
@Controller('health-check')
class HealthController {
  constructor(private healthCheckService: HealthCheckService, private dbHealthIndicator: DbHealthIndicator) {}

  @Get()
  @HealthCheck()
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  check() {
    return this.healthCheckService.check([() => this.dbHealthIndicator.isHealthy('TypeOrm DB Check')]);
  }
}

export default HealthController;
