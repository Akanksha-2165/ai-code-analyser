import apiClient from './analysisService'

export async function getHistory() {
  const response = await apiClient.get('/api/history')

  return response.data
}

export async function getSession(id) {
  const response = await apiClient.get(
    `/api/history/${id}`
  )

  return response.data
}

export async function deleteSession(id) {
  const response = await apiClient.delete(
    `/api/history/${id}`
  )

  return response.data
}