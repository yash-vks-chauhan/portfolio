// The work-index filter: a React Bits RubberSegment (All 8 · AI systems 3 · Full-stack 3 · Research 2 · Mobile 1 ·
// Experiments 1). It sets data-filter on the list's container and CSS hides what doesn't match, so the page is
// complete without JavaScript. The choice is kept in the URL (?filter=mobile) and announced to screen readers.
import { useEffect, useState } from 'react';
import RubberSegment from '../bits/RubberSegment';

export interface FilterItem {
  value: string;
  label: string;
  count: number;
}

export default function WorkFilter({ items, target }: { items: FilterItem[]; target: string }) {
  const [value, setValue] = useState('all');
  const [say, setSay] = useState('');

  useEffect(() => {
    const from = new URLSearchParams(location.search).get('filter');
    if (from && items.some((i) => i.value === from)) setValue(from);
  }, [items]);

  useEffect(() => {
    const el = document.getElementById(target);
    if (el) el.dataset.filter = value;
  }, [value, target]);

  const choose = (next: string) => {
    setValue(next);
    const item = items.find((i) => i.value === next);
    if (item) setSay(`Showing ${item.count} ${item.count === 1 ? 'project' : 'projects'}${next === 'all' ? '' : `: ${item.label}`}`);
    const url = new URL(location.href);
    if (next === 'all') url.searchParams.delete('filter');
    else url.searchParams.set('filter', next);
    history.replaceState(history.state, '', url);
  };

  return (
    <>
      <RubberSegment
        items={items.map((i) => ({
          value: i.value,
          // One child, so the button's flex gap doesn't widen "AI systems 3" (as drawn: one text run).
          label: (
            <span>
              {i.label} <span className="seg-count">{i.count}</span>
            </span>
          ),
        }))}
        value={value}
        onChange={choose}
        trackColor="var(--fill2)"
        thumbColor="var(--seg-on)"
        textColor="var(--label2)"
        activeTextColor="var(--label)"
        thumbShadow="var(--seg-on-drop)"
        radius={999}
        size="lg"
        pad={16}
        equalSlots={false}
        className="work-filter"
        aria-label="Filter projects"
      />
      <p className="sr-only" aria-live="polite">
        {say}
      </p>
    </>
  );
}
