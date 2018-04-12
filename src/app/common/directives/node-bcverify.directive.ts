/*!
 * @license
 * Alfresco Example Content Application
 *
 * Copyright (C) 2005 - 2018 Alfresco Software Limited
 *
 * This file is part of the Alfresco Example Content Application.
 * If the software was purchased under a paid Alfresco license, the terms of
 * the paid license agreement will prevail.  Otherwise, the software is
 * provided under the following open source license terms:
 *
 * The Alfresco Example Content Application is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * The Alfresco Example Content Application is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with Alfresco. If not, see <http://www.gnu.org/licenses/>.
 */

import {Directive, HostListener, Input} from '@angular/core';
import {Observable} from 'rxjs/Rx';

import {TranslationService, NodesApiService, NotificationService} from '@alfresco/adf-core';
import {MinimalNodeEntity} from 'alfresco-js-api';
import {NodeActionsService} from '../services/node-actions.service';
import {ContentManagementService} from '../services/content-management.service';
import {BlockchainProofService} from '../services/blockchain-proof/blockchain-proof.service';

@Directive({
    selector: '[app-bcverify-node]'
})
export class NodeBCVerifyDirective {

    @Input('app-bcverify-node')
    selection: MinimalNodeEntity[];

    @HostListener('click')
    onClick() {
        this.verifySelected();
    }

    constructor(
        private content: ContentManagementService,
        private notification: NotificationService,
        private nodeActionsService: NodeActionsService,
        private blockchainProofService: BlockchainProofService,
        private nodesApi: NodesApiService,
        private translation: TranslationService
    ) {
    }

    verifySelected() {
        Observable.zip(
            this.blockchainProofService.verifySelection(this.selection)
        ).subscribe(
            (result) => {
                const [operationResult] = result;
                this.toastMessage(operationResult);
            },
            (error) => {
                this.toastMessage(error);
            }
        );
    }

    private toastMessage(message: any) {
        this.notification.openSnackMessageAction(message, '', 15000);
    }

}
