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

/**
 * Content existence request
 */
export interface ContentRequest {
    /**
     * When CLIENT is supplied the content should already have been hashed by you. When SERVER is supplied we will hash the content. Please note that we do not validate the hash when you supply it
     */
    hashProvider: ContentRequest.HashProviderEnum;
    /**
     * The content to register in base64.
     */
    content: string;
}
export namespace ContentRequest {
    export type HashProviderEnum = 'SERVER' | 'CLIENT';
    export const HashProviderEnum = {
        SERVER: 'SERVER' as HashProviderEnum,
        CLIENT: 'CLIENT' as HashProviderEnum
    };
}