import prisma from '@/prisma/client'
import { Avatar, Card, Flex, Heading, Table } from '@radix-ui/themes'
import React from 'react'
import { IssueStatusBadge } from './components'
import Link from 'next/link'
import { AvatarIcon } from '@radix-ui/react-icons'

const LatestLssues = async () => {
    const issues = await prisma.issue.findMany({
        orderBy: { createAt: 'desc' },
        take: 5,
        include: {
            assignedToUser: true
        }
    })
    return (
        <Card>
            <Heading size={'4'} mb={'5'}>Lastest Issues</Heading>
            <Table.Root>
                <Table.Body>
                    {issues.map(issues => (
                        <Table.Row key={issues.id}>
                           
                                <Table.Cell>
                                <Flex justify={'between'}>
                                    <Flex direction={'column'} gap={'2'} align={'start'}>
                                        <Link href={`/issues/${issues.id}`}>
                                            {issues.title}
                                        </Link>
                                        <IssueStatusBadge status={issues.status} />
    
                                    </Flex>
                                    {issues.assignedToUser && (
                                    <Avatar src={issues.assignedToUser.image!}
                                        fallback='?' 
                                        size={'2'}
                                        radius='full'
                                        />
                                )}
                                    </Flex>
                                </Table.Cell>
                                
                           
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </Card>
    )
}

export default LatestLssues