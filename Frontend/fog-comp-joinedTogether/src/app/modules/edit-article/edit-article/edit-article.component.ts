import { Component } from '@angular/core';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.css']
})
export class EditArticleComponent {

  isSelectedFirst = false;
  isSelectedSecond = false;

  toggleSelection(item: string) {
    if (item === 'first') {
      this.clearSelection();
      this.isSelectedFirst = !this.isSelectedFirst;
    } else if (item === 'second') {
      this.clearSelection();
      this.isSelectedSecond = !this.isSelectedSecond;
    }
  }

  clearSelection() {
    this.isSelectedFirst = false;
    this.isSelectedSecond = false;
  }

  files: File[] = [];

  onSelect(event : any) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
}
