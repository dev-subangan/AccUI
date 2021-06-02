import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material";

@Injectable({
    providedIn: 'root'
})
export class AccUtillService {

    constructor(private readonly snackBar: MatSnackBar) { }

    public showNotification(message: string) {
        this.snackBar.open(message, 'Dismiss', { duration: 1000 });
    }

}