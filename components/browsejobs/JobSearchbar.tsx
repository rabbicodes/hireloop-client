
'use client'
import React from 'react';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';


const JobSearchbar = () => {
const router  = useRouter()
    const onSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries())
    const search = data.searchfield
    const params = new URLSearchParams()
    params.set('search',search as string)
    router.push(`/browse-jobs?${params.toString()}`)
  };
    
    
    return (
        <div>
            <div className="mx-auto w-full max-w-[960px] rounded-lg bg-[#141418] p-[18px]">
                <form className="flex flex-col gap-4.5 sm:flex-row sm:items-stretch" onSubmit={onSubmit} >
                    <div className="flex h-[42px] min-w-0 flex-1 items-center rounded-lg border border-[#242429] bg-[#1A1A1F] pl-4 pr-4">
                        <Search
                            aria-hidden="true"
                            className="size-[18px] shrink-0 text-[#7E7E88]"
                        />
                        <input
                            type="text"
                            name="searchfield"
                            aria-label="Search jobs"
                            placeholder="Search by job title, keywords..."
                            className="ml-4 w-full min-w-0 bg-transparent text-sm text-[#EDEDF0] outline-none placeholder:text-[#7E7E88]"
                        />
                    </div>

                    <button
                        type="submit"
                        className="h-[44px] w-full shrink-0 rounded-lg bg-white text-sm font-semibold text-[#08080A] transition hover:bg-white/90 sm:w-[108px]"
                    >
                        Search Jobs
                    </button>
                </form>
            </div>
        </div>
    );
};

export default JobSearchbar;