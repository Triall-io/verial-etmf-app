import {Injectable} from '@angular/core';
import {AlfrescoApiService, ContentService, NotificationService, TranslationService} from '@alfresco/adf-core';
import {ApiClientConfiguration, RegistrationService, VerificationService} from './sdk';
import {MinimalNodeEntity, MinimalNodeEntryEntity} from 'alfresco-js-api';
import {HttpClient} from '@angular/common/http';
import {observable} from 'rxjs/symbol/observable';
import * as models from './sdk/model/Models';
import {AlfrescoApi, ContentApi} from 'alfresco-js-api';
import {Subject} from 'rxjs/Rx';
import {Buffer} from 'buffer';
import { secrets } from '../../../environments/secrets';


@Injectable()
export class BlockchainProofService {

    private registrationService: RegistrationService;
    private verificationService: VerificationService;


    constructor(private contentService: ContentService,
                private notification: NotificationService,
                private translation: TranslationService,
                private http: HttpClient) {

        this.contentService = contentService;
        this.registrationService = new RegistrationService(http, null, this.apiConfig());
        this.verificationService = new VerificationService(http, null, this.apiConfig());
    }


    signSelection(contentEntities: Array<MinimalNodeEntity>): Subject<string> {
        const observable: Subject<string> = new Subject<string>();

        if (!this.isEntryEntitiesArray(contentEntities)) {
            observable.error(new Error(JSON.stringify({error: {statusCode: 400}})));
        } else {
            contentEntities.forEach(entity => {
                if (entity.entry.isFile) {
                    this.signEntry(entity, observable);
                }
            });
        }

        return observable;
    }


    private signEntry(entity, observable: Subject<string>) {
        console.log('Signing entry ' + entity.entry.id);
        this.contentService.getNodeContent(entity.entry.id).subscribe(value => {
            const contentRequest = {hashProvider: models.ContentRequest.HashProviderEnum.SERVER,
                content: Buffer.from(value).toString('base64')};
            const response = this.registrationService.registerUsingContent('demo', contentRequest, null, null,
                '01020304', null);
            response.subscribe((registerContentResponse: models.RegisterContentResponse) => {
                let message = 'The blockchain registration was successful';
                if (registerContentResponse.perHashProofChain != null) {
                    message += ' per-hash proof chain id: ' + registerContentResponse.perHashProofChain.chainId;
                }
                if (registerContentResponse.singleProofChain != null) {
                    message += ', single proof chain id: ' + registerContentResponse.singleProofChain.chainId;
                }
                console.log(message);
                observable.next(message);
                // this.signComplete.emit(message);
            }, error => {
                console.log(error.message);
                observable.error(new Error(JSON.stringify(error)));
            });
        });
    }


    verifySelection(contentEntities: Array<MinimalNodeEntity>): Subject<string> {
        const observable: Subject<string> = new Subject<string>();

        if (!this.isEntryEntitiesArray(contentEntities)) {
            observable.error(new Error(JSON.stringify({error: {statusCode: 400}})));
        } else {
            contentEntities.forEach(entity => {
                if (entity.entry.isFile) {
                    this.verifyEntry(entity, observable);
                }
            });
        }

        return observable;
    }


    private verifyEntry(entity, observable: Subject<string>) {
        console.log('Verifying entry ' + entity.entry.id);
        this.contentService.getNodeContent(entity.entry.id).subscribe(value => {
            const contentRequest = {hashProvider: models.ContentRequest.HashProviderEnum.SERVER,
                content: Buffer.from(value).toString('base64')};
            const response = this.verificationService.verifyUsingContent('demo', contentRequest, null, null,
                '01020304', null);
            response.subscribe((verifyContentResponse: models.VerifyContentResponse) => {
                let message = 'The blockchain registration state ' ;
                if (verifyContentResponse.perHashProofChain != null) {
                    message += ' on the per-hash proof chain: ' + verifyContentResponse.perHashProofChain.registrationState;
                    message += ', chain id: ' + verifyContentResponse.perHashProofChain.chainId;
                }
                if (verifyContentResponse.singleProofChain != null) {
                    message += ' on the single proof chain: ' + verifyContentResponse.perHashProofChain.registrationState;
                    message += ', chain id: ' + verifyContentResponse.singleProofChain.chainId;
                }                console.log(message);
                observable.next(message);
                // this.signComplete.emit(message);
            }, error => {
                console.log(error.message);
                observable.error(new Error(JSON.stringify(error)));
            });
        });
    }

    apiConfig() {
        const config = new ApiClientConfiguration();
        config.accessToken = secrets.bcproofFixedToken;
        return config;
    }

    isEntryEntitiesArray(contentEntities: any[]): boolean {
        if (contentEntities && contentEntities.length) {
            const nonEntryNode = contentEntities.find(node => (!node || !node.entry || !(node.entry.nodeId || node.entry.id)));
            return !nonEntryNode;
        }
        return false;
    }

}
