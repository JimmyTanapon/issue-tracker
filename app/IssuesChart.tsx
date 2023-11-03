'use client'
import { Card } from '@radix-ui/themes';
import React from 'react'
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar } from 'recharts'

interface Props {
    open: number;
    inProgress: number
    closed: number
}
const IssuesChart = ({ open, inProgress, closed }: Props) => {
    const data = [
        {label:'Open',value:open},
        {label:'In Progress',value:inProgress},
        {label:'Closed',value:closed}

    ]

    return (
        <Card mb={'5'} >
                <ResponsiveContainer width={'100%'} height={300} >
                        <BarChart data={data} >
                            <XAxis dataKey={'label'}  fontSize={'bold'}></XAxis>
                            <YAxis/>
                            <Bar  dataKey={'value'} barSize={100} style={{fill:'var(--accent-9)'}}/>
                        </BarChart>
                </ResponsiveContainer>
        </Card>
    )
}

export default IssuesChart