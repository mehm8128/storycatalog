import { atom } from 'jotai'

export const selectedStoryAtom = atom<string | null>(null)
export const selectedStoryFilePathAtom = atom<string | null>(null)
