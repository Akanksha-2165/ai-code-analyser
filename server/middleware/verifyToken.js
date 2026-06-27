console.log("SUPABASE URL =", process.env.SUPABASE_URL)

const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

async function verifyToken(req, res, next) {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      })
    }

    const token = authHeader.substring(7)

    console.log('🔐 Verifying token...')

    const { data, error } = await supabase.auth.getUser(token)

    if (error || !data.user) {
    console.log('❌ Invalid token')

    return res.status(401).json({
        success: false,
        message: 'Invalid token'
    })
    }

    console.log('✅ Authenticated user:', data.user.email)

    req.user = data.user

    next()

  } catch (error) {
    console.error('Auth error:', error.message)

    return res.status(401).json({
      success: false,
      message: 'Authentication failed'
    })
  }
}

module.exports = verifyToken