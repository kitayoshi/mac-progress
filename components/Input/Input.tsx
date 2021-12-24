import { useEffect, useRef } from "react";
import cx from "classnames";

import styles from "./Input.module.css";

type InputProps = {
  className?: string;
  value: string;
  onChange: (value: string) => void;
};

function Input(props: InputProps) {
  const { className, value, onChange } = props;
  const inputElementRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!inputElementRef.current) return;
    inputElementRef.current.focus();
  }, []);

  return (
    <input
      ref={inputElementRef}
      className={cx(styles.root, className)}
      maxLength={1}
      value={value}
      onChange={(e) => {
        onChange(e.target.value);
      }}
      autoFocus
      placeholder="Input a character, like Option-Shift-K"
    />
  );
}

export default Input;
