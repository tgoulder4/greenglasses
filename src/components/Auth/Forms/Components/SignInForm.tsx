'use client'
import React, { useRef, useEffect } from 'react'
import { sizing, spacing } from '@/lib/constants'
import { merriweather } from '@/app/fonts'
import { Input } from '../../../ui/input'
import NewButton from '../../../ui/NewButton'
import { colours } from '@/lib/constants'
import { useFormState, useFormStatus } from 'react-dom'
import { authenticate } from '../../../../actions'
import { ArrowRightIcon, Loader2 } from 'lucide-react'
import InputWithLegend from './InputWithFieldset'
import { AuthError } from "next-auth";

function SignInForm() {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    // const [errorMessage, dispatch] = useFormState(authenticate, undefined);
    //CORRECTION:
    const [responseMsg,dispatch]=useFormState(authenticate,undefined)
    const { pending } = useFormStatus();
    useEffect(() => {
        usernameRef.current?.focus()
    }, [])
    return (
        <form
            action={dispatch}
            className='flex-2 grow' style={{ paddingLeft: sizing.variableWholePagePadding, paddingRight: sizing.variableWholePagePadding, paddingTop: spacing.gaps.largest }}>
            <div className='flex flex-col' style={{ rowGap: spacing.gaps.separateElement }}>
                <h1 style={{ fontFamily: merriweather.style.fontFamily, fontSize: 'clamp(1rem,3vw,' + sizing.largestFontSize + ')' }}>Sign into your account</h1>
                <fieldset name='fs' className='flex flex-col' style={{ rowGap: spacing.gaps.separateElement }}>
                    <InputWithLegend ref={usernameRef} idAndName="username" type="text" placeholder="Username" defaultValue='tgoulder4' />
                    <InputWithLegend ref={passwordRef} idAndName="password" type="password" placeholder="Password" defaultValue='testPassword'>
                        {
                            errorMessage==instanceof AuthError?
                            // passwordRef.current?.focus()
                            <div className='grid place-items-center w-full font-bold py-[14px] rounded-[10px]' style={{ backgroundColor: 'rgb(255,27,27,0.38)' }}>
                                {responseMsg}
                            </div>:
                            <div className='grid place-items-center w-full font-bold py-[14px] rounded-[10px]' style={{ backgroundColor: 'rgb(66, 186, 150)' }}>
                                {responseMsg}
                            </div>
                        }
                    </InputWithLegend>
                    <NewButton type='submit' aria-disabled={pending} className='w-full' style={{ paddingLeft: spacing.gaps.separateElement, paddingRight: spacing.gaps.separateElement, paddingTop: 14, paddingBottom: 14 }} buttonVariant="black" >
                        Sign In
                        {
                            pending ? <Loader2 className='animate-spin' color='white' size={24} /> : <ArrowRightIcon color='white' />
                        }
                    </NewButton>
                </fieldset>
            </div>
        </form>
    )
}

export default SignInForm