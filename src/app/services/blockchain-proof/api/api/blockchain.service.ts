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

import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';

import {VerifyNodesRequest} from '../model/verifyNodesRequest';
import {VerifyNodesResponse} from '../model/verifyNodesResponse';

import {BlockchainAgentConfiguration} from '../blockchainAgentConfiguration';
import {AppConfigService} from '@alfresco/adf-core';


@Injectable()
export class BlockchainService {

  private agentConfig: BlockchainAgentConfiguration;
  private defaultHeaders = new HttpHeaders();

  constructor(protected httpClient: HttpClient,
              private config: AppConfigService) {
    const agentHost = this.config.get<string>('blockchainAgentHost');
    console.log('agentHost: ' + agentHost);
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
  public verifyEntries(nodeIds: VerifyNodesRequest, observe: any = 'body', reportProgress: boolean = false): Observable<any> {
    if (nodeIds === null || nodeIds === undefined) {
      throw new Error('Required parameter nodeIds was null or undefined when calling verifyEntries.');
    }

    if (this.agentConfig === undefined) {
      this.agentConfig = new BlockchainAgentConfiguration();
      const agentHost = this.config.get<string>('blockchainAgentHost');
      this.agentConfig.basePath = agentHost + '/agent';
    }


    let headers = this.defaultHeaders;

    // to determine the Accept header
    let httpHeaderAccepts: string[] = [
      'application/json;charset=UTF-8'
    ];
    let httpHeaderAcceptSelected: string | undefined = this.agentConfig.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected != undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    let consumes: string[] = [
      'application/json;charset=UTF-8'
    ];
    let httpContentTypeSelected: string | undefined = this.agentConfig.selectHeaderContentType(consumes);
    if (httpContentTypeSelected != undefined) {
      headers = headers.set('Content-Type', httpContentTypeSelected);
    }

    return this.httpClient.post<VerifyNodesResponse>(`${this.agentConfig.basePath}/alfresco-blockchain/verify/entries`,
      nodeIds,
      {
        withCredentials: this.agentConfig.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }
}
