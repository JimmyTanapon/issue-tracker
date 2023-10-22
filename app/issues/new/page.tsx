'use client'

import { Button, Callout, Text, TextArea, TextField } from '@radix-ui/themes'
import React, { useState } from 'react'
import dynamic from 'next/dynamic';
import "easymde/dist/easymde.min.css";
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod'
import { CreateIssueSchma } from '@/app/validationSchema';
import { z } from 'zod';
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';


const SimpleMDE = dynamic(()=>import("react-simplemde-editor"),
{ssr:false})

type IssueForm = z.infer<typeof CreateIssueSchma>


// interface IssueForm {
//   title: string,
//   description: string
// }
const NewIssuePage = () => {
  const router = useRouter()
  const [error, setError] = useState('')
  const [isSubmiting, setIsSubmiting] = useState(false)
  const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({
    resolver: zodResolver(CreateIssueSchma)
  })


  return (
    <div className='max-w-xl'>
      {error &&
        <Callout.Root color='red' className=' mb-5'>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>}
      <form className='  space-y-3' onSubmit={handleSubmit(async (data) => {
        try {
          setIsSubmiting(true)
          await axios.post('/api/issues', data)
          router.push('/issues')
        } catch (error) {
          setIsSubmiting(false)
          setError('An unexpected  error occurred.')
        }

      })}>
        <TextField.Root>
          <TextField.Input placeholder='Title'  {...register('title')} />
        </TextField.Root>
        {<ErrorMessage >{errors.title?.message}</ErrorMessage>}
        <Controller
          name='description'
          control={control}
          render={({ field }) => <SimpleMDE placeholder='Description here...' {...field} />}
        />
        {<ErrorMessage>{errors.description?.message}</ErrorMessage>}

          <Button disabled={isSubmiting}>{isSubmiting && <Spinner/>}Submit New issue</Button>
      </form>
    </div>

  )
}

export default NewIssuePage