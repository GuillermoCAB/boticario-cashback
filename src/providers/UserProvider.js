import React, { useState } from 'react'

const UserContext = React.createContext()

const UserProvider = (props) => {

    const [loggedIn, setLoggedIn] = useState(false)
    const [email, setEmail] = useState('')
    const [token, setToken] = useState('')
    const [cpf, setCpf] = useState('')
    const [id, setId] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    const handleCpf = (e) => {
        setCpf(cpfMask(e.target.value))
    }

    const handleFirstName = (e) => {
        setFirstName(e.target.value)
    }

    const handleLastName = (e) => {
        setLastName(e.target.value)
    }

    const cpfMask = (value) => {
        return value
          .replace(/\D/g, '')
          .replace(/(\d{3})(\d)/, '$1.$2')
          .replace(/(\d{3})(\d)/, '$1.$2')
          .replace(/(\d{3})(\d{1,2})/, '$1-$2')
          .replace(/(-\d{2})\d+?$/, '$1')
    }
      

    return(
        <UserContext.Provider
        value={{
            loggedIn,
            email,
            token,
            cpf,
            id,
            firstName,
            lastName,
            setLoggedIn,
            setEmail,
            setToken,
            setCpf,
            setId,
            setFirstName,
            setLastName,
            handleEmail,
            handleCpf,
            handleFirstName,
            handleLastName
        }}
        >
            {props.children}
        </UserContext.Provider>
    ) 
}

export {UserProvider, UserContext}