import { useRef, useState } from "react";
import { MuiOtpInput } from "./MuiOtpInput";
import { OtpInput } from "./OtpInput";
import "./styles.css";

export default function App() {
  // We bring back useState to App, because we're now controlling the value of the two OtpInputs
  const [otp1, setOtp1] = useState("");
  const [otp2, setOtp2] = useState("");

  const firstOtpDigits = 5;
  const firstOtpRef = useRef();

  const handleFocusClick = () => {
    if (firstOtpRef.current) {
      firstOtpRef.current.focusFromRef();
    }
  };

  return (
    <div className="App">
      <h2>OTP Input Example #1</h2>
      <p>
        <button onClick={handleFocusClick}>focus on first OTP</button>
      </p>
      <OtpInput
        ref={firstOtpRef}
        numDigits={firstOtpDigits}
        otpCode={otp1}
        onOtpCodeChange={setOtp1}
      />
      <button
        type="button"
        // Finally we can use the value of the otp to update UI, since we're controlling it
        disabled={otp1.length < firstOtpDigits}
      >
        Submit code
      </button>
      <h2>MUI OTP Input Example!</h2>
      <MuiOtpInput otpCode={otp2} onOtpCodeChange={setOtp2} />
    </div>
  );
}
