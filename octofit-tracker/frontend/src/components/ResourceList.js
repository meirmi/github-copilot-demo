import React, { useState } from 'react';

const toText = value => (Array.isArray(value) ? value.join(', ') : String(value ?? ''));

function ResourceList({ title, items, columns, loading, error, onRefresh }) {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);

  const needle = query.trim().toLowerCase();
  const visibleItems = items.filter(item =>
    columns.some(column => toText(item[column.key]).toLowerCase().includes(needle))
  );

  return (
    <div className="card octofit-card shadow-sm">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h1 className="h3 mb-0">{title}</h1>
        <button type="button" className="btn btn-outline-primary btn-sm" onClick={onRefresh} disabled={loading}>
          {loading ? 'Loading…' : 'Refresh'}
        </button>
      </div>

      <div className="card-body">
        <form className="row g-2 mb-3" role="search" onSubmit={event => event.preventDefault()}>
          <div className="col-12 col-md-6">
            <label htmlFor={`${title}-search`} className="visually-hidden">Search {title}</label>
            <input
              id={`${title}-search`}
              type="search"
              className="form-control"
              placeholder={`Search ${title.toLowerCase()}`}
              value={query}
              onChange={event => setQuery(event.target.value)}
            />
          </div>
        </form>

        {error && (
          <div className="alert alert-danger" role="alert">
            Could not load {title.toLowerCase()}: {error}
          </div>
        )}

        {loading && items.length === 0 ? (
          <div className="d-flex justify-content-center py-4">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading…</span>
            </div>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle mb-0">
              <thead>
                <tr>
                  {columns.map(column => (
                    <th scope="col" key={column.key}>{column.label}</th>
                  ))}
                  <th scope="col" className="text-end">Details</th>
                </tr>
              </thead>
              <tbody>
                {visibleItems.map(item => (
                  <tr key={item._id}>
                    {columns.map(column => (
                      <td key={column.key}>{toText(item[column.key])}</td>
                    ))}
                    <td className="text-end">
                      <button type="button" className="btn btn-primary btn-sm" onClick={() => setSelected(item)}>
                        View
                      </button>
                    </td>
                  </tr>
                ))}
                {visibleItems.length === 0 && (
                  <tr>
                    <td colSpan={columns.length + 1} className="text-center text-muted py-4">
                      No {title.toLowerCase()} found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selected && (
        <>
          <div
            className="modal fade show d-block"
            tabIndex="-1"
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${title}-modal-title`}
            onClick={() => setSelected(null)}
          >
            <div className="modal-dialog modal-dialog-centered" onClick={event => event.stopPropagation()}>
              <div className="modal-content">
                <div className="modal-header">
                  <h2 className="modal-title h5" id={`${title}-modal-title`}>{title} details</h2>
                  <button type="button" className="btn-close" aria-label="Close" onClick={() => setSelected(null)} />
                </div>
                <div className="modal-body">
                  <dl className="row mb-0">
                    {columns.map(column => (
                      <React.Fragment key={column.key}>
                        <dt className="col-sm-4">{column.label}</dt>
                        <dd className="col-sm-8">{toText(selected[column.key])}</dd>
                      </React.Fragment>
                    ))}
                  </dl>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setSelected(null)}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show" />
        </>
      )}
    </div>
  );
}

export default ResourceList;
