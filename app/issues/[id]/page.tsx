import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import prisma from '@/prisma/client'
import { Card, Flex, Heading, Text } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import React from 'react'

interface Props {
    params: { id: string }
}

const IssueDetaillPage = async ({ params }: Props) => {

    // if(typeof params.id !== 'number') notFound();

    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) }
    })
    if (!issue) {
        notFound()
    }
    return (
        <div>
            <Heading >{issue.title}</Heading>
          <Flex className=' space-x-3 my-2'>
                 <IssueStatusBadge status={issue.status} />
                 <Text>{issue.createAt.toDateString()}</Text>
          </Flex>
          <Card>
             <p>{issue.description}</p>
          </Card>
           
           

          


        </div>
    )
}

export default IssueDetaillPage