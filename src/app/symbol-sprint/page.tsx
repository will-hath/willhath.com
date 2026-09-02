import type { Metadata } from 'next';
import SymbolSprint from './SymbolSprint';
import './symbol-sprint.css';

export const metadata: Metadata = {
  title: 'Daily Symbol Sprint | Finding Out',
  description: 'A private, timed symbol–digit substitution test for daily personal tracking.',
};

export default function SymbolSprintPage() {
  return <SymbolSprint />;
}
