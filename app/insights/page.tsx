import InsightsClient from '@/components/InsightsClient'

export default function InsightsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6 text-teal-400">AI-Powered Insights</h1>
      
      <div className="max-w-3xl mx-auto">
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 mb-6">
          <p className="text-gray-300 mb-4">
            Ask questions about meteorite patterns, trends, and distributions. 
            Our AI will analyze the NASA dataset to provide insights.
          </p>
          <p className="text-sm text-gray-400">
            Example questions:
          </p>
          <ul className="text-sm text-gray-400 list-disc list-inside mt-2 space-y-1">
            <li>Summarize meteor trends from 1900 to 2000</li>
            <li>Which regions have the heaviest meteorite finds?</li>
            <li>What are the most common meteorite classifications?</li>
            <li>How has the rate of meteorite discoveries changed over time?</li>
          </ul>
        </div>

        <InsightsClient />
      </div>
    </div>
  )
}