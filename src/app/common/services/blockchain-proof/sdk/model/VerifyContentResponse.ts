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

import { CommittedEntry } from './CommittedEntry';

/**
 * Verify Content response
 */
export interface VerifyContentResponse {
    /**
     * This is the first registration time from the singleProofChain or the perHashProofChain
     */
    registrationTime?: Date;
    contextName: string;
    /**
     * This is the single proof chain where all hashes are stored in a single chain (if configured)
     */
    singleProofChain?: CommittedEntry;
    /**
     * A set of content registration targets
     */
    contentRegistrationChainTypes: Array<VerifyContentResponse.ContentRegistrationChainTypesEnum>;
    /**
     * The signature type from the request or the default from the settings
     */
    signatureType: VerifyContentResponse.SignatureTypeEnum;
    /**
     * This is the proof chain specific for the current hash, so a chain per hash (if configured)
     */
    perHashProofChain?: CommittedEntry;
    requestId?: string;
    /**
     * The calculated signature in base64 form
     */
    base64Signature: string;
    /**
     * This is the registration state from the singleProofChain or the perHashProofChain. If one of the chains has a registration this will return REGISTERED
     */
    registrationState?: VerifyContentResponse.RegistrationStateEnum;
    /**
     * This is the signature state.
     */
    signatureState?: VerifyContentResponse.SignatureStateEnum;
    /**
     * The hash in base64 format that you supplied or that was calculated. This is the actual hash for the content
     */
    hash: string;
    /**
     * This is a message describing the signature state.
     */
    signatureStateMessage?: string;
    /**
     * The calculated signature in hex form
     */
    hexSignature: string;
}
export namespace VerifyContentResponse {
    export type ContentRegistrationChainTypesEnum = 'PER_HASH_PROOF_CHAIN' | 'SINGLE_PROOF_CHAIN';
    export const ContentRegistrationChainTypesEnum = {
        PERHASHPROOFCHAIN: 'PER_HASH_PROOF_CHAIN' as ContentRegistrationChainTypesEnum,
        SINGLEPROOFCHAIN: 'SINGLE_PROOF_CHAIN' as ContentRegistrationChainTypesEnum
    };
    export type SignatureTypeEnum = 'KEY_ID' | 'SUPPLIED' | 'SECRET' | 'NONE';
    export const SignatureTypeEnum = {
        KEYID: 'KEY_ID' as SignatureTypeEnum,
        SUPPLIED: 'SUPPLIED' as SignatureTypeEnum,
        SECRET: 'SECRET' as SignatureTypeEnum,
        NONE: 'NONE' as SignatureTypeEnum
    };
    export type RegistrationStateEnum = 'NOT_REGISTERED' | 'PENDING' | 'REGISTERED';
    export const RegistrationStateEnum = {
        NOTREGISTERED: 'NOT_REGISTERED' as RegistrationStateEnum,
        PENDING: 'PENDING' as RegistrationStateEnum,
        REGISTERED: 'REGISTERED' as RegistrationStateEnum
    };
    export type SignatureStateEnum = 'not found' | 'unsigned' | 'invalid' | 'verified';
    export const SignatureStateEnum = {
        NotFound: 'not found' as SignatureStateEnum,
        Unsigned: 'unsigned' as SignatureStateEnum,
        Invalid: 'invalid' as SignatureStateEnum,
        Verified: 'verified' as SignatureStateEnum
    };
}
