import { CreateBudgetMaster, DeletBudgetDetail, editBudgetMaster,GetAllBudgetDetail } from "./BudgetDetailModel";
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

  await GetAllBudgetDetail(1,onSuccessFetch,onError);
});

test('Post Data', async () => {
  const mockData = {
    budget_id: 1,
    description: "Transportation",
    category: "Expense",amount:100
  };

  try {
    await CreateBudgetMaster(1,mockData);
  } catch (error) {
    throw error;
  }
});
test('Delete Data', async () => {
  const mockData = {
    budget_id: 1,
    description: "Transportation",
    category: "Expense"
    ,amount:100
  };

  try {
    await DeletBudgetDetail(1);
  } catch (error) {
    throw error;
  }
});
test('Update Data', async () => {
    const mockData = {
      id: 1,
    description: "Transportation",
    category: "Expense",amount:100
    };
  
    try {
      await editBudgetMaster(1,mockData);
    } catch (error) {
      throw error;
    }
  });


