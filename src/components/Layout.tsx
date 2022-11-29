import React from 'react'

interface LayoutProps {
    children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className='px-4 py-10'>
            <section className='mx-auto max-w-5xl'>
                <div className='mb-5 md:mb-8'>
                    <h1 className='mb-2 text-2xl font-black uppercase tracking-wider md:text-4xl'>
                        Repo hub
                    </h1>
                    <p className='text-text-gray'>
                        See the proggress of diffrent repos from start to finish
                    </p>
                </div>
                {children}
            </section>
        </div>
    )
}

export default Layout
