
import prisma from '@/prisma/client'
import { Box, Grid } from '@radix-ui/themes'
import { notFound } from 'next/navigation'

import React from 'react'

import EditissueButton from './EditissueButton'
import IssueDetails from './IssueDetails'


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
        <Grid columns={{ initial: '1', md: '2' }} gap={'5'}>
            <Box>
                <IssueDetails issue={issue} />
            </Box>
            <Box>
                <EditissueButton issueId={issue.id} />
            </Box>
        </Grid>
    )
}

export default IssueDetaillPage