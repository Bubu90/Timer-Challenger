import { useRef, forwardRef, useImperativeHandle } from "react";
import { createPortal } from "react-dom";
const ResultModals = forwardRef(function ResultModals(
  { result, targetTime, remaningTime, onReset },
  ref
) {
  const dialog = useRef();
  const userLost = remaningTime <= 0;
  const formattedRemaningTime = (remaningTime / 1000).toFixed(2);
  const score = Math.round((1 - remaningTime / (targetTime * 1000)) * 100);
  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });

  return createPortal(
    <dialog ref={dialog} className="result-modal" onClose={onReset}>
      {userLost && <h2>Bravu u cazzuni perdisti</h2>}
      {!userLost && <h2>Faccia du cazzu vincisti {score}</h2>}
      <p>
        u tiampu chi facisti è <strong>{targetTime}</strong>
      </p>
      secundi.
      <p>
        stoppasti u tiampu <strong>{formattedRemaningTime}secundi</strong>
      </p>
      <form method="dialog" onSubmit={onReset}>
        <button>Close</button>
      </form>
    </dialog>,
    document.getElementById("modal")
  );
});
export default ResultModals;
