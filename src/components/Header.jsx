import './Header.css'

function Header({ onAdd }) {
  return (
    <header className="app-header">

      <div className="brand">

        <div className="brand-mark">
          ₹
        </div>

        <div>
          <p className="brand-name">
            Pocket<span>Track</span>
          </p>

          <p className="brand-caption">
            PERSONAL FINANCE
          </p>
        </div>

      </div>

      <button
        className="add-button"
        onClick={onAdd}
      >
        <span>＋</span>
        Add transaction
      </button>

    </header>
  )
}

export default Header