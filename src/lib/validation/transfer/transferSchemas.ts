import { z } from "zod"
const stageType = z.enum(['purgatory', 'main', 'end']);
export const messagesReceiveSchema = z.object({
    stage: stageType,
    purgDetails: z.object({
        mode: z.enum(['New Question', 'Free Roam']),
        uQ: z.string().optional(),
        uKP: z.string().optional(),
    }).optional(),
    mainDetails: z.object({
        msgHistory: z.array(z.object({
            role: z.enum(['user', 'eli']),
            content: z.string(),
        })),
        targetQuestion: z.string().optional(),
    }).optional(),
    lastSaved: z.string()
})
export const messagesPayloadSchema = z.object({
    stage: stageType,
    newMessages: z.array(z.object({
        role: z.enum(['user', 'eli']),
        content: z.string(),
        eliResponseType: z.enum(['General', 'WhatComesToMind', 'System']),
        KP: z.object({
            point: z.string(),
            confidence: z.number(),
            //twoDvK is an array of length 2
            TwoDvK: z.array(z.number()),
        }).optional(),
        metadata: z.object({
            references: z.array(z.string()),
            imageURL: z.string().optional(),
        }).optional()
    })),
    targetQuestion: z.object({
        content: z.string(),
        KP: z.object({
            point: z.string(),
            TwoDvK: z.array(z.number()),
        }).optional(),
    }),
    lastSaved: z.date()
})