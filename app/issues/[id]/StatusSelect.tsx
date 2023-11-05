'use client'
import { Issue, Status } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import React from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'


interface Props {
    issueStatus: Issue

}

const StatusSelect = async ({ issueStatus }: Props) => {



    const ChangeStatus = async (stutus: string) => {
            const router=useRouter()

        try {
            await axios.patch(`/api/issues/${issueStatus.id}`, {
                status: stutus
            })
            toast.success(' Change Stauts Successfully !')
           
        } catch (error) {
            toast.error('Changes colud not be saved.')
          
        }
    }

    const statuss: {
        label: string;
        value: Status
    }[] = [
            { label: 'OPEN', value: 'OPEN' },
            { label: 'IN PROGRESS', value: 'IN_PROGRESS' },
            { label: 'CLOSED', value: 'CLOSED' },


        ]


    return (
        <Select.Root
            defaultValue={issueStatus.status}
            onValueChange={ChangeStatus}
        >
            <Select.Trigger />
            <Select.Content>
                <Select.Group>
                    <Select.Label>Issue Status</Select.Label>
                    {statuss.map((status) => (
                        <Select.Item key={status.value} value={status.value} >{status.label}</Select.Item>

                    ))}

                </Select.Group>
            </Select.Content>
        </Select.Root>
    )
}

export default StatusSelect