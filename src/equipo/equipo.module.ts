import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";
import { ShinyMiddleware } from "src/shiny/shiny.middleware";
import { EquipoService } from "./equipo.service";
import { EquipoController } from "./equipo.controller";

@Module({
    controllers: [EquipoController], 
    providers: [EquipoService]
})

export class EquipoModule{
    configure(consumer: MiddlewareConsumer){
        consumer.apply(ShinyMiddleware)
        // .exclude({ path: 'equipo', method: RequestMethod.GET })
        // .forRoutes(EquipoController)
        .forRoutes({ path: 'equipo', method: RequestMethod.ALL });
    }


}