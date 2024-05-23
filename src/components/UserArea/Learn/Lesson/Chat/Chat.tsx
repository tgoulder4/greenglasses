import React, { useEffect, useRef, useState } from 'react'
import MessagePrimitive from './MessagePrimitive'
import { z } from 'zod'
import { messagesSchema } from '@/lib/validation/primitives'
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2, Send } from 'lucide-react';
import { colours, lessonPaddingBottom, sizing, spacing } from '@/lib/constants';
import { LessonTimer } from './Timer';

function Chat({ messages, subject, targetQContent, distanceUntilLessonEnd }: { messages: z.infer<typeof messagesSchema>[], subject?: string, targetQContent?: string, distanceUntilLessonEnd: number }) {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const text = textAreaRef.current?.value;
        if (!text) return;
        //send the message
        setLoading(false);
    }
    useEffect(() => {
        //if it's their turn, focus the textArea
        if (messages[messages.length - 1].role == 'eli') {
            textAreaRef.current?.focus();
        } else {
            setLoading(true)
        }
    }, [messages])
    return (
        <form onSubmit={handleSubmit} className='flex flex-col gap-3 font-bold justify-between h-full' style={{ paddingBottom: lessonPaddingBottom }}>
            <section className='titleAndReplies flex flex-col'>

                <div className="outlineArea flex justify-start items-center pt-2 h-16 w-full px-12 bg-[#F4F4F4]">
                    <div className="flex gap-2">
                        <h1 className='w-full font-extrabold'>{subject ? subject : targetQContent}</h1>
                        <LessonTimer />
                    </div>
                </div>
                <div className="mainChat">
                    {
                        messages.map((message, index) => {
                            return <MessagePrimitive loadingNextMsg={loading} key={message.content + index} focused={index == messages.length - 1} lastMessageInLesson={distanceUntilLessonEnd === 0} message={message} />
                        })
                    }
                </div>
            </section>
            <div className="replyArea px-8 animate-in slide-in-from-bottom-4 w-full flex flex-row gap-2">
                <div className="relative w-full">

                    <Textarea onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                        }
                    }} ref={textAreaRef} disabled={loading} className={`${loading ? '' : ''} p-[15px] px-[20px] h-14 text-base overflow-hidden rounded-xl resize-none text`} placeholder="Reply to Eli..." />
                    <Button type='submit' disabled={loading} className='absolute aspect-square bottom-[0.5rem] right-2 p-2 grid place-items-center rounded-xl' style={{ backgroundColor: colours.black }}>
                        {loading ? <Loader2 className='w-4 h-4 animate-spin'></Loader2> : <Send size={24} color='white'></Send>}
                    </Button>
                </div>
            </div>
        </form>
    )
}

export default Chat