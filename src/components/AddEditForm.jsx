import { useEffect, useState } from 'react'
import './AddEditForm.css'

function AddEditForm({
  initialData,
  onSave,
  onCancel,
}) {
  const [title, setTitle] = useState(
    initialData?.title ?? ''
  )

  const [amount, setAmount] = useState(
    initialData?.amount ?? ''
  )

  const [date, setDate] = useState(
    initialData?.date ?? new Date().toISOString().slice(0, 10)
  )

  const [error, setError] = useState('')

  useEffect(() => {
    setTitle(initialData?.title ?? '')
    setAmount(initialData?.amount ?? '')
    setDate(
      initialData?.date ?? new Date().toISOString().slice(0, 10)
    )
    setError('')
  }, [initialData])

  function handleSubmit(event) {
    event.preventDefault()

    const numericAmount = Number(amount)

    if (!title.trim()) {
      setError('Please enter a description.')
      return
    }

    if (
      !Number.isFinite(numericAmount) ||
      numericAmount <= 0
    ) {
      setError('Enter an amount greater than zero.')
      return
    }

    if (!date) {
      setError('Please select a date.')
      return
    }

    onSave({
      title: title.trim(),
      amount: numericAmount,
      date,
    })
  }

  return (
    <section className="form-card">

      <div className="form-heading">

        <div>
          <p className="eyebrow">
            {initialData ? 'UPDATE DETAILS' : 'NEW ENTRY'}
          </p>

          <h2>
            {initialData
              ? 'Edit transaction'
              : 'Add transaction'}
          </h2>
        </div>

        <button
          className="close-button"
          type="button"
          onClick={onCancel}
          aria-label="Close form"
        >
          ×
        </button>

      </div>

      <form onSubmit={handleSubmit}>

        <div className="form-grid">

          <label className="form-field">
            Description

            <input
              value={title}
              onChange={(event) =>
                setTitle(event.target.value)
              }
              placeholder="e.g. Monthly groceries"
              maxLength="70"
            />
          </label>

          <label className="form-field">
            Amount (₹)

            <input
              type="number"
              min="0.01"
              step="0.01"
              value={amount}
              onChange={(event) =>
                setAmount(event.target.value)
              }
              placeholder="0.00"
            />
          </label>

          <label className="form-field">
            Date

            <input
              type="date"
              value={date}
              onChange={(event) =>
                setDate(event.target.value)
              }
            />
          </label>

        </div>

        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}

        <div className="form-actions">

          <button
            className="cancel-button"
            type="button"
            onClick={onCancel}
          >
            Cancel
          </button>

          <button
            className="save-button"
            type="submit"
          >
            {initialData
              ? 'Save changes'
              : 'Add transaction'}
          </button>

        </div>

      </form>

    </section>
  )
}

export default AddEditForm