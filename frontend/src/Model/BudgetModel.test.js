import { GetBudgetAllMaster, SubmitBudgetMaster, DeleteBudgetMaster } from "./BudgetModel";
import { render, screen } from "@testing-library/react";
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

  await GetBudgetAllMaster(onSuccessFetch,onError);
});

test('Post Data', async () => {
  const mockData = {
    budget_name: 'New Budget'
  };

  try {
    await SubmitBudgetMaster(mockData);
  } catch (error) {
    throw error;
  }
});
test('Delete Data', async () => {
  const mockData = {
    id: 1,
    budget_name: 'New Budget'
  };

  try {
    await DeleteBudgetMaster(mockData);
  } catch (error) {
    throw error;
  }
});


