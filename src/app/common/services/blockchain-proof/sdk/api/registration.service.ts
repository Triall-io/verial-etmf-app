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

import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { CustomHttpUrlEncodingCodec } from '../encoder';

import { Observable } from 'rxjs';

import { ContentRequest } from '../model/ContentRequest';
import { RegisterContentResponse } from '../model/RegisterContentResponse';
import { StreamLocation } from '../model/StreamLocation';

import { BASE_PATH } from '../variables';
import { ApiClientConfiguration } from '../configuration';

@Injectable()
export class RegistrationService {

    protected basePath = 'https://gw.api.cloud.sphereon.com/blockchain/proof/0.10';
    public defaultHeaders = new HttpHeaders();
    public configuration = new ApiClientConfiguration();

    constructor(protected httpClient: HttpClient, @Optional() @Inject(BASE_PATH) basePath: string, @Optional() configuration: ApiClientConfiguration) {
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
     * Register content
     * Register content. Please provide the content in the request. You also have to provide whether you have hashed the content yourself, or whether is should be done on the server side
     * @param configName The configuration name this operation
     * @param existence Register content using the current settings
     * @param requestId Optional request id
     * @param base64Secret An alternate secret key in base64 format that overrides the value in your configuration.
     * @param suppliedSignature An alternate supplied Signature in base64 format that overrides the signature generation.
     * @param keyId An alternate crypto keys API id that will be used for signature generation.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public registerUsingContent(configName: string, existence: ContentRequest, requestId?: string, base64Secret?: string, suppliedSignature?: string, keyId?: string, observe?: 'body', reportProgress?: boolean): Observable<RegisterContentResponse>;
    public registerUsingContent(configName: string, existence: ContentRequest, requestId?: string, base64Secret?: string, suppliedSignature?: string, keyId?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<RegisterContentResponse>>;
    public registerUsingContent(configName: string, existence: ContentRequest, requestId?: string, base64Secret?: string, suppliedSignature?: string, keyId?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<RegisterContentResponse>>;
    public registerUsingContent(configName: string, existence: ContentRequest, requestId?: string, base64Secret?: string, suppliedSignature?: string, keyId?: string, observe: any = 'body', reportProgress: boolean = false): Observable<any> {
        if (configName === null || configName === undefined) {
            throw new Error('Required parameter configName was null or undefined when calling registerUsingContent.');
        }
        if (existence === null || existence === undefined) {
            throw new Error('Required parameter existence was null or undefined when calling registerUsingContent.');
        }

        let headers = this.defaultHeaders;
        if (requestId !== undefined && requestId !== null) {
            headers = headers.set('requestId', String(requestId));
        }
        if (base64Secret !== undefined && base64Secret !== null) {
            headers = headers.set('base64Secret', String(base64Secret));
        }
        if (suppliedSignature !== undefined && suppliedSignature !== null) {
            headers = headers.set('suppliedSignature', String(suppliedSignature));
        }
        if (keyId !== undefined && keyId !== null) {
            headers = headers.set('keyId', String(keyId));
        }

        // authentication (oauth2schema) required
        if (this.configuration.accessToken) {
            let accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json;charset=UTF-8'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
            'application/json;charset=UTF-8'
        ];
        let httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.put<RegisterContentResponse>(`${this.basePath}/existence/${encodeURIComponent(String(configName))}/content`,
            existence,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Register hash using the Storage API
     * Register a hash of file/blob by supplying a Stream location of the Storage API. This Stream Location maps to a location of a file/blob on some remote cloud storage. Hashing will be done on the server side Please note that the binary data itself will not be stored, only the hash. Use the registerUsingContent endpoint if you&#39;d like to store content
     * @param configName The configuration name this operation
     * @param streamLocation The stream locations on storage
     * @param requestId Optional request id
     * @param base64Secret An alternate secret key in base64 format that overrides the value in your configuration.
     * @param suppliedSignature An alternate supplied Signature in base64 format that overrides the signature generation.
     * @param keyId An alternate crypto keys API id that will be used for signature generation.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public registerUsingLocation(configName: string, streamLocation: StreamLocation, requestId?: string, base64Secret?: string, suppliedSignature?: string, keyId?: string, observe?: 'body', reportProgress?: boolean): Observable<RegisterContentResponse>;
    public registerUsingLocation(configName: string, streamLocation: StreamLocation, requestId?: string, base64Secret?: string, suppliedSignature?: string, keyId?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<RegisterContentResponse>>;
    public registerUsingLocation(configName: string, streamLocation: StreamLocation, requestId?: string, base64Secret?: string, suppliedSignature?: string, keyId?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<RegisterContentResponse>>;
    public registerUsingLocation(configName: string, streamLocation: StreamLocation, requestId?: string, base64Secret?: string, suppliedSignature?: string, keyId?: string, observe: any = 'body', reportProgress: boolean = false): Observable<any> {
        if (configName === null || configName === undefined) {
            throw new Error('Required parameter configName was null or undefined when calling registerUsingLocation.');
        }
        if (streamLocation === null || streamLocation === undefined) {
            throw new Error('Required parameter streamLocation was null or undefined when calling registerUsingLocation.');
        }

        let headers = this.defaultHeaders;
        if (requestId !== undefined && requestId !== null) {
            headers = headers.set('requestId', String(requestId));
        }
        if (base64Secret !== undefined && base64Secret !== null) {
            headers = headers.set('base64Secret', String(base64Secret));
        }
        if (suppliedSignature !== undefined && suppliedSignature !== null) {
            headers = headers.set('suppliedSignature', String(suppliedSignature));
        }
        if (keyId !== undefined && keyId !== null) {
            headers = headers.set('keyId', String(keyId));
        }

        // authentication (oauth2schema) required
        if (this.configuration.accessToken) {
            let accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json;charset=UTF-8'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
            'application/json;charset=UTF-8'
        ];
        let httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.put<RegisterContentResponse>(`${this.basePath}/existence/${encodeURIComponent(String(configName))}/streams/location`,
            streamLocation,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Register bytestream/file hash
     * Register a hash of content by supplying a file or some other binary data. Hashing will be done on the server side. Please note that the binary data itself will not be stored, only the hash. Use the registerUsingContent endpoint if you&#39;d like to store content
     * @param configName The configuration name this operation
     * @param stream The binary data (not hashed). Hashing will be done on the server side. The binary data will not be stored
     * @param fileName Optional input file name. Needed when using bytestreams instead of filestreams
     * @param requestId Optional request id
     * @param base64Secret An alternate secret key in base64 format that overrides the value in your configuration.
     * @param suppliedSignature An alternate supplied Signature in base64 format that overrides the signature generation.
     * @param keyId An alternate crypto keys API id that will be used for signature generation.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public registerUsingStream(configName: string, stream: Blob, fileName?: string, requestId?: string, base64Secret?: string, suppliedSignature?: string, keyId?: string, observe?: 'body', reportProgress?: boolean): Observable<RegisterContentResponse>;
    public registerUsingStream(configName: string, stream: Blob, fileName?: string, requestId?: string, base64Secret?: string, suppliedSignature?: string, keyId?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<RegisterContentResponse>>;
    public registerUsingStream(configName: string, stream: Blob, fileName?: string, requestId?: string, base64Secret?: string, suppliedSignature?: string, keyId?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<RegisterContentResponse>>;
    public registerUsingStream(configName: string, stream: Blob, fileName?: string, requestId?: string, base64Secret?: string, suppliedSignature?: string, keyId?: string, observe: any = 'body', reportProgress: boolean = false): Observable<any> {
        if (configName === null || configName === undefined) {
            throw new Error('Required parameter configName was null or undefined when calling registerUsingStream.');
        }
        if (stream === null || stream === undefined) {
            throw new Error('Required parameter stream was null or undefined when calling registerUsingStream.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (fileName !== undefined) {
            queryParameters = queryParameters.set('fileName', <any> fileName);
        }

        let headers = this.defaultHeaders;
        if (requestId !== undefined && requestId !== null) {
            headers = headers.set('requestId', String(requestId));
        }
        if (base64Secret !== undefined && base64Secret !== null) {
            headers = headers.set('base64Secret', String(base64Secret));
        }
        if (suppliedSignature !== undefined && suppliedSignature !== null) {
            headers = headers.set('suppliedSignature', String(suppliedSignature));
        }
        if (keyId !== undefined && keyId !== null) {
            headers = headers.set('keyId', String(keyId));
        }

        // authentication (oauth2schema) required
        if (this.configuration.accessToken) {
            let accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json;charset=UTF-8'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
            'multipart/form-data'
        ];

        const canConsumeForm = this.canConsumeForm(consumes);

        let formParams: { append(param: string, value: any): void; };
        let useForm = false;
        let convertFormParamsToString = false;
        // use FormData to transmit files using content-type "multipart/form-data"
        // see https://stackoverflow.com/questions/4007969/application-x-www-form-urlencoded-or-multipart-form-data
        useForm = canConsumeForm;
        if (useForm) {
            formParams = new FormData();
        } else {
            formParams = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        }

        if (stream !== undefined) {
            formParams = formParams.append('stream', <any> stream) || formParams;
        }

        return this.httpClient.put<RegisterContentResponse>(`${this.basePath}/existence/${encodeURIComponent(String(configName))}/streams/multipart`,
            convertFormParamsToString ? formParams.toString() : formParams,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
