import { forwardRef } from "react";
import { useOtpInput } from "./useOtpInput";
import { TextField } from "@mui/material";

const DEFAULT_OTP_LENGTH = 6;

export const MuiOtpInput = forwardRef((props, ref) => {
  const { otpCode, onOtpCodeChange, numDigits = DEFAULT_OTP_LENGTH } = props;

  const { inputPropsByIndex } = useOtpInput({
    otpCode,
    onOtpCodeChange,
    numDigits,
    ref
  });

  return (
    <div>
      <p>Enter the {numDigits}-digit OTP code: </p>
      {inputPropsByIndex.map((inputProps, idx) => {
        /*
          The MUI TextField accepts a prop inputRef to reach the underlying input
          Since our custom hook returns it as ref, we can't just spread the props.
          So we extract the ref, and pass it to TextField as inputRef.
          */
        const { ref, ...restProps } = inputProps;
        return (
          <span key={idx}>
            <TextField
              sx={{ width: 40, mr: 2 }}
              variant="filled"
              inputRef={ref}
              {...restProps}
            />
          </span>
        );
      })}
    </div>
  );
});
