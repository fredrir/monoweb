import { type Dispatch, type SetStateAction, createContext } from "react"

interface IProfileContext {
  editMode: boolean
  setEditMode: Dispatch<SetStateAction<boolean>>
  profileDetails?: string
  setProfileDetails?: Dispatch<SetStateAction<boolean>>
}

export const ProfileContext = createContext<IProfileContext | null>(null)
