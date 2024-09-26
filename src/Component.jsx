import './Component.css'
import { useState } from 'react'

const Component = () => {
    const [ display, setDisplay ] = useState("0");

    const numbers = [["7", "seven"], ["8", "eight"], ["9", "nine"], ["4", "four"], ["5", "five"], ["6", "six"], ["1", "one"], ["2", "two"], ["3", "three"], ["0", "zero"]];
    const operators = [[".", "decimal"], ["/", "divide"], ["-", "subtract"], ["+", "add"], ["*", "multiply"], ["AC", "clear"], ["=", "equals"]];
    const lastNumber = display.split(/[+\-*/]/).pop();

    const addCharacter = (e) => {
        if ((e.target.value === "0") && (display === "0")) {
            setDisplay("0");
        } else if (e.target.value !== "0" && display === "0"){
            setDisplay(e.target.value);
        } else if (e.target.value === ".") {
            if (!lastNumber.includes(".")) {
                setDisplay(display + ".");
            }
        } else if ((e.target.value.match(/[+*/]/)) && display.slice(-1).match((/[+*/]/))) {
            setDisplay(display.slice(0, -1) + e.target.value);
         } else if (e.target.value.match(/[-+]/) && display.slice(-1).match(/[-]/) && display.slice(-2).match(/[*/]/)) {
            setDisplay(display.slice(0, -2) + e.target.value);
         } else {
            setDisplay(display + e.target.value);
        };
        if (e.target.value === "AC") setDisplay("0"); 
        else if (display.length > 13) setDisplay("Limit exceed!!");
        else if (e.target.value === "=") {
            const result = eval(display);
            setDisplay(result.toString());
        }
    }

    const buttonSpread = (buttons) => {
        return(
        buttons.map((n) => {
        return(
        <button value={n[0]} onClick={(e) => {addCharacter(e)}}
        className="buttons" id={n[1]} key={n[1]} > {n[0]} </button>
        )}));
    }         

  return (
    <div className='calculatorBody'>
        <div id='display'>
            {display}
        </div>
        <div className='allButtons'>
            {buttonSpread(numbers)}
            {buttonSpread(operators)}
        </div>
    </div>
  )
}

export default Component