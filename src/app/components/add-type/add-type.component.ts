import { ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MasterType } from 'src/app/models/models';
import { ExpAddService } from 'src/app/services/exp-add.service';

@Component({
  selector: 'app-add-type',
  templateUrl: './add-type.component.html',
  styleUrls: ['./add-type.component.css']
})
export class AddTypeComponent implements OnInit, OnDestroy {

  parentTypeName: string;
  parentTypeId: number;
  masterTypes: Array<MasterType> = [];

  typeForm: FormGroup;

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(public dialogRef: MatDialogRef<AddTypeComponent>, private readonly fb: FormBuilder, private expAddService: ExpAddService, private readonly changeDetectorRef: ChangeDetectorRef, @Inject(MAT_DIALOG_DATA) data) {
    this.parentTypeId = data.parentId;
    if (data.parentId) {
      this.expAddService.getTypeByid(data.parentId).subscribe((x) => {
        this.parentTypeName = x.data;
      });
    }
  }

  ngOnInit() {
    this.loadProducts();
    this.inilizeForm();
  }
  inilizeForm() {
    this.typeForm = this.fb.group({
      masterTypeId: [''],
      masterTypeName: ['', Validators.required]
    });
  }

  loadProducts() {
    this.expAddService.getremainingMasterTypes(this.parentTypeId).pipe(takeUntil(this.destroy$)).subscribe(
      data => {
        this.masterTypes = data.data;
        this.changeDetectorRef.markForCheck();
      },
      error => {
        console.log("error");
      });
  }

  saveType() {

    let masterTypeId: number;
    for (let i = 0; i < this.masterTypes.length; i++) {
      if (this.typeForm.get("masterTypeName").value === this.masterTypes[i].name) {
        masterTypeId = this.masterTypes[i].id;
        break;
      }
    }

    if (masterTypeId === null || masterTypeId === undefined) {
      this.expAddService.saveMasterType(this.typeForm.get("masterTypeName").value).subscribe(
        response => {
          this.savingType(response.data.id);
        },
        error => console.error('Error!', error)
      );
    } else {
      this.savingType(masterTypeId);
    }

  }

  private savingType(masterTypeId: number) {
    this.expAddService.saveType({ "parentTypeId": this.parentTypeId, "masterTypeId": masterTypeId }).subscribe(
      response => console.log('Success!', response),
      error => console.error('Error!', error)
    );
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
