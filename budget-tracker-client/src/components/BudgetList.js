// components/BudgetList.js
import React from 'react';

const BudgetList = ({ budgets }) => {
  return (
    <div className="p-4 space-y-2">
      {budgets.map((item, index) => (
        <div key={index} className="p-2 border rounded shadow-sm">
          <h3 className="font-bold">{item.title}</h3>
          <p>Amount: ${item.amount}</p>
          <p>Category: {item.category}</p>
        </div>
      ))}
    </div>
  );
};

export default BudgetList;
