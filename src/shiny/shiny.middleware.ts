import { Injectable, NestMiddleware } from "@nestjs/common";

@Injectable()
export  class ShinyMiddleware implements NestMiddleware{
    use(req: any, res: any, next: (error?: any) => void) {
        const chance = Math.floor(Math.random() * 5)
        req['shinyFound'] = chance === 1;
        if(req['shinyFound']) {
            console.log("Obtuviste un pokemon Shiny 😺👾 ")
        }
        next();
    }

}