import {Injectable} from '@angular/core';
import {ContentService, NotificationService, TranslationService} from '@alfresco/adf-core';
import {MinimalNodeEntity, MinimalNodeEntryEntity} from 'alfresco-js-api';
import {HttpClient} from '@angular/common/http';
import * as shajs from 'sha.js';
import {Subject} from 'rxjs/Rx';
import {Buffer} from 'buffer';
import {secrets} from '../../../environments/secrets';
import {sprintf} from 'sprintf-js';
import {FactomCli, Entry, Chain} from 'factom';


@Injectable()
export class BlockchainFactomService {


    constructor(private contentService: ContentService,
                private notification: NotificationService,
                private translation: TranslationService,
                private http: HttpClient) {

        this.contentService = contentService;
        this.factomCli = new FactomCli({
            factomd: {
                host: 'localhost',
                port: '4200',
                path: '/factomd/v2'
            },
            walletd: {
                host: 'localhost',
                port: '4200',
                path: '/walletd/v2'
            },
            protocol: 'http',
            rejectUnauthorized: false
        });
    }

    private factomCli: FactomCli;

    private;


    signSelection(contentEntities: Array<MinimalNodeEntity>): Subject<string> {
        const observable: Subject<string> = new Subject<string>();

        if (!this.isEntryEntitiesArray(contentEntities)) {
            observable.error(new Error(JSON.stringify({error: {statusCode: 400}})));
        } else {
            const atomicItemCounter: AtomicItemCounter = new AtomicItemCounter();
            contentEntities.forEach(entity => {
                if (entity.entry.isFile) {
                    atomicItemCounter.incrementCount();
                    this.signEntry(entity, atomicItemCounter, observable);
                }
            });
        }

        return observable;
    }


    private async signEntry(entity, atomicItemCounter: AtomicItemCounter, observable: Subject<string>) {
        console.log('Signing entry ' + entity.entry.id);
        this.contentService.getNodeContent(entity.entry.id).subscribe(value => {

            const hash = shajs('sha256').update(Buffer.from(value)).digest('hex');

            const firstEntry = Entry.builder()
                .extId('Hash')
                .extId(hash)
                .content(hash, 'utf8')
                .build();

            const message: AtomicString = new AtomicString();
            const chain = new Chain(firstEntry);
            this.factomCli.add(chain, secrets.entryCreditAddress)
                .then(response => {
                    const messageBuilder = [];
                    messageBuilder.push(sprintf(this.translate('APP.MESSAGES.INFO.BLOCKCHAIN.REGISTRATION_STARTED'), entity.entry.name));
                    messageBuilder.push('.');
                    message.set(messageBuilder.join(''));
                    console.log(message);
                    console.log('Calculated hash: ' + hash);
                    console.log('Per hash proof chain id: ' + response.chainId);
                    console.log('Per hash proof entryHash: ' + response.entryHash);
                }).catch(function (e) {
                const userMessage = sprintf(this.translate('APP.MESSAGES.INFO.BLOCKCHAIN.PROCESS_FAILED'),
                    this.translate('APP.MESSAGES.INFO.BLOCKCHAIN.REGISTRATION'), entity.entry.name);
                message.set(userMessage);
                this.handleApiError(e, userMessage, observable);
            }).finally(() => {
                observable.next(message.get());
                atomicItemCounter.incrementIndex();
                if (atomicItemCounter.isLast()) {
                    observable.complete();
                }
            });
        });
    }


    verifySelection(contentEntities: Array<MinimalNodeEntity>): Subject<string> {
        const observable: Subject<string> = new Subject<string>();

        if (!this.isEntryEntitiesArray(contentEntities)) {
            observable.error(new Error(JSON.stringify({error: {statusCode: 400}})));
        } else {
            const atomicItemCounter: AtomicItemCounter = new AtomicItemCounter();
            contentEntities.forEach(entity => {
                if (entity.entry.isFile) {
                    atomicItemCounter.incrementCount();
                    this.verifyEntry(entity, atomicItemCounter, observable);
                }
            });
        }

        return observable;
    }


    private verifyEntry(entity, atomicItemCounter: AtomicItemCounter, observable: Subject<string>) {
        console.log('Verifying entry ' + entity.entry.id);
        this.contentService.getNodeContent(entity.entry.id).subscribe(value => {

            const hash = shajs('sha256').update(Buffer.from(value)).digest('hex');

            const firstEntry = Entry.builder()
                .extId('Hash')
                .extId(hash)
                .content(hash, 'utf8')
                .build();

            const message: AtomicString = new AtomicString();
            const chain = new Chain(firstEntry);
            const thiz = this;
            this.factomCli.getFirstEntry(chain.id)
                .then(response => {
                    console.log('Calculated hash: ' + hash);
                    console.log('Per hash proof chain id: ' + chain.id);
                    console.log('Per hash proof entryHash: ' + response.content);
                    message.set(thiz.buildVerifyResponseMessage(entity.entry, response));
                })
                .catch(function (e) {
                    if (e.code === -32009) {
                        message.set(thiz.buildVerifyResponseMessage(entity.entry));
                    } else if (e.message !== undefined && e.message.indexOf('Chain not yet included in a Directory Block') > -1) {
                        message.set(thiz.buildVerifyResponseMessage(entity.entry, 'PENDING'));
                    } else {
                        const userMessage = sprintf(this.translate('APP.MESSAGES.INFO.BLOCKCHAIN.PROCESS_FAILED'),
                            thiz.translate('APP.MESSAGES.INFO.BLOCKCHAIN.VERIFICATION'), entity.entry.name);
                        thiz.handleApiError(e, userMessage, observable);
                    }
                }).finally(() => {
                console.log(message.get());
                observable.next(message.get());
                atomicItemCounter.incrementIndex();
                if (atomicItemCounter.isLast()) {
                    observable.complete();
                }
            });
        });
    }


    private buildVerifyResponseMessage(entry, entryResponse = undefined): string {
        const messageBuilder = [];

        if (entryResponse === undefined) {
            messageBuilder.push(sprintf(this.translate('APP.MESSAGES.INFO.BLOCKCHAIN.FILE_IS'), entry.name));
            messageBuilder.push(' ');
            messageBuilder.push(this.translate('APP.MESSAGES.INFO.BLOCKCHAIN.NOT_REGISTERED'));
        } else if (entryResponse === 'PENDING') {
            messageBuilder.push(sprintf(this.translate('APP.MESSAGES.INFO.BLOCKCHAIN.FILE_IS'), entry.name));
            messageBuilder.push(' ');
            messageBuilder.push(this.translate('APP.MESSAGES.INFO.BLOCKCHAIN.PENDING'));
        } else {
            const registrationTime = new Date(entryResponse.timestamp);

            if (registrationTime != null) {
                messageBuilder.push(sprintf(this.translate('APP.MESSAGES.INFO.BLOCKCHAIN.FILE_WAS'), entry.name));
                messageBuilder.push(' ');
                messageBuilder.push(this.translate('APP.MESSAGES.INFO.BLOCKCHAIN.REGISTERED_ON'));
                messageBuilder.push(' ');
                messageBuilder.push(registrationTime);
            }
        }
        messageBuilder.push('.');
        const message = messageBuilder.join('');
        return message;
    }


    private translate(key: string) {
        return this.translation.instant(key);
    }

    private handleApiError(error, userMessage, observable: Subject<string>) {
        const logMessageBuilder = [];
        logMessageBuilder.push(error.message);
        if (error.error && error.error.errors) {
            error.error.errors.forEach(errorItem => {
                const errorMessage = JSON.stringify(errorItem);
                console.log(errorMessage);
                if (logMessageBuilder.length > 0) {
                    logMessageBuilder.push('\n');
                }
                logMessageBuilder.push(errorMessage);
            });
        }
        console.log(logMessageBuilder.join(''));

        observable.error(new Error(userMessage));
    }

    isEntryEntitiesArray(contentEntities: any[]): boolean {
        if (contentEntities && contentEntities.length) {
            const nonEntryNode = contentEntities.find(node => (!node || !node.entry || !(node.entry.nodeId || node.entry.id)));
            return !nonEntryNode;
        }
        return false;
    }

}

class AtomicItemCounter {

    private count: number = 0;
    private index: number = 0;

    incrementCount() {
        this.count++;
    }

    incrementIndex() {
        this.index++;
    }

    isLast(): boolean {
        return this.index >= this.count;
    }
}

class AtomicString {
    private value: string;

    public set(value: string): void {
        this.value = value;
    }

    public get(): string {
        return this.value;
    }
}
