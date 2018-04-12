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
 * With the Blockchain Proof API it is easy to prove or disprove existence of data at a certain point in time.
 * Behind the scenes it stores entries using the Factom (bitcoin), Multichain or Ethereum blockchain by means of our generic blockchain API.
 * The flow is generally as follows:  1. Make sure a configuration is present  2. Register content by uploading a file, some content,
 * or providing a Stream Location from the Storage API. When you upload content you have to tell the API whether the data has already been
 * hashed or not. If not, or when uploading a file or stream location, the API will take care of the hashing  3. Verify content by uploading
 * a file, some content, or providing a Stream Location from the Storage API. When you upload content you have to tell the API whether
 * the data has already been hashed or not. If not, or when uploading a file or stream location, the API will take care of the hashing.
 * You will get back whether the content has been registered previously or not
 * Full API Documentation: https://docs.sphereon.com/api/blockchain-proof/0.10/html  Interactive testing: A web based test console
 * is available in the Sphereon API Store at https://store.sphereon.com
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
 * Committed Chain
 */
export interface CommittedChain {
    /**
     * Chain Id
     */
    chainId?: string;
    /**
     * The context
     */
    context?: string;
}