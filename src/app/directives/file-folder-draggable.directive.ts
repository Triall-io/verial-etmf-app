import {FileDraggableDirective} from "@alfresco/adf-content-services";
import {Directive, ElementRef, Input, NgZone, OnDestroy, OnInit} from "@angular/core";
import {FileUtils} from "@alfresco/adf-core";

@Directive({
  selector: '[adf-file-folder-draggable]'
})
export class FileFolderDraggableDirective extends FileDraggableDirective implements OnInit, OnDestroy {

  /** Enables/disables drag-and-drop functionality. */
  @Input('adf-file-folder-draggable')
  enabledDnD = true;

  private cssClassNameDnD = 'adf-file-draggable__input-focus';

  private elementDnD: HTMLElement;

  constructor(el: ElementRef, private ngZoneDnD: NgZone) {
    super(el, ngZoneDnD);
    this.elementDnD = el.nativeElement;
  }

  ngOnInit() {
    this.ngZoneDnD.runOutsideAngular(() => {
      this.elementDnD.addEventListener('dragenter', this.onDragEnter.bind(this));
      this.elementDnD.addEventListener('dragover', this.onDragOver.bind(this));
      this.elementDnD.addEventListener('dragleave', this.onDragLeave.bind(this));
      this.elementDnD.addEventListener('drop', this.onDropFiles.bind(this));
    });
  }

  ngOnDestroy() {
    this.elementDnD.removeEventListener('dragenter', this.onDragEnter);
    this.elementDnD.removeEventListener('dragover', this.onDragOver);
    this.elementDnD.removeEventListener('dragleave', this.onDragLeave);
    this.elementDnD.removeEventListener('drop', this.onDropFiles);
  }


  /**
   * Change the style of the drag area when a file drag in.
   *
   * @param event - DOM event.
   */
  onDragEnter(event: DragEvent): void {
    if (this.enabledDnD && !event.defaultPrevented) {
      this.preventDefault(event);
      event.dataTransfer.dropEffect = 'copy';
      this.elementDnD.classList.add(this.cssClassNameDnD);
    }
  }

  /**
   * Change the style of the drag area when a file is over the drag area.
   *
   * @param event
   */
  onDragOver(event: DragEvent): void {
    if (this.enabledDnD && !event.defaultPrevented) {
      this.preventDefault(event);
      event.dataTransfer.dropEffect = 'copy';
      this.elementDnD.classList.add(this.cssClassNameDnD);
    }
  }

  /**
   * Change the style of the drag area when a file drag out.
   *
   * @param event - DOM event.
   */
  onDragLeave(event: Event): void {
    if (this.enabledDnD && !event.defaultPrevented) {
      this.preventDefault(event);
      this.elementDnD.classList.remove(this.cssClassNameDnD);
    }
  }

  /**
   * Method called when files is dropped in the drag and drop area.
   * @param event DOM event.
   */
  onDropFiles(event: any): void {
    if (this.enabledDnD && !event.defaultPrevented) {
      this.preventDefault(event);

      // Chrome, Edge, Firefox, Opera (Files + Folders)
      const items = event.dataTransfer.items;
      if (items) {
        const files: File[] = [];

        for (let i = 0; i < items.length; i++) {
          if (items[i].webkitGetAsEntry) {
            const item = items[i].webkitGetAsEntry();

            if (item) {
              if (item.isFile) {
                const file = items[i].getAsFile();

                if (file) {
                  files.push(file);
                }
              } else if (item.isDirectory) {
                this.folderEntityDropped.emit(item);
              }
            }
          }
        }
        if (files.length > 0) {
          this.filesDropped.emit(files);
        }
      } else {
        // IE, Safari, Chrome, Edge, Firefox, Opera (Files only)
        const files = FileUtils.toFileArray(event.dataTransfer.files);
        this.filesDropped.emit(files);
      }

      if (this.elementDnD.classList.contains(this.cssClassNameDnD)) {
        this.elementDnD.classList.remove(this.cssClassNameDnD)
      }
    }
  }
}
