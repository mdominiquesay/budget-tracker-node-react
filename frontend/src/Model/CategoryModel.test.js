import {CreateCategory,GetCategory} from "./CategoryModel";
// Increase the timeout for all tests in this file
jest.setTimeout(10000);
test('get Data', async () => {
  const onSuccessFetch = (data => {
    const a=1;
    expect(a).toEqual(1);
  });
  const onError = (data => {
    const a=1;
    expect(a).toEqual(2);
  })

  await GetCategory(onSuccessFetch,onError);
});

test('Post Data', async () => {
  const mockData = {
    
    category_name: 'test2',
    description: 'test1'
};

  try {
    await CreateCategory(mockData);
  } catch (error) {
    throw error;
  }
});