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
import { CommittedEntry } from './committedEntry';


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
    }
    export type SignatureTypeEnum = 'KEY_ID' | 'SUPPLIED' | 'SECRET' | 'NONE';
    export const SignatureTypeEnum = {
        KEYID: 'KEY_ID' as SignatureTypeEnum,
        SUPPLIED: 'SUPPLIED' as SignatureTypeEnum,
        SECRET: 'SECRET' as SignatureTypeEnum,
        NONE: 'NONE' as SignatureTypeEnum
    }
    export type RegistrationStateEnum = 'NOT_REGISTERED' | 'PENDING' | 'REGISTERED';
    export const RegistrationStateEnum = {
        NOTREGISTERED: 'NOT_REGISTERED' as RegistrationStateEnum,
        PENDING: 'PENDING' as RegistrationStateEnum,
        REGISTERED: 'REGISTERED' as RegistrationStateEnum
    }
    export type SignatureStateEnum = 'not found' | 'unsigned' | 'invalid' | 'verified';
    export const SignatureStateEnum = {
        NotFound: 'not found' as SignatureStateEnum,
        Unsigned: 'unsigned' as SignatureStateEnum,
        Invalid: 'invalid' as SignatureStateEnum,
        Verified: 'verified' as SignatureStateEnum
    }
}
