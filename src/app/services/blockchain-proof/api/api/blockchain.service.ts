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
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent }                           from '@angular/common/http';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';

import { Observable }                                        from 'rxjs/Observable';

import { ErrorResponse } from '../model/errorResponse';
import { VerifyNodesRequest } from '../model/verifyNodesRequest';
import { VerifyNodesResponse } from '../model/verifyNodesResponse';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class BlockchainService {

    protected basePath = 'https://triall.dev.sphereon.com/agent/alfresco-blockchain/';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (let consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }


    /**
     * Verify alfresco entries
     * Performs verification on the blockchain for the given node entry id&#39;s.
     * @param nodeIds verifyNodesRequest
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public verifyEntries(nodeIds: VerifyNodesRequest, observe?: 'body', reportProgress?: boolean): Observable<VerifyNodesResponse>;
    public verifyEntries(nodeIds: VerifyNodesRequest, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<VerifyNodesResponse>>;
    public verifyEntries(nodeIds: VerifyNodesRequest, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<VerifyNodesResponse>>;
    public verifyEntries(nodeIds: VerifyNodesRequest, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (nodeIds === null || nodeIds === undefined) {
            throw new Error('Required parameter nodeIds was null or undefined when calling verifyEntries.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json;charset=UTF-8'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
            'application/json;charset=UTF-8'
        ];
        let httpContentTypeSelected:string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set("Content-Type", httpContentTypeSelected);
        }

        return this.httpClient.post<VerifyNodesResponse>(`${this.basePath}/alfresco-blockchain/verify/entries`,
            nodeIds,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}