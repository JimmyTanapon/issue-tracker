import prisma from "@/prisma/client";
import IssuesSummary from "./IssuesSummary";
import LatestIssues from "./LatestIssues";
import IssuesChart from "./IssuesChart";
import { Flex } from "@radix-ui/themes";

export default async function Home() {

  const openStatusCont = await prisma.issue.count({where:{status:'OPEN'}})
  const InProgressStatusCont = await prisma.issue.count({where:{status:'IN_PROGRESS'}})
  const ClosedStatusCont = await prisma.issue.count({where:{status:'CLOSED'}})


  return (
    <div>
      <IssuesSummary open={openStatusCont} closed={InProgressStatusCont} inProgress={ClosedStatusCont} />
     

          <IssuesChart open={openStatusCont} closed={InProgressStatusCont} inProgress={ClosedStatusCont} />
    
          <LatestIssues />
      
   
    </div>
  )
}
