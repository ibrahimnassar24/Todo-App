import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
    selector: 'app-test',
    imports: [
        CommonModule,
        MatSlideToggleModule
    ],
    templateUrl: './test.page.html',
    styleUrl: './test.page.css'
})
export class TestPage {

}