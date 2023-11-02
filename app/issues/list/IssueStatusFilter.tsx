'use client'
import { Status } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

const statuses: { label: string, value?: Status }[] = [
    {label:'All'},
    { label: 'Open' ,value:'OPEN'}, 
    { label: 'In progress' ,value:'IN_PROGRESS'}, 
    { label: 'Closed' ,value:'CLOSED'}, 
   
]





const IssueStatusFilter = () => {
    const router = useRouter()
    const searchParams = useSearchParams()

    return (
        <Select.Root 
        defaultValue={searchParams.get('status')}
        onValueChange={(status)=>{
            const params = new URLSearchParams();
            console.log('urlparams',params)
            if(status) params.append('status',status)

            console.log('urlparams2',params)
            if(searchParams.get('orderBy')) params.append('orderBy',searchParams.get('orderBy')!)

            console.log('urlparams2',params.toString())

            const query =  params.size ? '?'+params.toString():''

            router.push('/issues/list'+query)

        }}>
            <Select.Trigger placeholder='Filter by status...' />
            <Select.Content>
              {
                statuses.map((status)=>(
                    <Select.Item value={status.value || null}>{status.label}</Select.Item>
                ))
              }
            </Select.Content>
        </Select.Root>
    )
}

export default IssueStatusFilter