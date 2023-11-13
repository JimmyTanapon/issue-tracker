'use client'
import { ErrorMessage } from '@/app/components'
import { TextField, Button, Box, Avatar, Checkbox, Flex, Popover, TextArea, Text } from '@radix-ui/themes'
import { register } from 'module'
import React from 'react'
import { Controller } from 'react-hook-form'
import SimpleMDE from 'react-simplemde-editor';
import "easymde/dist/easymde.min.css";
import { ChatBubbleIcon } from '@radix-ui/react-icons'



const IssueBlog = () => {

    return (
        <div className='max-w-2xl mt-5 '>
            <form className='space-y-3' >

                {/* 
            <Controller
                name='description'


                render={({ field }) => <SimpleMDE placeholder='Description here...' {...field} />}
            /> */}
                <SimpleMDE placeholder='Add your comment here...' autoFocus={true}
                    options={
                        {
                            minHeight: "70px",

                            status: false,
                        }

                    }
                />
                <Button >Comment</Button>
                <Box>
                    <Popover.Root>
                        <Popover.Trigger>
                            <Button variant="soft">
                                <ChatBubbleIcon width="16" height="16" />
                                Comment
                            </Button>
                        </Popover.Trigger>
                        <Popover.Content style={{ width: 800 }}>
                            <Flex gap="3">
                                <Avatar
                                    size="2"
                                    src="https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop"
                                    fallback="A"
                                    radius="full"
                                />
                                <Box grow="1">
                                    <SimpleMDE placeholder='Add your comment here...' autoFocus={true}
                                        options={
                                            {
                                                minHeight: "70px",

                                                status: false,
                                            }

                                        }
                                    />
                                    <Flex gap="3" mt="3" justify="between">
                                        <Flex align="center" gap="2" asChild>
                                            <Text as="label" size="2">
                                                <Checkbox />
                                                <Text>Send to group</Text>
                                            </Text>
                                        </Flex>

                                        <Popover.Close>
                                            <Button size="1">Comment</Button>
                                        </Popover.Close>
                                    </Flex>
                                </Box>
                            </Flex>
                        </Popover.Content>
                    </Popover.Root>
                </Box>
            </form></div>
    )
}

export default IssueBlog