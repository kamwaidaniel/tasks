import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductTaskComponent } from './product-task.component';

describe('ProductTaskComponent', () => {
    let component: ProductTaskComponent;
    let fixture: ComponentFixture<ProductTaskComponent>;

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                declarations: [ProductTaskComponent]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(ProductTaskComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
