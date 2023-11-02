"use client"
import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons';
import { Button, Flex, Text } from '@radix-ui/themes';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react'
interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;

}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {

  const router = useRouter()
  const searchParams = useSearchParams()

  // const pageCount = Math.ceil(itemCount / pageSize)
  if (pageSize <= 1) return null

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString())
    router.push('?' + params.toString())

  }


  return (
    <Flex align={'center'} gap={'2'}>

      <Button 
           onClick={() => changePage(1)}
      color='gray' variant='soft' disabled={currentPage === 1}>
        <DoubleArrowLeftIcon />
      </Button>

      <Button
        onClick={() => changePage(currentPage-1)}
        color='gray' variant='soft' disabled={currentPage === 1}>
        <ChevronLeftIcon />
      </Button>

      <Text>Page {currentPage} of {pageSize}</Text>
      <Button
        onClick={() => changePage(currentPage+1)}

        color='gray' variant='soft' disabled={currentPage === pageSize}>
        <ChevronRightIcon />
      </Button>

      <Button 
       onClick={() => changePage(pageSize)}
      color='gray' variant='soft' disabled={currentPage === pageSize}>
        <DoubleArrowRightIcon />
      </Button>
    </Flex>
  )
}

export default Pagination