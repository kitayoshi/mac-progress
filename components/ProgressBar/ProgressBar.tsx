import cx from 'classnames'

import styles from './ProgressBar.module.css'

type ProgressBarProps = {
  className?: string
  start: number
  current: number
  end: number
}

function ProgressBar(props: ProgressBarProps) {
  const { className, start, current, end } = props

  const progress = (current - start) / (end - start)

  return (
    <div className={styles.root}>
      <div className={styles.background} />
      <div className={styles.inner} style={{ width: `${progress * 100}%` }} />
    </div>
  )
}

export default ProgressBar
