import cx from 'classnames'
import { useState, useCallback } from 'react'

import { Range, Unit, rangeList, getRangeUnitList } from '../../utils/time'

import styles from './Setting.module.css'

type SettingProps = {
  className?: string
  showSymbolPreset: boolean
  alwaysShow: boolean
  range: Range
  unit: Unit
  onSelectSymbol: (symbol: string) => void
  onReset: () => void
  onRangeChange: (range: Range) => void
  onUnitChange: (unit: Unit) => void
}

function Setting(props: SettingProps) {
  const {
    className,
    showSymbolPreset,
    alwaysShow,
    range,
    unit,
    onSelectSymbol,
    onReset,
    onRangeChange,
    onUnitChange,
  } = props
  const [hover, setHover] = useState(false)

  const toggleFullScreen = useCallback(() => {
    if (!window.document.fullscreenElement) {
      window.document.documentElement.requestFullscreen()
    } else {
      window.document.exitFullscreen?.()
    }
  }, [])

  return (
    <div
      className={cx(styles.root, className, {
        [styles.show]: alwaysShow || hover,
      })}
      onMouseEnter={() => {
        setHover(true)
      }}
      onMouseLeave={() => {
        setHover(false)
      }}
    >
      {showSymbolPreset && (
        <div className={styles.list}>
          <div className={styles.hint}>Symbol you may like:</div>
          {['🎄', '🍎', '🍏', '🏖️'].map((s) => (
            <button
              key={s}
              className={cx(styles.item, styles.itemActive)}
              onClick={() => {
                onSelectSymbol(s)
              }}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      <div className={styles.list}>
        <div className={styles.hint}>Progress of current</div>
        {rangeList.map((r) => (
          <button
            key={r}
            className={cx(styles.item, { [styles.itemActive]: range === r })}
            onClick={() => {
              onRangeChange(r)
              const unitList = getRangeUnitList(r)
              onUnitChange(unitList[unitList.length - 1] as Unit)
            }}
          >
            {r}
          </button>
        ))}
      </div>

      <div className={styles.list}>
        <div className={styles.hint}>in</div>
        {getRangeUnitList(range).map((u) => (
          <button
            key={u}
            className={cx(styles.item, { [styles.itemActive]: unit === u })}
            onClick={() => {
              onUnitChange(u as Unit)
            }}
          >
            {u}
          </button>
        ))}
      </div>

      <div>
        <button className={styles.item} onClick={toggleFullScreen}>
          Full Screen
        </button>
        <button className={styles.item} onClick={onReset}>
          Reset
        </button>
        <a
          className={styles.item}
          href="https://github.com/kitayoshi/mac-progress"
          target="_blank"
          rel="noreferrer"
        >
          Github
        </a>
        <a
          className={styles.item}
          href="https://twitter.com/kitayoshi_son"
          target="_blank"
          rel="noreferrer"
        >
          Kitayoshi
        </a>
      </div>
    </div>
  )
}

export default Setting
