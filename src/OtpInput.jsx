import { forwardRef } from "react";
import { useOtpInput } from "./useOtpInput";

const DEFAULT_OTP_LENGTH = 6;

export const OtpInput = forwardRef((props, ref) => {
  const { otpCode, onOtpCodeChange, numDigits = DEFAULT_OTP_LENGTH } = props;

  const { inputPropsByIndex } = useOtpInput({
    otpCode,
    onOtpCodeChange,
    numDigits,
    ref
  });

  return (
    <div>
      <label htmlFor="otp-input-field">
        Enter the {numDigits}-digit OTP code:{" "}
      </label>
      {
        /*
         Finally we can use the array of refs to render the inputs, rather than a bogus empty array
        */
        inputPropsByIndex.map((inputProps, idx) => (
          <input
            style={{
              width: 30,
              marginRight: 10
            }}
            type="text"
            key={idx}
            {...inputProps}
          />
        ))
      }
    </div>
  );
});
