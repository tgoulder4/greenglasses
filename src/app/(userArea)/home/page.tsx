'use client'
import React, { Suspense, useEffect, useRef, useState } from 'react'
import { changeColour, colours, responsiveFont, sizing, spacing, uiBorder } from '@/lib/constants'
import { Loader2, Plus, Send } from 'lucide-react'
import { merriweather, ruda } from '@/app/fonts'
import { Button } from "@/components/ui/button"
import MainAreaNavbar from '@/components/Navbar/MainAreaNavbar'
import { Input } from "@/components/ui/input"
import SwitcherButton from '@/components/UserArea/Home/SwitcherButton'
import { Textarea } from '@/components/ui/textarea'
import NeuralNetwork from '@/components/UserArea/Learn/Lesson/Network/NeuralNetwork'
import Stat from '@/components/UserArea/Learn/Lesson/Stat'
var equal = require('deep-equal');
// export const metadata: Metadata = {
//     title: "Dunnoyet - Learn",
// }
// export async function createNewLesson() { }
function Page({ params }: { params: { params: string } }) {
    const modeDetails = [{
        modeTitle: "New Question",
        inputPlaceholder: "Ask anything",
        modeDescription: "New Question: Link what you know to target knowledge.",
        examples: ["What is the spinal cavity?", "What is the charge of electrons?", "What causes things to fall?", "What do plants need to grow?"]
    }, {
        modeTitle: "Free Roam",
        inputPlaceholder: "State something you know",
        modeDescription: "Free Roam: Learn unlimited information around something you know.",
        examples: ["The spinal cavity holds the spinal cord", "Electrons are negatively charged", "Gravity makes things fall", "Plants need sunlight to grow"]

    }];
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const [mode, setMode] = useState(0);
    const [loading, setLoading] = useState(true);
    const handleSetMode = (mode: number) => {
        const ta = textAreaRef.current;
        setMode(mode);
        if (ta) ta.value = '';
        ta?.focus();
    }
    const handleSubmit = () => {
        //api call to make a new lesson
        window.location.href = '/lesson/loading'
    }
    useEffect(() => {
        //gather exampleSayings, stats, experience, and knowledgePoints
        setLoading(false);

    }, [])
    return (
        <div className={` flex flex-col`} style={{ fontFamily: ruda.style.fontFamily, fontSize: sizing.globalFontSize }}>
            <MainAreaNavbar style="normal" show={{ userSide: { newQuestion: false } }} />
            <main className="flex flex-col bg-white h-[100vh]" >
                {/* switcher */}
                <div className="switcher" style={{ paddingTop: spacing.gaps.separateElement, borderBottom: uiBorder(0.2), paddingLeft: sizing.variableWholePagePadding, paddingRight: sizing.variableWholePagePadding }}>
                    <div className="transition-all switcherButtons flex flex-row max-w-lg w-full">
                        <SwitcherButton text="New Question" setMode={handleSetMode} mode={mode} />
                        <SwitcherButton text="Free Roam" setMode={handleSetMode} mode={mode} />
                    </div>
                </div>
                <section className='transition-all flex flex-col items-center' style={{ borderBottom: uiBorder(0.2), paddingTop: spacing.gaps.largest, paddingBottom: spacing.gaps.largest, paddingLeft: sizing.variableWholePagePadding, paddingRight: sizing.variableWholePagePadding, rowGap: spacing.gaps.largest - 10 }}>
                    <div className="flex flex-col items-center gap-3 w-full">

                        <h1 className='font-black'>{modeDetails[mode].modeDescription}</h1>
                        <form onSubmit={handleSubmit} className="relative w-full flex flex-row gap-2">
                            <Textarea onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                }
                            }} ref={textAreaRef} style={{ fontSize: sizing.globalFontSize }} disabled={loading} className={`${loading ? '' : ''} p-[15px] px-[20px] h-14 text-base overflow-hidden rounded-xl resize-none text`} placeholder={modeDetails[mode].inputPlaceholder} />
                            <Button type='submit' disabled={loading} className='absolute h-fit bottom-[0.5rem] right-2 p-2 grid place-items-center rounded-xl' style={{ backgroundColor: colours.black }}>
                                <Send size={24} color='white'></Send>
                            </Button>
                        </form>
                    </div>
                    <div className="flex flex-col gap-3 w-4/5">
                        <h1 className=' text-center font-bold'>Examples</h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {modeDetails[mode].examples.map((example, index) => {
                                return (
                                    loading ? <div className="h-16 w-full bg-slate-200 animate animate-pulse rounded-xl" /> :
                                        <Button key={example} onClick={() => {
                                            const textArea = textAreaRef.current;
                                            if (textArea) textArea.value = example;
                                            if (textArea) textArea.focus();

                                        }} className={`${ruda.className} hover:text-white text-[1.2rem] text-black w-full p-10 bg-muted rounded-xl font-bold`}>
                                            {example}
                                        </Button>
                                )
                            })}
                        </div>
                    </div>
                </section>
                <section className='flex flex-col items-center' style={{ borderBottom: uiBorder(0.2), paddingTop: spacing.gaps.separateElement, paddingBottom: spacing.gaps.largest, paddingLeft: sizing.variableWholePagePadding, paddingRight: sizing.variableWholePagePadding, rowGap: spacing.gaps.largest - 10 }}>
                    <div className="w-full flex flex-col gap-3 items-center">
                        <h1 className='font-bold'>My Brain</h1>
                        <div className="relative w-full flex flex-col gap-3">
                            <NeuralNetwork loading={loading} className='h-72 w-full' knowledgePoints={[
                                { confidence: 2, TwoDvK: [0, -1], source: 'offered', pointInSolitude: 'Energy is the ability to do work' },
                                { confidence: 2, TwoDvK: [0, 2], source: 'offered', pointInSolitude: 'Energy is the ability to do work' },
                            ]} />
                            <div className="flex flex-row gap-3">
                                <Stat loading={loading} statTitle="Experience" value={0} />
                                <Stat loading={loading} statTitle="Total concepts learnt" value={0} />
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default Page