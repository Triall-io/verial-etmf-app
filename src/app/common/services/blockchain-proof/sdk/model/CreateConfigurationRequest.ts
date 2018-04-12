/*!
 * @license
 * Copyright 2016 Alfresco Software, Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Blockchain Proof
 *
 * OpenAPI spec version: 0.10
 * Contact: dev@sphereon.com
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
/* tslint:disable */

import { ChainSettings } from './ChainSettings';

/**
 * Create a context configuration
 */
export interface CreateConfigurationRequest {
    /**
     * The initial context settings.
     */
    initialSettings: ChainSettings;
    /**
     * The Easy Blockchain API context. This has to be a context you created or a public context
     */
    context: string;
    /**
     * The configuration name.
     */
    name: string;
    /**
     * The access mode for this configuration. Public means accessible to other tenants of the API as well. Currently public is only allowed for Sphereon itself
     */
    accessMode: CreateConfigurationRequest.AccessModeEnum;
}
export namespace CreateConfigurationRequest {
    export type AccessModeEnum = 'PUBLIC' | 'PRIVATE';
    export const AccessModeEnum = {
        PUBLIC: 'PUBLIC' as AccessModeEnum,
        PRIVATE: 'PRIVATE' as AccessModeEnum
    };
}