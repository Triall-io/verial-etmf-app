import { Action } from '@ngrx/store';
import {MinimalNodeEntity} from "alfresco-js-api";

export const BLOCKCHAIN_SIGN = 'BLOCKCHAIN_SIGN';
export const BLOCKCHAIN_VERIFY = 'BLOCKCHAIN_VERIFY';


export class BlockchainSignAction implements Action {
    readonly type = BLOCKCHAIN_SIGN;
    constructor(public payload: Array<MinimalNodeEntity>) {}
}


export class BlockchainVerifyAction implements Action {
    readonly type = BLOCKCHAIN_VERIFY;
    constructor(public payload: Array<MinimalNodeEntity>) {}
}
