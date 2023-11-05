import prisma from "@/prisma/client";
import IssuesSummary from "./IssuesSummary";
import LatestIssues from "./LatestIssues";
import IssuesChart from "./IssuesChart";
import { Flex, Grid } from "@radix-ui/themes";
import { Metadata } from "next";

export default async function Home() {

  const openStatusCont = await prisma.issue.count({ where: { status: 'OPEN' } })
  const InProgressStatusCont = await prisma.issue.count({ where: { status: 'IN_PROGRESS' } })
  const ClosedStatusCont = await prisma.issue.count({ where: { status: 'CLOSED' } })

    console.log(openStatusCont)

  return (
    <Grid columns={{ initial: '1', md: '2' }} gap={'5'} align={'center'} justify={'center'}>
      <Flex direction={'column'} gap={'5'}>
        <IssuesSummary open={openStatusCont} closed={ClosedStatusCont} inProgress={InProgressStatusCont} />
  
  
        <IssuesChart open={openStatusCont} closed={ClosedStatusCont} inProgress={InProgressStatusCont} />
      </Flex>

      <LatestIssues />
      <LatestIssues />


    </Grid>
  )
}

export const dynamic = 'force-dynamic'

export const  metadata:Metadata ={
  title:'Issue Tracker - Dashborad',
  description:'View summary of project isssues'
};
