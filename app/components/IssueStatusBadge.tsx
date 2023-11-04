
import { Status ,Issue} from '@prisma/client'
import { Badge, Select } from '@radix-ui/themes'
import React from 'react'


interface Props{
    status:Status

}


const statusMap : Record<
Status,
{lable:string,color:'ruby'|'blue'|'green'}
>={
    OPEN:{lable:'Open',color:'ruby'},
    IN_PROGRESS:{lable:'Inprogress',color:'blue'},
    CLOSED:{lable:'Closed',color:'green'}
}
const IssueStatusBadge = ({status}:{status:Status}) => {

  return (

    <Badge color={statusMap[status].color}>
        {statusMap[status].lable}
    </Badge>
  )
}

export default IssueStatusBadge