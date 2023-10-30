
import prisma from '@/prisma/client'
import { Box, Flex, Grid } from '@radix-ui/themes'
import { notFound } from 'next/navigation'

import React from 'react'

import IssueDetails from './IssueDetails'
import EditissueButton from './EditIssueButton'
import DeleteIssueButton from './DeleteIssueButton'
import { getServerSession } from 'next-auth'


interface Props {
    params: { id: string }
}

const IssueDetaillPage = async ({ params }: Props) => {
    const session = await getServerSession()

    // if(typeof params.id !== 'number') notFound();

    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) }
    })
    if (!issue) {
        notFound()
    }

    return (
        <Grid columns={{ initial: '1', sm: '5' }} gap={'5'}>
            <Box className='md:col-span-4 s'>
                <IssueDetails issue={issue} />
            </Box>
            {session && (<Box>
                <Flex direction={'column'} gap={'4'}>
                    <EditissueButton issueId={issue.id} />
                    <DeleteIssueButton issueId={issue.id} />
                </Flex>
            </Box>)}
        </Grid>
    )
}

export default IssueDetaillPage