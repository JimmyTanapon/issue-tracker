'use client'
import { Issue, User } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { Skeleton } from '@/app/components'
import toast, { Toaster } from 'react-hot-toast'
import StatusSelect from './StatusSelect'



const AssigneeSelect = ({ issue }: { issue: Issue }) => {
    const { data: users, error, isLoading } = useUser();
    if (isLoading) return <Skeleton />

    if (error) return null


    const assignedIssue = async (userId: string) => {
        let ChageStatus = 'IN_PROGRESS'
        if (userId === '') ChageStatus = 'OPEN'
        try {
            await axios.patch(`/api/issues/${issue.id}`, {
                assignedToUserId: userId || null,
                status: ChageStatus
            })
            toast.success(' Assigned Successfully !')
        } catch (error) {
            toast.error('Changes colud not be saved.')
        }
    }

    return (
        <>

            <Select.Root
                defaultValue={issue.assignedToUserId || ''}
                onValueChange={assignedIssue}>
                <Select.Trigger placeholder='Assign...' />
                <Select.Content>
                    <Select.Group>
                        <Select.Label>
                            Suggestions
                        </Select.Label>
                        <Select.Item value={null}>Unassigned</Select.Item>
                        {users?.map((user) => {
                            return (
                                <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>
                            )
                        })}

                    </Select.Group>
                </Select.Content>
            </Select.Root>

            <Toaster />
        </>
    )
}
const useUser = () => useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => axios.get('/api/users').then(res => res.data),
    staleTime: 60 * 1000, // 60s
    retry: 3 //  if  api  not working will call api 3 time
});

export default AssigneeSelect
