import { IssueStatusBadge } from '@/app/components'
import { Issue } from '@prisma/client'
import { Heading, Flex, Card ,Text} from '@radix-ui/themes'
import React from 'react'
import ReactMarkdown from 'react-markdown'



const IssueDetails = ({issue}:{issue:Issue}) => {
    return (
        <div className=' max-w-4xl'> 
            <Heading >{issue.title}</Heading>
            <Flex className=' space-x-3 my-2'>
                <IssueStatusBadge status={issue.status} />
                <Text>{issue.createAt.toDateString()}</Text>
            </Flex>
            <Card className='prose max-w-full ' mt={'4'}>
                <ReactMarkdown>{issue.description}</ReactMarkdown>
            </Card></div>
    )
}

export default IssueDetails