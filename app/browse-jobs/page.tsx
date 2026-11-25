import React from 'react';

import JobSearchbar from '@/components/browsejobs/JobSearchbar';
import { GetJob } from '@/lib/api/jobs';
import { Ijobs } from '../type/JobsType';
import JobFilter from '@/components/browsejobs/JobFilter';

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

            <div className="mx-auto mt-6 flex w-full max-w-[960px] flex-col gap-6 sm:flex-row sm:items-start">
               <JobFilter jobs ={jobs}/>
                <section className="min-w-0 flex-1">
                    <h1 className="mb-4 text-lg font-semibold text-white">
                        Found {jobs.length.toLocaleString()} Professional Jobs
                    </h1>

                    <div className="space-y-3">
                        {
                            jobs.map((job,ind)=>{
                                return (
                                    <div key={ind}>
                                      <h2 className="text-lg font-medium">{job.title}</h2>
                                    </div>
                                )
                            })
                        }
                    </div>
                </section>
            </div>
        </div>
    );
};

export default BrowseJObPage;
