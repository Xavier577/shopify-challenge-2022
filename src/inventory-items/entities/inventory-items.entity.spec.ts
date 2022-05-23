import { InventoryItemEntity } from './inventory-item.entity';

describe('Inventory Item clas', () => {
  it('should be defined', () => {
    expect(InventoryItemEntity).toBeDefined();
  });

  it('should create an item object with empty fields except for createdAt and updatedAt fields when initialized', () => {
    const item = new InventoryItemEntity();
    const excludedFields = ['createdAt', 'deletedAt'];
    expect(item).toBeDefined();
    for (const property in item) {
      if (excludedFields.includes(property) === false)
        expect(item[property]).toBeUndefined();
    }
  });
});
