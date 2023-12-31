'use client'
import { ErrorMessage, Spinner } from '@/app/components'
import { TextField, Button, Box, Avatar, Checkbox, Flex, Popover, TextArea, Text, Callout, Heading } from '@radix-ui/themes'
import { register } from 'module'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod';

import SimpleMDE from 'react-simplemde-editor';
import "easymde/dist/easymde.min.css";
import { ChatBubbleIcon } from '@radix-ui/react-icons'
import { commentSchemaForm } from '@/app/validationSchema'
import { zodResolver } from '@hookform/resolvers/zod'

import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import prisma from '@/prisma/client'
import { Session } from 'next-auth'
import { useRouter } from 'next/navigation'



type CommentFormData = z.infer<typeof commentSchemaForm>

interface Props {
    session: {
        id: string;
        name: string | null;
        email: string | null;
        emailVerified: Date | null;
        image: string | null;
    } | null
    params: { id: string }
}
const IssueBlog = ({ params, session }: Props) => {

    const [errorState, setError] = useState('')
    const [isSubmiting, setIsSubmiting] = useState(false)
    const [commentValue, setcommentValue] = useState('')

    const { register, control, handleSubmit, formState: { errors } } = useForm<CommentFormData>({
        resolver: zodResolver(commentSchemaForm)
    })
    const router = useRouter()
    const handleOnChange = (e: any) => {

        setcommentValue(e.target.value)
    }



    return (
        <div className='max-w-3xl  w-full mt-5 '>
            <Heading size={'3'}> Suggest an answer</Heading>
            <Box grow="1" mt={'5'}>
                {errorState &&
                    <Callout.Root color='red' className=' mb-5'>
                        <Callout.Text>{errorState}</Callout.Text>
                    </Callout.Root>}
                <form className='space-y-3' onSubmit={handleSubmit(async (data) => {
                    try {
                        setIsSubmiting(true)
                        await axios.post(`/api/issues/${params.id}`, {
                            userId: session?.id,
                            content: data.content
                        })
                        setcommentValue('')
                        router.refresh()



                    } catch (error) {

                        setError('An unexpected  error occurred.')

                    } finally {
                        setIsSubmiting(false)
                    }
             
                })}>
                    {<ErrorMessage>{errors.content?.message}</ErrorMessage>}
                    <TextArea  placeholder="Write a comment…" style={{ height: 150 }} {...register('content')} value={commentValue} onChange={handleOnChange} />
                    <Flex gap="3" mt="3" justify="end">
                        <Button variant="soft" disabled={isSubmiting || commentValue==''}>
                            <ChatBubbleIcon width="16" height="16" />
                            {isSubmiting && <Spinner />}  Comment
                        </Button>
                    </Flex>
                </form>
            </Box>


        </div>
    )
}

export default IssueBlog

