export default function About() {
  return (
    <section className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-semibold mb-4">About Farmers Friend</h2>
      <p className="text-gray-700 mb-4">Farmers Friend is a lightweight demo application that helps suggest suitable crops using simple ML models and soil/weather inputs.</p>
      <ul className="list-disc pl-5 text-gray-700 space-y-2">
        <li>Fast predictions using a lightweight model</li>
        <li>Simple and mobile-friendly UI</li>
        <li>Open for improvements and retraining with local data</li>
      </ul>
    </section>
  )
}
