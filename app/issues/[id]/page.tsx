
import prisma from '@/prisma/client'
import { Box, Container, Flex, Grid, Separator } from '@radix-ui/themes'
import { notFound } from 'next/navigation'

import React, { cache } from 'react'

import IssueDetails from './IssueDetails'
import EditissueButton from './EditIssueButton'
import DeleteIssueButton from './DeleteIssueButton'
import { getServerSession } from 'next-auth'
import AssigneeSelect from './AssigneeSelect'
import StatusSelect from './StatusSelect'
import dynamic from 'next/dynamic'
import IssueFormSkeleton from '../_components/IssueFormSkeleton'
import BlogComment from './BlogComment'


interface Props {
    params: { id: string }
}
const fetchUser = cache((issueId: number) => prisma.issue.findUnique({ where: { id: issueId } }))

const IssueBlog = dynamic(() => import('@/app/issues/_components/IssueBlog'),
    {
        ssr: false,
        loading: () => <IssueFormSkeleton />
    })

const IssueDetaillPage = async ({ params }: Props) => {
    const session = await getServerSession()

    const userEmail = session?.user?.email
    const getUserId = await prisma.user.findUnique({
        where: { email: userEmail! }
    })

    // if(typeof params.id !== 'number') notFound();
    const issue = await fetchUser(parseInt(params.id))
    if (!issue) {
        notFound()
    }



    return (
        <Container>
            <Grid columns={{ initial: '1', sm: '5' }} gap={'5'}>

                <Box className='md:col-span-4 s'>
                    <IssueDetails issue={issue} />
                    <BlogComment issueId={issue.id} />
                    <Separator className="SeparatorRoot" style={{ margin: '5px 0', width: '100%' }} />
                    <IssueBlog params={params} session={getUserId} />
                </Box>

                {session && (<Box>
                    <Flex direction={'column'} gap={'4'}>
                        <StatusSelect issueStatus={issue} />
                        <AssigneeSelect issue={issue} />
                        <EditissueButton issueId={issue.id} />
                        <DeleteIssueButton issueId={issue.id} />


                    </Flex>

                </Box>)}



            </Grid>
        </Container>
    )
}


export default IssueDetaillPage

export async function generateMetadata({ params }: Props) {
    const issue = await fetchUser(parseInt(params.id))
    return {
        title: issue?.title,
        description: 'Details of  issue' + issue?.id
    }
}