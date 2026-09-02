import React from 'react';
import Link from 'next/link';

export default function ProjectsPage() {
  return (
    <div className="page-border">
      <h1>Projects</h1>
      <h4>Daily Symbol Sprint</h4>
      <p>
        A 90-second symbol–digit substitution test with a new key each day and private, on-device score history.
      </p>
      <Link href="/symbol-sprint/">Take today&apos;s test →</Link>
    </div>
  );
}
