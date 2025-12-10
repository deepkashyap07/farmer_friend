import { useState } from 'react'

export default function Predict() {
  const [form, setForm] = useState({
    Nitrogen: '',
    Phosporus: '',
    Potassium: '',
    Temperature: '',
    Humidity: '',
    pH: '',
    Rainfall: ''
  })

  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setResult(null)

    // Build payload with numeric values
    const payload = {}
    Object.keys(form).forEach((k) => {
      const v = form[k]
      payload[k] = v === '' ? 0 : Number(v)
    })

    try {
      const res = await fetch('https://farmer-friend-k55l.onrender.com/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const text = await res.text()
        throw new Error(text || `Server responded ${res.status}`)
      }

      const data = await res.json()
      // backend returns { prediction: crop, result: message }
      setResult(data.result ?? data.prediction ?? 'No result')
    } catch (err) {
      console.error(err)
      setError(err.message || 'Request failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-semibold mb-4">Predict Best Crop</h2>
      <form onSubmit={handleSubmit} className="grid gap-3 md:grid-cols-2">
        {Object.keys(form).map((key) => (
          <label key={key} className="flex flex-col">
            <span className="text-sm font-medium text-gray-700">{key}</span>
            <input
              name={key}
              value={form[key]}
              onChange={handleChange}
              className="mt-1 p-2 border rounded-md"
              placeholder={key}
              inputMode="numeric"
            />
          </label>
        ))}

        <div className="md:col-span-2 flex items-center gap-3 mt-2">
          <button disabled={loading} type="submit" className="bg-green-600 disabled:opacity-60 text-white px-4 py-2 rounded-md">{loading ? 'Predicting...' : 'Predict'}</button>
          <button type="button" onClick={() => { setForm({Nitrogen:'',Phosporus:'',Potassium:'',Temperature:'',Humidity:'',pH:'',Rainfall:''}); setResult(null); setError(null); }} className="bg-gray-100 px-3 py-2 rounded-md">Reset</button>
        </div>

        {error && (
          <div className="md:col-span-2 mt-4 p-4 bg-red-50 rounded text-red-700">{error}</div>
        )}

        {result && (
          <div className="md:col-span-2 mt-4 p-4 bg-green-50 rounded">
            <strong className="block text-sm text-green-800">Result</strong>
            <p className="text-sm text-gray-700 mt-1">{result}</p>
          </div>
        )}
      </form>
    </section>
  )
}
