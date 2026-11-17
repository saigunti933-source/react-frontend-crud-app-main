import { useMemo, useState } from 'react'
import Header from './components/Header.jsx'
import AddEditForm from './components/AddEditForm.jsx'
import calculateTotalExpenses from './components/calculateTotalExpenses.js'

const initialTransactions = [
  {
    id: 1,
    title: 'Groceries',
    amount: 1250,
    date: '2026-11-02',
  },
  {
    id: 2,
    title: 'Transport',
    amount: 450,
    date: '2026-11-05',
  },
  {
    id: 3,
    title: 'Electricity bill',
    amount: 1800,
    date: '2026-11-08',
  },
]

const currency = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 2,
})

function App() {
  const [transactions, setTransactions] = useState(
    initialTransactions
  )

  const [showForm, setShowForm] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState(null)
  const [search, setSearch] = useState('')

  const filteredTransactions = useMemo(
    () =>
      transactions.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      ),
    [transactions, search]
  )

  function openAddForm() {
    setEditingTransaction(null)
    setShowForm(true)
  }

  function openEditForm(transaction) {
    setEditingTransaction(transaction)
    setShowForm(true)
  }

  function saveTransaction(formData) {
    if (editingTransaction) {
      setTransactions((current) =>
        current.map((item) =>
          item.id === editingTransaction.id
            ? { ...item, ...formData }
            : item
        )
      )
    } else {
      setTransactions((current) => [
        {
          ...formData,
          id: Date.now(),
        },
        ...current,
      ])
    }

    setShowForm(false)
    setEditingTransaction(null)
  }

  function deleteTransaction(id) {
    const confirmed = window.confirm(
      'Delete this transaction?'
    )

    if (confirmed) {
      setTransactions((current) =>
        current.filter((item) => item.id !== id)
      )
    }
  }

  return (
    <main className="app-shell">

      <Header onAdd={openAddForm} />

      <section className="summary-card">
        <div>
          <p className="eyebrow">TOTAL EXPENSES</p>

          <h1>
            {currency.format(
              calculateTotalExpenses(transactions)
            )}
          </h1>

          <p className="muted">
            Across {transactions.length} transaction
            {transactions.length === 1 ? '' : 's'}
          </p>
        </div>

        <div className="summary-icon">
          ₹
        </div>
      </section>

      {showForm && (
        <AddEditForm
          initialData={editingTransaction}
          onSave={saveTransaction}
          onCancel={() => {
            setShowForm(false)
            setEditingTransaction(null)
          }}
        />
      )}

      <section className="transactions-section">

        <div className="section-heading">
          <div>
            <p className="eyebrow">YOUR MONEY</p>
            <h2>Transactions</h2>
          </div>

          <input
            className="search-input"
            type="search"
            placeholder="Search transactions..."
            aria-label="Search transactions"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />
        </div>

        <div className="table-wrap">

          <table>
            <thead>
              <tr>
                <th>DESCRIPTION</th>
                <th>DATE</th>
                <th className="amount-column">AMOUNT</th>
                <th className="actions-column">ACTIONS</th>
              </tr>
            </thead>

            <tbody>
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id}>

                  <td className="transaction-title">
                    {transaction.title}
                  </td>

                  <td>
                    {new Date(
                      `${transaction.date}T00:00:00`
                    ).toLocaleDateString('en-IN', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </td>

                  <td className="amount-column amount">
                    {currency.format(transaction.amount)}
                  </td>

                  <td className="actions-column">

                    <button
                      className="text-button"
                      onClick={() =>
                        openEditForm(transaction)
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="text-button delete-button"
                      onClick={() =>
                        deleteTransaction(transaction.id)
                      }
                    >
                      Delete
                    </button>

                  </td>
                </tr>
              ))}

              {filteredTransactions.length === 0 && (
                <tr>
                  <td colSpan="4" className="empty-state">
                    No transactions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

        </div>
      </section>

      <footer>
        Expense Tracker <span>•</span> Simple spending overview
      </footer>

    </main>
  )
}

export default App