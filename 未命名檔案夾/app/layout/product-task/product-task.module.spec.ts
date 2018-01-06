import { ProductTaskModule } from './product-task.module';

describe('ProductTaskModule', () => {
    let productTaskModule: ProductTaskModule;

    beforeEach(() => {
        productTaskModule = new ProductTaskModule();
    });

    it('should create an instance', () => {
        expect(productTaskModule).toBeTruthy();
    });
});
