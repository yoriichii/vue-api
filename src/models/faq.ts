export interface FaqsTypes{
    id: null | number;
    faqType:{
        id: number | null;
        name: string;
        description?: null;
    }
    questionEn: string;
    answerEn: string;
    questionKh?: string;
    answerKh?: string;
}