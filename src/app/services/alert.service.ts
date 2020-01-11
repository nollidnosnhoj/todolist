import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private snackBar: MatSnackBar,
    private zone: NgZone
  ) { }

  public success(message: string, duration: number = 3000) {
    this.zone.run(() => {
      this.snackBar.open(message, "x", {
        duration: duration,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
        panelClass: 'success-bg'
      }).onAction().subscribe(() => {
        this.snackBar.dismiss();
      });
    });
  }
}
