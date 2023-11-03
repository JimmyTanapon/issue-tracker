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


  return (
    <Grid columns={{ initial: '1', md: '2' }} gap={'5'} align={'center'} justify={'center'}>
      <Flex direction={'column'} gap={'5'}>
        <IssuesSummary open={openStatusCont} closed={InProgressStatusCont} inProgress={ClosedStatusCont} />
  
  
        <IssuesChart open={openStatusCont} closed={InProgressStatusCont} inProgress={ClosedStatusCont} />
      </Flex>

      <LatestIssues />


    </Grid>
  )
}


export const  metadata:Metadata ={
  title:'Issue Tracker - Dashborad',
  description:'View summary of project isssues'
};
