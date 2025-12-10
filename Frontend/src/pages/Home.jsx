export default function Home() {
  return (
    <section className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-semibold mb-4">Welcome to Farmers Friend</h2>
      <p className="text-gray-700 mb-4">A tiny app to help farmers choose the best crop based on soil and weather parameters.</p>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="p-4 bg-green-50 rounded">
          <h3 className="font-medium">Quick predict</h3>
          <p className="text-sm text-gray-600">Use the Predict page to enter soil data and get a crop recommendation.</p>
        </div>
        <div className="p-4 bg-green-50 rounded">
          <h3 className="font-medium">Learn</h3>
          <p className="text-sm text-gray-600">Read about common crops and best practices on the About page.</p>
        </div>
      </div>
    </section>
  )
}
