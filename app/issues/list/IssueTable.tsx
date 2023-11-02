import { IssueStatusBadge } from '@/app/components'
import { Issue, Status } from '@prisma/client'
import { ArrowUpIcon } from '@radix-ui/react-icons'
import { Table } from '@radix-ui/themes'
import {Link} from '@/app/components'
import React from 'react'
import NextLink from 'next/link'


export interface  IssueQuery {
    status: Status,
    orderBy: keyof Issue,
    page: string
}

interface Props {
    searchParams: IssueQuery
    issues: Issue[]
}



const IssueTable = ({ searchParams, issues }: Props) => {




    return (
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
    )
}

export default IssueTable
const columns: {
    label: string;
    value: keyof Issue;
    className?: string
}[] = [
        { label: 'Issues', value: 'title' },
        { label: 'Status', value: 'status', className: 'hidden md:table-cell' },
        { label: 'Created', value: 'createAt', className: 'hidden md:table-cell' }

]

export  const  columnsNames = columns.map((column)=>column.value)