import {
  startOfMinute,
  endOfMinute,
  startOfHour,
  endOfHour,
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
  differenceInSeconds,
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
  differenceInWeeks,
  differenceInMonths,
  differenceInYears,
} from 'date-fns'

export const rangeList = [
  'Minute',
  'Hour',
  'Day',
  'Week',
  'Month',
  'Year',
  'Century',
] as const

export type Range = typeof rangeList[number]

export function getStartEnd(current: Date, range: Range) {
  if (range === 'Minute') return [startOfMinute(current), endOfMinute(current)]
  if (range === 'Hour') return [startOfHour(current), endOfHour(current)]
  if (range === 'Day') return [startOfDay(current), endOfDay(current)]
  if (range === 'Week') return [startOfWeek(current), endOfWeek(current)]
  if (range === 'Month') return [startOfMonth(current), endOfMonth(current)]
  if (range === 'Year') return [startOfYear(current), endOfYear(current)]
  if (range === 'Century')
    return [new Date(946684800000), new Date(4102444799000)]
  return []
}

export const unitList = [
  'Second',
  'Minute',
  'Hour',
  'Day',
  'Week',
  'Month',
  'Year',
] as const

export type Unit = typeof unitList[number]

export function getRelativeValue(left: Date, right: Date, unit: Unit) {
  if (unit === 'Second') return differenceInSeconds(left, right)
  if (unit === 'Minute') return differenceInMinutes(left, right)
  if (unit === 'Hour') return differenceInHours(left, right)
  if (unit === 'Day') return differenceInDays(left, right)
  if (unit === 'Week') return differenceInWeeks(left, right)
  if (unit === 'Month') return differenceInMonths(left, right)
  if (unit === 'Year') return differenceInYears(left, right)
  return 0
}

export function getRangeUnitList(range: Range) {
  if (range === 'Minute') return ['Second']
  if (range === 'Hour') return ['Second', 'Minute']
  if (range === 'Day') return ['Second', 'Minute', 'Hour']
  if (range === 'Week') return ['Second', 'Minute', 'Hour', 'Day']
  if (range === 'Month') return ['Second', 'Minute', 'Hour', 'Day', 'Week']
  if (range === 'Year')
    return ['Second', 'Minute', 'Hour', 'Day', 'Week', 'Month']
  if (range === 'Century') return unitList

  return []
}

export function getLeftUnit(unit: Unit) {
  if (unit === 'Second') return 'Second'
  const index = unitList.findIndex((u) => u === unit)
  return unitList[index - 1]
}
