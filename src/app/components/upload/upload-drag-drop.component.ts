/*!
 * @license
 * Copyright 2019 Alfresco Software, Ltd.
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


import {Component, forwardRef, NgZone, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {DocumentListComponent, UploadDragAreaComponent} from "@alfresco/adf-content-services";
import {
  ContentService,
  EXTENDIBLE_COMPONENT, FileInfo,
  NotificationService,
  TranslationService,
  UploadService
} from "@alfresco/adf-core";


@Component({
  selector: 'adf-upload-drag-drop',
  styleUrls: ['./upload-drag-drop.component.scss'],
  templateUrl: './upload-drag-drop.component.html',
  viewProviders: [
    {provide: EXTENDIBLE_COMPONENT, useExisting: forwardRef(() => UploadDragDropComponent)}
  ],
  encapsulation: ViewEncapsulation.None
})

export class UploadDragDropComponent extends UploadDragAreaComponent implements OnInit {

  constructor(protected uploadServiceDnD: UploadService,
              protected translationServiceDnD: TranslationService,
              private notificationServiceDnD: NotificationService,
              protected contentServiceDnD: ContentService,
              protected ngZoneDnD: NgZone
  ) {
    super(uploadServiceDnD, translationServiceDnD, notificationServiceDnD, contentServiceDnD, ngZoneDnD);
  }
  @ViewChild('documentList')
  documentList: DocumentListComponent;

  isDroppable(): boolean {
    return !this.disabled;
  }

  /**
   * Called when a folder are dropped in the drag area
   *
   * @param folder - name of the dropped folder
   */
  onFolderEntityDropped(folder: any): void {
    this.flatten(folder).then((filesInfo) => {
      this.uploadFilesInfo(filesInfo);
      if (filesInfo.length === 0) {
        window.location.reload();
      }
    });
  }

  flatten(folder: any): Promise<FileInfo[]> {
    const _this = this;
    const reader = folder.createReader();

    const files: FileInfo[] = [];
    return new Promise((resolve) => {
      const iterations = [];
      (function traverse() {
        reader.readEntries((entries) => {
          if (!entries.length) {
            Promise.all(iterations).then(() => resolve(files));
          } else {
            iterations.push(Promise.all(entries.map((entry) => {
              if (entry.isFile) {
                return new Promise<void>((resolveFile) => {
                  entry.file(function (file: File) {
                    files.push({
                      entry: entry,
                      file: file,
                      relativeFolder: entry.fullPath.replace(/\/[^\/]*$/, '')
                    });
                    resolveFile();
                  });
                });
              } else {
                _this.contentServiceDnD.createFolder(entry.fullPath.replace(/\/[^\/]*$/, ''), entry.name, _this.rootFolderId);
                return _this.flatten(entry).then((result) => {
                  files.push(...result);
                });
              }
            })));
            traverse();
          }
        });
      })();
    });
  }
}
