import { useCallback, useEffect, useMemo, useState } from 'react'

export type PaginationProps = {
  // The initial index
  initialIndex?: number
  // The total number of results
  length: number
  // Allow to loop backwards and forwards
  loop?: boolean
  // The number of items per page
  maxPerPage?: number
  // number of proximity pages to show
  proximityMax?: number
}

export type PaginationActions = {
  first: () => void
  last: () => void
  next: () => void
  previous: () => void
  set: (index: number) => void
}

export type PaginationState = {
  actions: PaginationActions
  displayIndex: number
  index: number
  previous: number
  next: number
  isFirst: boolean
  isLast: boolean
  percent: number
  proximity: number[]
  totalPages: number
}

// List of page numbers to show

function getProximityList(index: number, totalPages: number, max: number): number[] {
  const items: number[] = Array.from(Array(totalPages).keys())
  const last: number = totalPages - 1

  // Placeholder to id the gap
  const placeholder: number = -1

  // small list
  if (totalPages - 1 <= max) return items

  // start
  if (index < max) return [...items.slice(0, max), placeholder, last]

  // end
  if (index > totalPages - (max + 1))
    return [0, placeholder, ...items.slice(totalPages - max, totalPages)]

  // middle
  return [...items.slice(index - (max - 1), index + 1), placeholder, last]
}

export function usePagination({
  initialIndex = 0,
  length,
  loop = false,
  maxPerPage = 1,
  proximityMax = 3,
}: PaginationProps): PaginationState {
  const [index, setIndex] = useState<number>(initialIndex)

  const totalPages: number = useMemo(
    () => Math.ceil(length / maxPerPage),
    [length, maxPerPage]
  )

  // If length changes, reset index
  useEffect(() => setIndex(0), [length])

  const isFirst: boolean = index === 0
  const isLast: boolean = index === totalPages - 1

  const prevIndex: number = index - 1
  const loopPrevious: number = (prevIndex + totalPages) % totalPages
  const previous: number = loop ? loopPrevious : isFirst ? index : prevIndex

  const nextIndex: number = index + 1
  const loopNext: number = nextIndex % totalPages
  const next: number = loop ? loopNext : isLast ? index : nextIndex

  const percent: number = index / totalPages

  const proximity: number[] = useMemo(
    () => getProximityList(index, totalPages, proximityMax),
    [index, proximityMax, totalPages]
  )

  // Actions
  const firstPage = useCallback(() => setIndex(0), [])
  const lastPage = useCallback(() => setIndex(totalPages - 1), [totalPages])
  const nextPage = useCallback(() => setIndex(next), [next])
  const previousPage = useCallback(() => setIndex(previous), [previous])

  return {
    index,
    displayIndex: index + 1,
    previous,
    next,
    isFirst,
    isLast,
    percent,
    proximity,
    totalPages,
    actions: {
      set: setIndex,
      first: firstPage,
      last: lastPage,
      next: nextPage,
      previous: previousPage,
    },
  }
}
