import React, { useState } from 'react';

// Example dictionary data
const dictionaryData = [
  { term: 'Inflation', definition: 'The rate at which the general level of prices for goods and services is rising.' },
  { term: 'Stocks', definition: 'A type of security that signifies ownership in a corporation and represents a claim on part of the corporation\'s assets and earnings.' },
  { term: 'Bonds', definition: 'A debt security, similar to an IOU, where the issuer owes the bondholder a debt and is obligated to pay interest and/or repay the principal at a later date.' },
  { term: 'Cryptocurrency', definition: 'A digital or virtual currency that uses cryptography for security and operates independently of a central bank.' },
  { term: 'Budgeting', definition: 'The process of creating a plan to spend your money, ensuring you do not overspend and can save for future needs.' }
];

const FinancialDictionary = () => {
  // State to track the selected term
  const [selectedTerm, setSelectedTerm] = useState(null);

  // Handler when a user clicks a term
  const handleClick = (term) => {
    setSelectedTerm(term);
  };

  return (
    <div>
      <h1>Financial Dictionary</h1>

      {/* Render terms as buttons/tabs */}
      <div>
        {dictionaryData.map((item, index) => (
          <button
            key={index}
            onClick={() => handleClick(item)}
            style={{
              margin: '5px',
              padding: '10px',
              backgroundColor: selectedTerm === item ? '#4CAF50' : '#f0f0f0',
              color: selectedTerm === item ? 'white' : 'black',
              border: '1px solid #ddd',
              borderRadius: '4px',
            }}
          >
            {item.term}
          </button>
        ))}
      </div>

      {/* Display the definition of the selected term */}
      {selectedTerm && (
        <div style={{ marginTop: '20px' }}>
          <h3>{selectedTerm.term}</h3>
          <p>{selectedTerm.definition}</p>
        </div>
      )}
    </div>
  );
};

export default FinancialDictionary;
