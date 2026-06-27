const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

async function saveAnalysis(userId, code, language, type, result) {
  const { data, error } = await supabase
    .from('debug_sessions')
    .insert({
      user_id: userId,
      code,
      language,
      type,
      result
    })
    .select()

  if (error) throw error

  return data[0]
}

async function getUserHistory(userId) {
  const { data, error } = await supabase
    .from('debug_sessions')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) throw error

  return data
}

async function getSession(userId, sessionId) {
  const { data, error } = await supabase
    .from('debug_sessions')
    .select('*')
    .eq('id', sessionId)
    .eq('user_id', userId)
    .single()

  if (error) throw error

  return data
}

async function deleteSession(userId, sessionId) {
  const { error } = await supabase
    .from('debug_sessions')
    .delete()
    .eq('id', sessionId)
    .eq('user_id', userId)

  if (error) throw error
}

module.exports = {
  saveAnalysis,
  getUserHistory,
  getSession,
  deleteSession
}