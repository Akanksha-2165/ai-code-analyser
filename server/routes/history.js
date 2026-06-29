const express = require('express')
const router = express.Router()

const {
  getUserHistory,
  getSession,
  deleteSession
} = require('../services/historyService')

// GET ALL HISTORY
router.get('/history', async (req, res) => {
  console.log("========== HISTORY REQUEST ==========");
  console.log("Authorization:", req.headers.authorization);
  console.log("User:", req.user);
  console.log("=====================================");

  try {
    const history = await getUserHistory(req.user.id);

    res.json({
      success: true,
      history
    });

  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      success: false,
      message: 'Failed to fetch history'
    });
  }
});

// GET SINGLE SESSION
router.get('/history/:id', async (req, res) => {
  try {
    const session = await getSession(
      req.user.id,
      req.params.id
    )

    res.json({
      success: true,
      session
    })

  } catch (error) {
    console.error(error.message)

    res.status(500).json({
      success: false,
      message: 'Failed to fetch session'
    })
  }
})

// DELETE SESSION
router.delete('/history/:id', async (req, res) => {
  try {
    await deleteSession(
      req.user.id,
      req.params.id
    )

    res.json({
      success: true
    })

  } catch (error) {
    console.error(error.message)

    res.status(500).json({
      success: false,
      message: 'Failed to delete session'
    })
  }
})

module.exports = router