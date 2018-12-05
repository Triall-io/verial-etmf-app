/**
 * Triall Agent for Alfresco API's
 * This is an API containing functions for blockchain integration with Alfresco.  
 *
 * OpenAPI spec version: 0.1
 * Contact: dev@sphereon.com
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */


/**
 * An error
 */
export interface ModelError {
    code: string;
    level: ModelError.LevelEnum;
    cause?: Error;
    message: string;
}
export namespace ModelError {
    export type LevelEnum = 'INFO' | 'WARNING' | 'FATAL';
    export const LevelEnum = {
        INFO: 'INFO' as LevelEnum,
        WARNING: 'WARNING' as LevelEnum,
        FATAL: 'FATAL' as LevelEnum
    }
}