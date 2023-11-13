"use client"
import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons';
import { Button, Flex, Text } from '@radix-ui/themes';
import { useRouter, useSearchParams } from 'next/navigation';
import SelectPage from './SelectPage';
interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;

}

const Pagination = ({ pageSize, currentPage }: Props) => {

  const router = useRouter()
  const searchParams = useSearchParams()
  const firstPageDisabled = currentPage === 1
  const lastPageDisabled = currentPage === pageSize

  if (pageSize <= 1) return null



  const changePage = (page: number) => {

    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString())
    router.push('?' + params.toString())



  }


  return (
    <Flex align={'center'} gap={'2'}>
      <Text>Page {currentPage} of {pageSize}</Text>
      <Button
        onClick={() => changePage(1)}
        color='yellow' variant='soft' disabled={firstPageDisabled}>
        <DoubleArrowLeftIcon />
      </Button>

      <Button
        onClick={() => changePage(currentPage - 1)}
        color='gold' variant='soft' disabled={firstPageDisabled}>
        <ChevronLeftIcon />
      </Button>

      <Button
        onClick={() => changePage(currentPage + 1)}

        color='yellow' variant='soft' disabled={lastPageDisabled}>
        <ChevronRightIcon />
      </Button>

      <Button
        onClick={() => changePage(pageSize)}
        color='yellow' variant='soft' disabled={lastPageDisabled}>
        <DoubleArrowRightIcon />
      </Button>
      <SelectPage changePage={changePage} currentPage={currentPage} pageSize={pageSize} />

    </Flex>
  )
}

export default Pagination