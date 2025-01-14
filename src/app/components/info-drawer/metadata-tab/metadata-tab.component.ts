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

import { Component, Input, ViewEncapsulation } from '@angular/core';
import { MinimalNodeEntryEntity } from 'alfresco-js-api';
import { NodePermissionService } from '../../../services/node-permission.service';
import { AppExtensionService } from '../../../extensions/extension.service';
import { AppConfigService } from '@alfresco/adf-core';

@Component({
  selector: 'app-metadata-tab',
  template: `
    <adf-content-metadata-card
      [readOnly]="!canUpdateNode"
      [displayEmpty]="canUpdateNode"
      [preset]="'custom'"
      [displayDefaultProperties] = "false"
      [node]="node"
    >
    </adf-content-metadata-card>
  `,
  encapsulation: ViewEncapsulation.None,
  host: { class: 'app-metadata-tab' }
})
export class MetadataTabComponent {
  @Input()
  node: MinimalNodeEntryEntity;

  constructor(
    private permission: NodePermissionService,
    protected extensions: AppExtensionService,
    private appConfig: AppConfigService
  ) {
    try {
      this.appConfig.config[
        'content-metadata'
      ] = this.extensions.contentMetadata;
    } catch (error) {
      console.error(
        error,
        '- could not change content-metadata from app.config'
      );
    }
  }

  get canUpdateNode() {
    return this.node && this.permission.check(this.node, ['update']);
  }
}
