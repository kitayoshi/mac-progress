import { useRef, useEffect, useState, useCallback, useMemo } from "react";
import cx from "classnames";

import {
  Range,
  Unit,
  getStartEnd,
  getRelativeValue,
  getLeftUnit,
} from "../../utils/time";
import ProgressBar from "../ProgressBar";

import styles from "./TimeProgress.module.css";

type TimeProgressProps = {
  range: Range;
  unit: Unit;
  className?: string;
};

function TimeProgress(props: TimeProgressProps) {
  const { className, range, unit } = props;

  const [start, setStart] = useState<Date>(getStartEnd(new Date(), range)[0]);
  const [end, setEnd] = useState<Date>(getStartEnd(new Date(), range)[1]);
  const [current, setCurrent] = useState<Date>(start);

  const intervalRef = useRef<number>();

  const updateTime = useCallback(() => {
    const current = new Date();
    const [start, end] = getStartEnd(current, range);
    setCurrent(current);
    setStart(start);
    setEnd(end);
  }, [range]);

  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      updateTime();
    }, 1000);
    return () => {
      window.clearInterval(intervalRef.current);
    };
  }, [updateTime]);

  useEffect(() => {
    updateTime();
  }, [range, updateTime]);

  const formatter = useCallback(
    (left: Date, right: Date) => {
      let value = getRelativeValue(left, right, unit);
      let finalUnit = unit;

      // prohibit "in 0 month"
      if (value === 0) {
        finalUnit = getLeftUnit(finalUnit);
        value = getRelativeValue(left, right, finalUnit);
      }

      return new Intl.RelativeTimeFormat(undefined, {
        numeric: "always",
      }).format(
        -value,
        finalUnit.toLocaleLowerCase() as Intl.RelativeTimeFormatUnit
      );
    },
    [unit]
  );

  const hint = useMemo(() => {
    if (start === current) return null;
    return `${formatter(current, end)}…`;
  }, [start, current, end, formatter]);

  return (
    <div className={cx(styles.root, className)}>
      <ProgressBar
        className={className}
        start={start.getTime()}
        end={end.getTime()}
        current={current.getTime()}
      />
      <div className={styles.hint}>{hint}</div>
    </div>
  );
}

export default TimeProgress;
