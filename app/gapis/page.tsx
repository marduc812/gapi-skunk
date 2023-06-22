import React from 'react'
import Link from 'next/link'
import PriceView from '@/components/PriceView'
import { rules } from '@/lib/rules'

const About = () => {

    return (
        <main className='flex min-h-screen flex-col items-center overflow-x-hidden'>
            <h3 className='text-2xl font-bold text-center'>About <span className='hover:underline '>Google&#039;s</span> APIs</h3>
            <p className='text-center w-full text-slate-700 p-5'>Details about the API calls tested. Information about their purpose, their price tiers and links for the documentaiton provided by Google.</p>

            <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4 justify-center'>

                {
                    rules.map((rule) => {

                        let catColor = '';

                        if (rule.category === 'Maps') {
                            catColor = 'text-blue-700 bg-blue-100'
                        } else if (rule.category === 'Routes') {
                            catColor = 'text-red-700 bg-red-100'
                        } else if (rule.category === 'Places') {
                            catColor = 'text-green-700 bg-green-100'
                        } else if (rule.category === 'Google Cloud') {
                            catColor = 'text-yellow-700 bg-yellow-100'
                        }

                        return (
                            <div key={`${rule.name}-about`} className='flex flex-row justify-center w-full'>
                                <div className='flex flex-col justify-between border-4 w-full border-black rounded-md m-2 p-5 items-center w-5/6 shadow-[5px_5px_0px_0px_rgba(0,0,0)]'>
                                    <div className='flex flex-row items-center'>
                                        <h4 className='text-xl font-bold'>{rule.name}</h4>
                                        <p className={`${catColor} text-sm rounded p-1 ml-5`}>{rule.category}</p>
                                    </div>

                                    <p className='text-md text-slate-600'>{rule.description}</p>
                                    <div className='flex flex-row w-full justify-between'>
                                        <div className='text-lg flex flex-col justify-left items-left w-full'>
                                            <div className='flex flex-row justify-between items-center'>
                                                <span className='m-2 font-bold'>Pricing:</span>

                                                <span className='m-2 font-bold underline decoration-2 hover:decoration-blue-500'>
                                                    <Link target='_blank' href={rule.reference}>info</Link>
                                                </span>
                                                
                                            </div>
                                            <PriceView price={rule.price} />
                                        </div>
                                    </div>
                                </div>
                            </div>)
                    })
                }
            </div>
            <section id="remediation" className='p-5'>
                <h3 className='text-2xl font-bold text-center pt-5'>Remediation</h3>
                <p className='text-center w-full text-slate-700'>Google allows each API call to have specific permissions, preventing it from being used from unauthorized applications. Currently Google allows the following restrictions:</p>

                <ul className='p-2 w-full list-disc'>
                    <li><span className='font-bold'>Website</span> (ex. https://example.com)</li>
                    <li><span className='font-bold'>Android Apps</span> (package name)</li>
                    <li><span className='font-bold'>iOS Apps</span> (bundle ID)</li>
                    <li><span className='font-bold'>IP Address</span> (IPv4, IPv6 or CIDR)</li>
                </ul>
                <div className='w-full text-left p-2'>
                    <Link target='_blank' className='m-2 font-bold underline decoration-2 hover:decoration-blue-500' href='https://developers.google.com/maps/api-security-best-practices'>More info</Link>
                </div>
            </section>

        </main>
    )
}

export default About