import React, { useState } from 'react';
import { GlassButton, GlassCard, GlassInput, GlassSheet } from '@zakisheriff/liquid-glass';
import { RefreshIcon } from '../icons';

const toText = value => (Array.isArray(value) ? value.join(', ') : String(value ?? ''));

function ResourceList({ title, items, columns, loading, error, onRefresh }) {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const needle = query.trim().toLowerCase();
  const visibleItems = items.filter(item =>
    columns.some(column => toText(item[column.key]).toLowerCase().includes(needle))
  );

  const openDetails = item => {
    setSelected(item);
    setSheetOpen(true);
  };

  return (
    <GlassCard className="octofit-panel" padding="0" radius="28px">
      <div className="octofit-panel-head">
        <h1 className="octofit-title h3 mb-0">{title}</h1>
        <GlassButton size="sm" variant="tinted" icon={<RefreshIcon />} onClick={onRefresh} disabled={loading}>
          {loading ? 'Loading…' : 'Refresh'}
        </GlassButton>
      </div>

      <div className="octofit-panel-body">
        <form className="octofit-search" role="search" onSubmit={event => event.preventDefault()}>
          <GlassInput
            type="search"
            placeholder={`Search ${title.toLowerCase()}`}
            aria-label={`Search ${title}`}
            value={query}
            onChange={event => setQuery(event.target.value)}
            onClear={() => setQuery('')}
          />
        </form>

        {error && (
          <div className="alert alert-danger octofit-alert" role="alert">
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
            <table className="table table-striped table-hover align-middle mb-0 octofit-table">
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
                      <GlassButton size="sm" variant="tinted" onClick={() => openDetails(item)}>
                        View
                      </GlassButton>
                    </td>
                  </tr>
                ))}
                {visibleItems.length === 0 && (
                  <tr>
                    <td colSpan={columns.length + 1} className="text-center octofit-muted py-4">
                      No {title.toLowerCase()} found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <GlassSheet open={sheetOpen} onClose={() => setSheetOpen(false)} aria-label={`${title} details`}>
        {selected && (
          <div className="octofit-sheet">
            <h2 className="octofit-title h4">{title} details</h2>
            <dl className="row mb-4">
              {columns.map(column => (
                <React.Fragment key={column.key}>
                  <dt className="col-sm-4">{column.label}</dt>
                  <dd className="col-sm-8">{toText(selected[column.key])}</dd>
                </React.Fragment>
              ))}
            </dl>
            <GlassButton variant="filled" onClick={() => setSheetOpen(false)}>
              Close
            </GlassButton>
          </div>
        )}
      </GlassSheet>
    </GlassCard>
  );
}

export default ResourceList;
