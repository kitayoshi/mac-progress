import { useCallback, useEffect, useState } from 'react'
import cx from 'classnames'
import type { NextPage } from 'next'
import Head from 'next/head'

import Input from '../components/Input'
import Setting from '../components/Setting'
import TimeProgress from '../components/TimeProgress'
import { Range, Unit } from '../utils/time'

import styles from '../styles/Home.module.css'

const defaultRange = 'Minute'
const defaultUnit = 'Second'

const Home: NextPage = () => {
  const [theme, setTheme] = useState('dark')
  const [symbol, setSymbol] = useState('')
  const [range, setRange] = useState<Range>(defaultRange)
  const [unit, setUnit] = useState<Unit>(defaultUnit)

  const [init, setInit] = useState(false)
  useEffect(() => {
    const storageSymbol = window.localStorage.getItem('progressSymbol')
    const storageRange = window.localStorage.getItem('progressRange')
    const storageUnit = window.localStorage.getItem('progressUnit')
    if (storageSymbol) setSymbol(storageSymbol)
    if (storageRange) setRange(storageRange as Range)
    if (storageUnit) setUnit(storageUnit as Unit)
    setInit(true)
  }, [])

  const changeSymbol = useCallback((s: string) => {
    window.localStorage.setItem('progressSymbol', s)
    setSymbol(s)

    if (!window.document.fullscreenElement) {
      window.document.documentElement.requestFullscreen()
    }
  }, [])

  const changeRange = useCallback((r: Range) => {
    window.localStorage.setItem('progressRange', r)
    setRange(r)
  }, [])

  const changeUnit = useCallback((u: Unit) => {
    window.localStorage.setItem('progressUnit', u)
    setUnit(u)
  }, [])

  useEffect(() => {
    setTheme(symbol === '🎄' ? 'christmas' : 'dark')

    if (symbol === '🎄') {
      changeRange('Year')
      changeUnit('Day')
    }
  }, [symbol, changeRange, changeUnit])

  const reset = useCallback(() => {
    if (window.document.fullscreenElement) {
      window.document.exitFullscreen?.()
    }
    window.localStorage.removeItem('progressSymbol')
    window.localStorage.removeItem('progressRange')
    window.localStorage.removeItem('progressUnit')
    setSymbol('')
    setRange(defaultRange)
    setUnit(defaultUnit)
  }, [])

  useEffect(() => {
    window.document.addEventListener('keydown', (e) => {
      if (e.code === 'Escape') {
        reset()
      }
    })
  }, [reset])

  return (
    <div className={styles.container}>
      <Head>
        <title>Mac Progress</title>
        <meta name="description" content="Progress in Mac Style" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main
        className={cx(styles.main, {
          [styles.themeChristmas]: theme === 'christmas',
        })}
      >
        {!symbol && <Input value={symbol} onChange={changeSymbol} />}

        {symbol && (
          <div className={styles.progressContainer}>
            <div className={styles.symbol}>{symbol}</div>

            <TimeProgress
              className={styles.progress}
              range={range}
              unit={unit}
            />
          </div>
        )}

        <Setting
          alwaysShow={!Boolean(symbol) && init}
          onSelectSymbol={changeSymbol}
          className={styles.setting}
          range={range}
          unit={unit}
          onRangeChange={changeRange}
          onUnitChange={changeUnit}
          onReset={reset}
        />
      </main>
    </div>
  )
}

export default Home
