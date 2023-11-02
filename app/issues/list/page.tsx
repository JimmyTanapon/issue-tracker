import React from 'react'
import { Flex, Table } from '@radix-ui/themes'
import { Link, IssueStatusBadge } from '@/app/components'
import prisma from '@/prisma/client'
import IssueAction from './IssueAction'
import { Issue, Status } from '@prisma/client'
import NextLink from 'next/link'
import { ArrowUpIcon } from '@radix-ui/react-icons'
import { title } from 'process'
import Pagination from '@/app/components/Pagination'

interface Props {
  searchParams: {
    status: Status,
    orderBy: keyof Issue,
    page:string

  }
}

const IssuesPage = async ({ searchParams }: Props) => {
  const columns: {
    label: string;
    value: keyof Issue;
    className?: string
  }[] = [
      { label: 'Issues', value: 'title' },
      { label: 'Status', value: 'status', className: 'hidden md:table-cell' },
      { label: 'Created', value: 'createAt', className: 'hidden md:table-cell' }

    ]
  // const issues = await prisma.issue.findMany()

    const page = parseInt(searchParams.page) || 1;
    const pageSize =10;
   



  const statuses = Object.values(Status)
  const status = statuses.includes(searchParams.status) ? searchParams.status : undefined;

  const orderBy = columns
    .map((column) => column.value)
    .includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: 'asc' }
    : undefined

  const where = {status}

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip:(page-1)*pageSize,
    take:pageSize

  })
  const issuesCount = await  prisma.issue.count({
    where
  })
  const pageCount = Math.ceil(issuesCount / pageSize)
  return (
    <div>
      <IssueAction />
      <Table.Root variant='surface'>
        <Table.Header >
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell className={column.className} key={column.value}>


                <NextLink href={{
                  query: { ...searchParams, orderBy: column.value }
                }}> {column.label}
                </NextLink>
                {column.value === searchParams.orderBy && <ArrowUpIcon className='  inline' />}

              </Table.ColumnHeaderCell>
            ))}


          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>

                <span className=' font-semibold'>  <Link href={`/issues/${issue.id}`} >{issue.title}</Link></span>
                <div className=' block md:hidden'>
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className=' hidden md:table-cell'>
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className=' hidden md:table-cell'>{issue.createAt.toDateString()}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <Pagination currentPage={page} itemCount={issuesCount} pageSize={pageCount}/>
    </div>
  )
}
export const dynamic = 'force-dynamic'
export default IssuesPage