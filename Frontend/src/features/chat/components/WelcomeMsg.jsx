import React from 'react'
import { Astroid } from 'lucide-react';

const WelcomeMsg = () => {
    return (
        <div className="flex flex-1 flex-col items-center justify-center px-5 pb-8">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-zinc-200">
                <Astroid />
            </div>

            <h1 className="text-center text-3xl font-semibold tracking-tight sm:text-4xl">
                What can I help with?
            </h1>
            <p className="mt-3 max-w-md text-center text-sm leading-6 text-zinc-500 sm:text-base">
                Ask anything, explore ideas, or get help bringing your next big
                idea to life.
            </p>

        </div>
    )
}

export default WelcomeMsg