//TYPES
export type IMessagesEndpointResponsePayload = {
    newMessages: IMessage[];
    metadata: IMetadata;
} | { error: string }
export type IMessagesEndpointSendPayload = {
    messages: IMessage[];
    metadata: IMetadata;
}
export type IMetadata = {
    lessonID: string;
    userID?: string;
    threads: IMessage[][];
    subjects: string[];
    action?: "understood" | 'endLesson',
    knowledgePointChain: Array<IKnowledge>;
    currentKnowledgePointIndex: number;
}
export type IMessage = {
    content: string | ISplitResponse;
    eliResponseType?: "General" | "WhatComesToMind" | "ChallengeQ" | 'SubjectIntroduction';
    role: "user" | "eli";
    placeHolderText?: string;
};
export type ISplitResponse = { text: string, active: boolean };
export type ILesson = {
    id: string;
    subjects: string[];
    messages?: IMessage[];
    beganAt: Date;
    lessonStatus: "Active" | "Completed";
    endedAt: Date;
    knowledgePointChain: IKnowledge[];
}
/**
 * @confidence 5=wellKnown, 4=currentlyTeaching, 3=failedTest,2=target,1=makeNewKnowledgeAnchorPoint
 */
export type IKnowledge = {
    id?: string,
    lessonId?: string,
    userId?: string,
    source: 'reinforced' | 'offered',
    pointInSolitude: string,
    pointInChain: string,
    TwoDCoOrdinates: number[],
    vectorEmbedding?: number[],
    //5=wellKnown, 4=currentlyTeaching, 3=failedTest,2=target,1=makeNewKnowledgeAnchorPoint
    confidence: number
}
export type IUser = {
    id: string;
    name?: string;
    username: string;
    email: string;
    password: string;
    role?: string;
    lessons: ILesson[] | string[];
    tutorName: string;
    knowledgePointsUnderstood: string[];
};
export type ITip = {
    title: string;
    content: string;
    link: string;
    uiDetailId?: string;

}
export type IDetail = {
    id?: string;
    tips: ITip[];
}