"use client";

import { useState } from 'react'
import axios from 'axios'

export default function InsightsClient() {
  const [query, setQuery] = useState('')
  const [sampleSize, setSampleSize] = useState(1000)
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!query.trim()) {
      setError('Please enter a question')
      return
    }

    setLoading(true)
    setError('')
    setResponse('')

    try {
      const result = await axios.post('/api/insights', {
        query: query.trim(),
        sampleSize,
      })

      setResponse(result.data.response)
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to get insights. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="query" className="block text-sm font-medium text-gray-300 mb-2">
            Your Question
          </label>
          <textarea
            id="query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-gray-100 focus:outline-none focus:border-teal-500 min-h-[100px]"
            placeholder="Ask a question about meteorite data..."
          />
        </div>

        <div>
          <label htmlFor="sampleSize" className="block text-sm font-medium text-gray-300 mb-2">
            Sample Size: {sampleSize}
          </label>
          <input
            type="range"
            id="sampleSize"
            min="100"
            max="5000"
            step="100"
            value={sampleSize}
            onChange={(e) => setSampleSize(parseInt(e.target.value))}
            className="w-full"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-teal-500 hover:bg-teal-600 disabled:bg-gray-600 text-white font-semibold py-3 rounded-lg transition-colors"
        >
          {loading ? 'Analyzing...' : 'Get Insights'}
        </button>
      </form>

      {error && (
        <div className="mt-6 bg-red-900 border border-red-700 rounded-lg p-4">
          <p className="text-red-200">{error}</p>
        </div>
      )}

      {response && (
        <div className="mt-6 bg-gray-800 border border-teal-500 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-teal-400 mb-3">AI Response</h3>
          <div className="text-gray-200 whitespace-pre-wrap">{response}</div>
        </div>
      )}
    </div>
  )
}