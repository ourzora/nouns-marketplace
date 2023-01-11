import { useCallback } from 'react'

import { Flex, Icon } from '@zord'

import { LoadMoreObserver } from './LoadMoreObserver'

interface NFTGridLoadMoreProps {
  showObserver?: boolean
  isValidating?: boolean
  handleLoadMore?: () => void
}

export const NFTGridLoadMore = ({
  showObserver,
  isValidating,
  handleLoadMore,
}: NFTGridLoadMoreProps) => {
  const handleVisible = useCallback(() => {
    if (showObserver && handleLoadMore) handleLoadMore()
  }, [handleLoadMore, showObserver])

  return (
    <Flex
      w="100%"
      className={[isValidating ? 'validating' : '']}
      position="relative"
      mb="x6"
    >
      {!isValidating && (
        <LoadMoreObserver
          position="absolute"
          bottom="x0"
          left="x0"
          h="x2"
          w="100%"
          handleVisible={handleVisible}
        />
      )}
      <Flex justify="center" py="x4" aria-hidden height="x16" w="100%">
        {isValidating && <Icon key="spinner" id="Spinner" color="icon1" size="lg" />}
      </Flex>
    </Flex>
  )
}
