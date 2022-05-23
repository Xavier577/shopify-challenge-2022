import { DeletedItemEntity } from './deleted-item.entity';

describe('unit test for DeletedItemEntity class`', () => {
  it('should be defined', () => {
    expect(DeletedItemEntity).toBeDefined();
  });

  it('should create an item object with empty fields except for createdAt and updatedAt fields when initialized', () => {
    const item = new DeletedItemEntity();
    const excludedFields = ['createdAt', 'deletedAt'];
    expect(item).toBeDefined();
    for (const property in item) {
      if (excludedFields.includes(property) === false)
        expect(item[property]).toBeUndefined();
    }
  });
});
