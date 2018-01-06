import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductTaskComponent } from './product-task.component';

const routes: Routes = [
    {
        path: '',
        component: ProductTaskComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductTaskRoutingModule {}
