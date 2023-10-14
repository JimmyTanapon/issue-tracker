'use client'

import { Button, TextArea, TextField } from '@radix-ui/themes'
import React from 'react'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';



interface IssueForm {
  title: string,
  description: string
}
const NewIssuePage = () => {
  const router = useRouter()
  const { register, control,handleSubmit} = useForm<IssueForm>()


  return (
    <form className=' max-w-xl space-y-3' onSubmit={handleSubmit(async(data)=>{
     await axios.post('/api/issues',data)
     router.push('/issues')
    })}>
      <TextField.Root>
        <TextField.Input placeholder='Title' {...register('title')} />
      </TextField.Root>
      <Controller
        name='description'
        control={control}
        render={({field}) => <SimpleMDE placeholder='Description here...' {...field}/>}
      />

      <Button>Submit New issue</Button>
    </form>
  )
}

export default NewIssuePage