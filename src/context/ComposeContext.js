import {useState, createContext} from 'react'

const ComposeContext = createContext()


export const ComposeProvider = ({children}) => {
    const [isCompose, setIsCompose] = useState(false)
    const [composeDraft, setComposeDraft] = useState(undefined)

    return (
        <ComposeContext.Provider value={{isCompose, setIsCompose, composeDraft, setComposeDraft}}>
            {children}
        </ComposeContext.Provider>
    )
}