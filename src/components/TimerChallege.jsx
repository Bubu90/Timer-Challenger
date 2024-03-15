import { useRef, useState } from "react";
import ResultModals from "./ResultMoldals";

export default function TimerChallenge({ title, targetTime }) {
  // const [timerExpired, settTimerExpired] = useState(false);
  // const [timerStarted, settTimerStarted] = useState(false);
  const [timerRemaning, setTimerRemaning] = useState(targetTime * 1000);
  const timer = useRef();
  const dialog = useRef();
  const timerIsACtive = timerRemaning > 0 && timerRemaning < targetTime * 1000;
  if (timerRemaning <= 0) {
    clearInterval(timer.current);
    // setTimerRemaning(targetTime * 1000);//illegale
    dialog.current.open();
  }
  function handleReset() {
    setTimerRemaning(targetTime * 1000);
  }
  function handlerStart() {
    timer.current = setInterval(() => {
      // settTimerExpired(true);
      //  dialog.current.open();
      setTimerRemaning((prevTime) => prevTime - 10);
    }, 10);
    // settTimerStarted(true);
  }

  function handleStop() {
    clearInterval(timer.current);
    dialog.current.open();
  }

  return (
    <>
      <ResultModals
        ref={dialog}
        targetTime={targetTime}
        remaningTime={timerRemaning}
        onReset={handleReset}
      />

      <section className="challenge">
        <h2>{title}</h2>

        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timerIsACtive ? handleStop : handlerStart}>
            {timerIsACtive ? "Stop" : "Start"}Challenge
          </button>
        </p>
        <p className={timerIsACtive ? "Sattivau" : undefined}>
          {timerIsACtive ? "Partiu" : "finiu"}
        </p>
      </section>
    </>
  );
}
