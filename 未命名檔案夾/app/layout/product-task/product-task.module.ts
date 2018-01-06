import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbCarouselModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

import { ProductTaskRoutingModule } from './product-task-routing.module';
import { ProductTaskComponent } from './product-task.component';

@NgModule({
    imports: [CommonModule, ProductTaskRoutingModule, FormsModule,
        NgbCarouselModule.forRoot(),
        NgbAlertModule.forRoot()],
    declarations: [ProductTaskComponent]
})
export class ProductTaskModule {}

