
import React from 'react';


import JobSearchbar from '@/components/browsejobs/JobSearchbar';
import { GetJob } from '@/lib/api/jobs';
import { Ijobs } from '../type/JobsType';

const BrowseJObPage =async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {

    const search = await searchParams
    const urlSearchParms = new URLSearchParams(search as Record<string, string>)
    const query = urlSearchParms.toString()
    console.log('search query:',query);
    const jobs:Ijobs[] = await GetJob(query)
    
    return (
        <div className="min-h-screen bg-[#08080A] px-4 py-6 text-[#EDEDF0] sm:px-6 lg:px-8">
            <JobSearchbar/>

            <div className="mx-auto mt-8 w-full max-w-[960px] space-y-3">
                {
                    jobs.map((job,ind)=>{
                        return (
                            <div key={ind}>
                              <h1 className="text-lg font-medium">{job.title}</h1>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default BrowseJObPage;