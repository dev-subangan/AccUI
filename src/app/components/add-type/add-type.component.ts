import { ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ExpAddService } from 'src/app/exp-add.service';

@Component({
  selector: 'app-add-type',
  templateUrl: './add-type.component.html',
  styleUrls: ['./add-type.component.css']
})
export class AddTypeComponent implements OnInit, OnDestroy {

  parentTypeName: string;
  parentTypeId: number;
  masterTypes: Array<any> = [];

  typeForm: FormGroup;

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private readonly fb: FormBuilder, private expAddService: ExpAddService, private readonly changeDetectorRef: ChangeDetectorRef, @Inject(MAT_DIALOG_DATA) data) {
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
      masterTypeId: ['', Validators.required]
    });
  }

  loadProducts() {
    this.expAddService.getremainingMasterTypes(this.parentTypeId).pipe(takeUntil(this.destroy$)).subscribe(data => {
      this.masterTypes = data.data;
      this.changeDetectorRef.markForCheck();
    },
      error => {
        console.log("error");
      });
  }
  saveType() {
    this.expAddService.saveType({ parentTypeId: this.parentTypeId, masterTypeId: this.typeForm.get("masterTypeId").value }).subscribe(
      response => console.log('Success!', response),
      error => console.error('Error!', error)
    );
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
