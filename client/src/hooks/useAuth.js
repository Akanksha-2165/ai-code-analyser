import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'


export function useAuth() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
      setLoading(false)
    })

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((event, session) => {
  setUser(session?.user ?? null)

  if (session?.access_token) {
    localStorage.setItem(
      "access_token",
      session.access_token
    )
  } else {
    localStorage.removeItem("access_token")
  }
})

    return () => subscription.unsubscribe()
  }, [])

  async function signUp(email, password) {
    return await supabase.auth.signUp({
      email,
      password
    })
  }

  async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (data?.session) {
    localStorage.setItem(
      "access_token",
      data.session.access_token
    )
  }

  return { data, error }
}

  async function signOut() {
  localStorage.removeItem("access_token")
  return await supabase.auth.signOut()
}

  return {
    user,
    loading,
    signUp,
    signIn,
    signOut
  }
}