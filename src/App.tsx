import React, { useState } from 'react';
import { Calculator } from 'lucide-react';

function App() {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [hasCalculated, setHasCalculated] = useState(false);

  const handleNumber = (number: string) => {
    if (hasCalculated) {
      setDisplay(number);
      setEquation(number);
      setHasCalculated(false);
    } else {
      setDisplay(display === '0' ? number : display + number);
      setEquation(equation + number);
    }
  };

  const handleOperator = (operator: string) => {
    if (!equation.endsWith(' ') && equation !== '') {
      setEquation(equation + ' ' + operator + ' ');
      setDisplay('0');
      setHasCalculated(false);
    }
  };

  const calculate = () => {
    try {
      const result = eval(equation);
      setDisplay(result.toString());
      setEquation(result.toString());
      setHasCalculated(true);
    } catch (error) {
      setDisplay('Error');
      setEquation('');
    }
  };

  const clear = () => {
    setDisplay('0');
    setEquation('');
    setHasCalculated(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 to-orange-200 flex flex-col items-center py-10">
      <div className="flex items-center gap-3 mb-8">
        <Calculator className="w-8 h-8 text-orange-700" />
        <h1 className="text-3xl font-bold text-orange-700">Calculator by Michael</h1>
      </div>
      
      <div className="bg-zinc-800 p-6 rounded-xl shadow-xl w-[320px]">
        <div className="bg-[#9EA84F] p-4 rounded-lg mb-4 font-mono">
          <div className="text-sm opacity-70 h-6">{equation || ' '}</div>
          <div className="text-2xl font-bold">{display}</div>
        </div>
        
        <div className="grid grid-cols-4 gap-2">
          {['7', '8', '9', '÷', '4', '5', '6', '×', '1', '2', '3', '-', '0', '.', '=', '+'].map((btn) => (
            <button
              key={btn}
              onClick={() => {
                switch (btn) {
                  case '=':
                    calculate();
                    break;
                  case '÷':
                    handleOperator('/');
                    break;
                  case '×':
                    handleOperator('*');
                    break;
                  case '+':
                  case '-':
                    handleOperator(btn);
                    break;
                  default:
                    handleNumber(btn);
                }
              }}
              className={`${
                btn === '=' 
                  ? 'bg-orange-500 hover:bg-orange-600'
                  : ['÷', '×', '-', '+'].includes(btn)
                    ? 'bg-orange-400 hover:bg-orange-500'
                    : 'bg-zinc-700 hover:bg-zinc-600'
              } text-white rounded-lg p-4 text-xl font-bold transition-colors duration-200 shadow-md active:shadow-sm active:transform active:translate-y-px`}
            >
              {btn}
            </button>
          ))}
          <button
            onClick={clear}
            className="col-span-4 bg-red-500 hover:bg-red-600 text-white rounded-lg p-4 text-xl font-bold transition-colors duration-200 shadow-md active:shadow-sm active:transform active:translate-y-px mt-2"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;