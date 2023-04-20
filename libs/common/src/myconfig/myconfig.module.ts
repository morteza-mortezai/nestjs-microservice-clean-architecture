import { DynamicModule, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule, MongooseModuleOptions } from "@nestjs/mongoose";

@Module({})
export class myConfigModule {
    static register(envPath: string): DynamicModule {
        return {
            module: myConfigModule,
            imports: [
                ConfigModule.forRoot({
                    envFilePath: envPath
                }),

            ],
            providers: [
                {
                    provide: 'MY_CONFIG',
                    useFactory(mongoose: MongooseModuleOptions) {

                    },
                    inject: [MongooseModule]
                }
            ]
        }
    }
}