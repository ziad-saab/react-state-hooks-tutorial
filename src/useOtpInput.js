import { createRef, useEffect, useImperativeHandle, useRef } from "react";

export const useOtpInput = ({ otpCode, onOtpCodeChange, numDigits, ref }) => {
  /*
  This function takes an index, and returns an event handler. This allows us to easily create "per-position" event handlers.
  Below, in the onChange prop of the inputs, you'll see calls like handleValueChangeForIndex(idx). Remember that while these
  are function calls, they return functions themselves, so this is not different from
  passing an inline function.
  */
  const handleValueChangeForIndex = (index) => (event) => {
    const inputBoxValue = event.target.value;
    if (index === otpCode.length && inputBoxValue.length > 0) {
      // Only change the value if we're changing the "next input field"
      onOtpCodeChange(otpCode + inputBoxValue[0]);
    } else if (index === otpCode.length - 1 && inputBoxValue.length === 0) {
      // If we erase the last digit, then remove it from the otp code value
      onOtpCodeChange(otpCode.slice(0, -1));
    }
  };

  // Create refs for the inputs
  const inputBoxesRefs = useRef([]);
  for (
    let boxNum = inputBoxesRefs.current.length;
    boxNum < numDigits;
    boxNum++
  ) {
    if (!inputBoxesRefs.current[boxNum]) {
      inputBoxesRefs.current[boxNum] = createRef();
    }
  }

  const previousOtpCodeRef = useRef(otpCode);
  useEffect(() => {
    // If the entry is completed, then don't do anything
    if (!(otpCode.length === numDigits || otpCode.length === 0)) {
      if (previousOtpCodeRef.current.length < otpCode.length) {
        // If the length of the OTP has increased then move to the next box
        const nextBox = inputBoxesRefs.current[otpCode.length].current;
        if (nextBox) {
          nextBox.focus();
        }
      } else if (previousOtpCodeRef.current.length > otpCode.length) {
        // If the length has decreased, move to the previous box and select the value there
        const previousBox = inputBoxesRefs.current[otpCode.length - 1].current;
        if (previousBox) {
          previousBox.focus();
          previousBox.select();
        }
      }
    }
    // Set the new value of the ref
    previousOtpCodeRef.current = otpCode;
  }, [otpCode, numDigits]);

  // Expose an API through useImperativeHandle
  useImperativeHandle(ref, () => ({
    // Call this function to focus on this input. We should name it focus, but we're naming it focusFromRef to differentiate it for learning purposes
    focusFromRef() {
      // Find the last empty box and focus it
      const lastBox =
        inputBoxesRefs.current[Math.min(otpCode.length, numDigits - 1)].current;
      if (lastBox) {
        lastBox.focus();
      }
    }
  }));

  return {
    inputPropsByIndex: inputBoxesRefs.current.map((ref, idx) => ({
      ref,
      value: otpCode[idx] || "",
      onChange: handleValueChangeForIndex(idx)
    }))
  };
};
