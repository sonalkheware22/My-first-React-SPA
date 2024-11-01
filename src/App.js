import React, { useState } from "react";
import styles from './App.module.css';
import { Form, Button } from "react-bootstrap";

let randomNum = Math.floor(Math.random() * 100) + 1;

function App() {

  const [userGuess, setUserGuess] = useState("");
  const [userCount, setUserCount] = useState(0);
  const [userGuessesVal, setUserGuessesVal] = useState([]);
  const [randomNumber, setrandomNumber] = useState(randomNum);
  const [LowHighMsg, setLowHighMsg] = useState("");

  const [msg, setMsg] = useState("")

  const handlerValueChange = (e) => {
    setUserGuess(e.target.value)
  };

  const guessHandler = () => {
    //  Stop guessing if the user has made 10 guesses
    if (userCount >=10) {
      setMsg("No more guesses allowed. Reset to try again.");
      return;
    }
    if (Number(randomNum) === Number(userGuess)) {
      setMsg("Congrats, you guessed it!");
      setLowHighMsg(""); // Clear the Low/High message when the guess is correct
    } else if (userCount === 9) { //on the last attempt (10th guess)
      setMsg("Sorry, you've used all your guesses.");
      setLowHighMsg("")// Clear the Low/High message when the guess limit is reached
    } else {
      setMsg("");
      if (randomNumber < userGuess) {
        setLowHighMsg("Number is too HIGH");
      } else if (randomNumber > userGuess) {
        setLowHighMsg("Number is too LOW");
      }
    }

     
    // Increment guess count and update the List of guesses
    setUserCount(userCount + 1)
    setUserGuessesVal([...userGuessesVal, userGuess]);//Append guess to the array
  };

  const restartAgain = ( ) => {
    setMsg("");
    setLowHighMsg("");
    setUserGuessesVal([]); //Clear previous guesses
    setUserCount(0);
    setrandomNumber(Math.floor(Math.random() * 20) + 1) // Reset to a new randon number
    setUserGuess("");
};

return (

  <div className={styles.template}>
    <h3>I am thinking of a number between 1 and 100. Guess the Lucky Number!</h3>
    <p>You have made {userCount} guesses.</p>
   
   <Form>
   <Form.Control  onChange={handlerValueChange} value={userGuess} type="number" placeholder="Enter your guess" />
    <br/>
    <Button onClick={guessHandler} className="button1" varient="primary">Guess</Button>{''}
    </Form>
    <p>{msg}</p>
    <Button onClick={restartAgain} varient="primary">Reset</Button>{''}
    <div>
    {/* <p>{randomNum}</p> */}
    <p>{LowHighMsg}</p>
    </div>
  </div>
    );
}

export default App

