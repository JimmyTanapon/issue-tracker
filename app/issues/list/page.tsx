import React from 'react'
import prisma from '@/prisma/client'
import IssueAction from './IssueAction'
import { Status } from '@prisma/client'
import Pagination from '@/app/components/Pagination'
import IssueTable, { IssueQuery } from './IssueTable'
import { columnsNames } from './IssueTable'
import { Flex } from '@radix-ui/themes'
import { Metadata } from 'next'


interface Props {
  searchParams:IssueQuery

  
}

const IssuesPage = async ({ searchParams }: Props) => {

  // const issues = await prisma.issue.findMany()

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;




  const statuses = Object.values(Status)
  const status = statuses.includes(searchParams.status) ? searchParams.status : undefined;


  const orderBy = columnsNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]:searchParams.sortBy}
    : undefined

  const where = { status }

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize

  })
  const issuesCount = await prisma.issue.count({
    where
  })
  const pageCount = Math.ceil(issuesCount / pageSize)
  return (
    <Flex direction={'column'}  gap={'3'}>
      <IssueAction />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Pagination currentPage={page} itemCount={issuesCount} pageSize={pageCount} />
    </Flex >
  )
}
// export const dynamic = 'force-dynamic'

export const  metadata:Metadata ={
  title:'Issue Tracker - Issue List',
  description:'View all  project isssues'
};

export default IssuesPage