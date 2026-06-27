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
    return await supabase.auth.signInWithPassword({
      email,
      password
    })
  }

  async function signOut() {
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