import prisma from '@/prisma/client'
import { Heading, Flex, Card, Text, Avatar, Inset, Strong, Separator, Box, Theme } from '@radix-ui/themes'
import React from 'react'
import ReactMarkdown from 'react-markdown'



const BlogComment = async ({ issueId }: { issueId: number }) => {


    const blogs = await prisma.comment.findMany({
        where: { issueId: issueId },
        include: {
            user: true
        }
    })
    return (
        <div >
            {blogs.map((blog) => (
                <div key={blog.id} className=' m-5 '>
                    <Flex gap={'2'} >
                        <Avatar src={blog.user.image!}
                            fallback='?'
                            size={'2'}
                            radius='full'
                        />
                       
                        <Card size="2" className='prose w-3/4 h-32 '  >

                                <Box>
                                    <Heading size={'2'}>{blog.user.name}</Heading>
    
                                    <Separator className="SeparatorRoot" style={{ margin: '5px 0', width: '100%' }} />
    
                                </Box>
                                <Box mt={'4'}>
    
                                    <Text as="p" size="3" color='red'>
                                        {blog.content}
                                    </Text>
    
                                </Box>
    
                         
                        </Card> 
                    </Flex>
                </div>
            ))}
        </div>
    )
}

export default BlogComment