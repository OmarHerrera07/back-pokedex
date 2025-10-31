import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from "@nestjs/common";
import { finalize, Observable } from "rxjs";

@Injectable()
export class LogginInterceptor implements NestInterceptor{

    constructor(){}

    private readonly logger = new Logger(LogginInterceptor.name)

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        
        const startTime = Date.now();
        const ctx = context.switchToHttp();

        const req = ctx.getRequest();

        const {method, url} = req;

        return next.handle().pipe(
            finalize(()=>{
                const elapsed = Date.now() - startTime;
                const res = ctx.getRequest();
                const status  = res?.statusCode ?? 'N/A';
                this.logger.log(`${method} ${url} - ${elapsed}ms - ${status}`);
            })
        )     

    }

    
}