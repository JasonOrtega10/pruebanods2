import { CanActivate, ExecutionContext } from "@nestjs/common";
export declare class AdministratorGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean;
}
