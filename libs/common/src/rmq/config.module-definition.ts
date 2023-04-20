import { ConfigurableModuleBuilder } from '@nestjs/common';
import { ConfigModuleOptions } from './configModuleOption.interface';
import { RmqOptions } from '@nestjs/microservices';

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
    new ConfigurableModuleBuilder<RmqOptions>().build();