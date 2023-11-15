import prisma from '@/prisma/client'
import { Heading, Flex, Card, Text, Avatar, Separator, Box } from '@radix-ui/themes'
import React from 'react'




const BlogComment = async ({ issueId }: { issueId: number }) => {


    const blogs = await prisma.comment.findMany({
        where: { issueId: issueId },
        include: {
            user: true
        }
    })
    return (
        <div className='max-w-4xl mt-5 '>
            <Heading size={'3'}>{blogs.length} Comment ⌨</Heading>
            <div className={
                blogs.length > 5 ? 'overflow-y-auto h-80'
                :''
            }>
                { blogs.map((blog) => (
                    
                        <Card size="2" className='prose w-full h-32 ' key={blog.id} >
                            <Box mb={'2'}>
                                <Flex align={'center'} gap={'2'}>
                                    <Avatar src={blog.user.image!}
                                        fallback='?'
                                        size={'1'}
                                        radius='full'
                                    />
                                    <Heading size={'1'}>{blog.user.name}</Heading>
                                </Flex>
                            </Box>
                            <Separator className="SeparatorRoot" style={{ margin: '5px 0', width: '100%' }} />
                            <Box mt={'4'}>
                                <Text as="p" size="3" color='red'>
                                    {blog.content}
                                </Text>
                            </Box>
                        </Card>
    
           
                ))}
            </div>
        </div>
    )
}

export default BlogComment