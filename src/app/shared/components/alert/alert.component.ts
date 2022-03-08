import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Alert } from '../../models/alert';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {
  alert = {
    title: 'Sucess',
    description: 'Your data has been saved!',
    btnSucess: 'OK',
    btnCancel: 'Cancel',
    haveCancelBtn: false,
    colorBtnSucess: 'accent',
    colorBtnCancel: 'warn',
  } as Alert;

  constructor(
    public dialogRef: MatDialogRef<AlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Alert
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.alert.title = this.data.title || this.alert.title;
      this.alert.description = this.data.description || this.alert.description;
      this.alert.btnSucess = this.data.btnSucess || this.alert.btnSucess;
      this.alert.btnCancel = this.data.btnCancel || this.alert.btnCancel;
      this.alert.haveCancelBtn =
        this.data.haveCancelBtn || this.alert.haveCancelBtn;
      this.alert.colorBtnSucess =
        this.data.colorBtnSucess || this.alert.colorBtnSucess;
      this.alert.colorBtnCancel =
        this.data.colorBtnCancel || this.alert.colorBtnCancel;
    }
  }
}
