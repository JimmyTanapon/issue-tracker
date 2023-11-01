'use client'
import { Issue, User } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, {  useEffect, useState } from 'react'
import {Skeleton} from '@/app/components'
import toast,{Toaster} from 'react-hot-toast'

const AssigneeSelect = ({issue}:{issue:Issue}) => {
  const{data:users,error,isLoading}=  useQuery<User[]>({
        queryKey:['users'],
        queryFn:()=>axios.get('/api/users').then(res=>res.data),
        staleTime:60 *1000, // 60s
        retry:3 //  if  api  not working will call api 3 time
     });
     if(isLoading) return <Skeleton/>

     if(error) return null
    // // const [users, setUsers] = useState<User[]>([])
    // useEffect(() => {
    //     const fetchUsers = async () => {
    //         const { data } = await axios.get<User[]>('/api/users')
    //         // setUsers(data)
    //     }
    //     fetchUsers()

    // }, [])

     
    return (
        <>
            <Select.Root 
            defaultValue={issue.assignedToUserId || null }
            onValueChange={async(userId)=>{
                try {
              await  axios.patch(`/api/issues/${issue.id}`,{
                                assignedToUserId:userId || null
                            }) 
                            toast.success(' Assigned Successfully !')
                } catch (error) {
                    toast.error('Changes colud not be saved.')
                }
                
            }}>
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
            <Toaster/>
        </>
    )
}

export default AssigneeSelect