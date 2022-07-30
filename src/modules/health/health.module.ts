/* istanbul ignore file */
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import HealthController from './health.controller';
import { DbHealthIndicator } from './indicators/db-health.indicator';

@Module({
  imports: [TerminusModule, HttpModule],
  controllers: [HealthController],
  providers: [DbHealthIndicator],
})
export class HealthModule {}
