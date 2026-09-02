'use client';

import Link from 'next/link';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

const TEST_SECONDS = 90;
const HISTORY_KEY = 'willhath-symbol-sprint-history-v1';

const SYMBOLS = [
  { id: 'orbit', glyph: '◒' },
  { id: 'diamond', glyph: '◈' },
  { id: 'crosshair', glyph: '⊕' },
  { id: 'flower', glyph: '✣' },
  { id: 'crescent', glyph: '◖' },
  { id: 'spark', glyph: '⊹' },
  { id: 'lozenge', glyph: '◇' },
  { id: 'waves', glyph: '≋' },
  { id: 'hex', glyph: '⌬' },
] as const;

type Phase = 'ready' | 'countdown' | 'running' | 'complete';

type DailyKeyItem = (typeof SYMBOLS)[number] & {
  digit: number;
};

type RunResult = {
  id: string;
  dateKey: string;
  completedAt: string;
  correct: number;
  errors: number;
  attempted: number;
  accuracy: number;
  medianResponseMs: number;
};

type Counters = {
  correct: number;
  errors: number;
  attempted: number;
  responseTimes: number[];
};

function getLocalDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function hashString(value: string) {
  let hash = 2166136261;

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
}

function seededRandom(seed: number) {
  let currentSeed = seed;

  return () => {
    currentSeed += 0x6d2b79f5;
    let value = currentSeed;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function makeDailyKey(dateKey: string): DailyKeyItem[] {
  const digits = Array.from({ length: 9 }, (_, index) => index + 1);
  const random = seededRandom(hashString(`daily-symbol-sprint:${dateKey}`));

  for (let index = digits.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [digits[index], digits[swapIndex]] = [digits[swapIndex], digits[index]];
  }

  return SYMBOLS.map((symbol, index) => ({
    ...symbol,
    digit: digits[index],
  }));
}

function pickPrompt(previousIndex: number) {
  let nextIndex = Math.floor(Math.random() * SYMBOLS.length);

  if (nextIndex === previousIndex) {
    nextIndex = (nextIndex + 1 + Math.floor(Math.random() * (SYMBOLS.length - 1))) % SYMBOLS.length;
  }

  return nextIndex;
}

function median(values: number[]) {
  if (values.length === 0) return 0;

  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);

  if (sorted.length % 2 === 0) {
    return Math.round((sorted[middle - 1] + sorted[middle]) / 2);
  }

  return Math.round(sorted[middle]);
}

function isRunResult(value: unknown): value is RunResult {
  if (!value || typeof value !== 'object') return false;
  const result = value as Partial<RunResult>;

  return (
    typeof result.id === 'string' &&
    typeof result.dateKey === 'string' &&
    typeof result.completedAt === 'string' &&
    typeof result.correct === 'number' &&
    typeof result.errors === 'number' &&
    typeof result.attempted === 'number' &&
    typeof result.accuracy === 'number' &&
    typeof result.medianResponseMs === 'number'
  );
}

function formatRunDate(result: RunResult) {
  return new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(result.completedAt));
}

export default function SymbolSprint() {
  const [phase, setPhase] = useState<Phase>('ready');
  const [dateKey, setDateKey] = useState('loading');
  const [dateLabel, setDateLabel] = useState('Today');
  const [countdown, setCountdown] = useState(3);
  const [timeRemainingMs, setTimeRemainingMs] = useState(TEST_SECONDS * 1000);
  const [promptIndex, setPromptIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [errors, setErrors] = useState(0);
  const [history, setHistory] = useState<RunResult[]>([]);
  const [lastResult, setLastResult] = useState<RunResult | null>(null);
  const [storageAvailable, setStorageAvailable] = useState(true);

  const deadlineRef = useRef(0);
  const trialStartedAtRef = useRef(0);
  const finishedRef = useRef(false);
  const countersRef = useRef<Counters>({
    correct: 0,
    errors: 0,
    attempted: 0,
    responseTimes: [],
  });

  const dailyKey = useMemo(() => makeDailyKey(dateKey), [dateKey]);
  const prompt = dailyKey[promptIndex];

  useEffect(() => {
    const now = new Date();
    setDateKey(getLocalDateKey(now));
    setDateLabel(
      new Intl.DateTimeFormat(undefined, {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
      }).format(now),
    );

    try {
      const storedHistory = window.localStorage.getItem(HISTORY_KEY);
      if (!storedHistory) return;

      const parsed = JSON.parse(storedHistory) as unknown;
      if (Array.isArray(parsed)) {
        setHistory(parsed.filter(isRunResult).slice(0, 120));
      }
    } catch {
      setStorageAvailable(false);
    }
  }, []);

  const finishRun = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;

    const counters = countersRef.current;
    const result: RunResult = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      dateKey,
      completedAt: new Date().toISOString(),
      correct: counters.correct,
      errors: counters.errors,
      attempted: counters.attempted,
      accuracy: counters.attempted === 0 ? 0 : Math.round((counters.correct / counters.attempted) * 100),
      medianResponseMs: median(counters.responseTimes),
    };

    setTimeRemainingMs(0);
    setLastResult(result);
    setPhase('complete');
    setHistory((currentHistory) => {
      const nextHistory = [result, ...currentHistory].slice(0, 120);

      try {
        window.localStorage.setItem(HISTORY_KEY, JSON.stringify(nextHistory));
      } catch {
        setStorageAvailable(false);
      }

      return nextHistory;
    });
  }, [dateKey]);

  useEffect(() => {
    if (phase !== 'countdown') return;

    const timeout = window.setTimeout(() => {
      if (countdown > 1) {
        setCountdown((current) => current - 1);
        return;
      }

      const now = performance.now();
      deadlineRef.current = now + TEST_SECONDS * 1000;
      trialStartedAtRef.current = now;
      setPromptIndex((current) => pickPrompt(current));
      setPhase('running');
    }, 1000);

    return () => window.clearTimeout(timeout);
  }, [countdown, phase]);

  useEffect(() => {
    if (phase !== 'running') return;

    const updateTimer = () => {
      const remaining = Math.max(0, deadlineRef.current - performance.now());
      setTimeRemainingMs(remaining);

      if (remaining === 0) finishRun();
    };

    updateTimer();
    const interval = window.setInterval(updateTimer, 50);
    return () => window.clearInterval(interval);
  }, [finishRun, phase]);

  const startRun = () => {
    if (dateKey === 'loading') return;

    countersRef.current = {
      correct: 0,
      errors: 0,
      attempted: 0,
      responseTimes: [],
    };
    finishedRef.current = false;
    setCorrect(0);
    setErrors(0);
    setLastResult(null);
    setTimeRemainingMs(TEST_SECONDS * 1000);
    setCountdown(3);
    setPhase('countdown');
  };

  const answer = useCallback(
    (digit: number) => {
      if (phase !== 'running' || finishedRef.current) return;

      const now = performance.now();
      if (now >= deadlineRef.current) {
        finishRun();
        return;
      }

      const wasCorrect = digit === dailyKey[promptIndex].digit;
      const nextCounters = countersRef.current;
      nextCounters.attempted += 1;
      nextCounters.responseTimes.push(now - trialStartedAtRef.current);

      if (wasCorrect) {
        nextCounters.correct += 1;
        setCorrect(nextCounters.correct);
      } else {
        nextCounters.errors += 1;
        setErrors(nextCounters.errors);
      }

      trialStartedAtRef.current = now;
      setPromptIndex((current) => pickPrompt(current));
    },
    [dailyKey, finishRun, phase, promptIndex],
  );

  useEffect(() => {
    if (phase !== 'running') return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (/^[1-9]$/.test(event.key)) {
        event.preventDefault();
        answer(Number(event.key));
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [answer, phase]);

  const recentRuns = history.slice(0, 7);
  const personalBest = history.length > 0 ? Math.max(...history.map((result) => result.correct)) : null;
  const recentAverage =
    recentRuns.length > 0
      ? Math.round(recentRuns.reduce((total, result) => total + result.correct, 0) / recentRuns.length)
      : null;
  const displayedSeconds = Math.max(0, Math.ceil(timeRemainingMs / 100) / 10).toFixed(1);

  const clearHistory = () => {
    try {
      window.localStorage.removeItem(HISTORY_KEY);
    } catch {
      setStorageAvailable(false);
    }

    setHistory([]);
  };

  return (
    <main className="sprint-shell">
      <header className="sprint-header">
        <Link href="/" className="back-link">
          ← Finding Out
        </Link>
        <div className="day-chip">Daily edition · {dateLabel}</div>
      </header>

      <section className="sprint-intro" aria-labelledby="sprint-title">
        <p className="eyebrow">Processing speed · visual scanning · attention</p>
        <h1 id="sprint-title">Daily Symbol Sprint</h1>
        <p className="lede">
          Match each symbol to its number as quickly and accurately as you can. Today’s key is unique and stays
          fixed for the day, so every answer comes from the same map.
        </p>
      </section>

      <section className="test-card" aria-label="Daily symbol test">
        <div className="key-heading">
          <div>
            <span className="section-label">Today’s key</span>
            <span className="key-id">#{hashString(dateKey).toString(16).slice(0, 4).toUpperCase()}</span>
          </div>
          <span className="key-note">Changes at midnight</span>
        </div>

        <div className="symbol-key" aria-label="Symbol to number key">
          {dailyKey.map((item) => (
            <div className="key-item" key={item.id}>
              <span className="key-symbol" aria-hidden="true">
                {item.glyph}
              </span>
              <span className="key-number">{item.digit}</span>
            </div>
          ))}
        </div>

        <div className={`test-stage test-stage--${phase}`}>
          {phase === 'ready' && (
            <div className="ready-panel">
              <span className="timer-preview">1:30</span>
              <h2>One symbol at a time.</h2>
              <p>Use the number keys or tap the buttons. The score is the number correct in 90 seconds.</p>
              <button className="primary-button" type="button" onClick={startRun} disabled={dateKey === 'loading'}>
                Start today’s test
              </button>
              <span className="keyboard-hint">Keyboard: 1–9</span>
            </div>
          )}

          {phase === 'countdown' && (
            <div className="countdown-panel" aria-live="assertive">
              <span className="countdown-number">{countdown}</span>
              <span>Get ready</span>
            </div>
          )}

          {phase === 'running' && (
            <div className="running-panel">
              <div className="run-status" aria-live="polite">
                <div>
                  <span className="status-label">Time</span>
                  <strong>{displayedSeconds}s</strong>
                </div>
                <div>
                  <span className="status-label">Correct</span>
                  <strong>{correct}</strong>
                </div>
                <div>
                  <span className="status-label">Errors</span>
                  <strong>{errors}</strong>
                </div>
              </div>

              <div className="prompt-area" aria-label={`Current symbol: ${prompt.id}`}>
                <span className="prompt-label">Which number matches this symbol?</span>
                <span className="prompt-symbol" aria-hidden="true">
                  {prompt.glyph}
                </span>
              </div>

              <div className="answer-grid" aria-label="Answer choices">
                {Array.from({ length: 9 }, (_, index) => index + 1).map((digit) => (
                  <button type="button" key={digit} onClick={() => answer(digit)} aria-label={`Answer ${digit}`}>
                    {digit}
                  </button>
                ))}
              </div>
            </div>
          )}

          {phase === 'complete' && lastResult && (
            <div className="results-panel" aria-live="polite">
              <p className="result-kicker">Today’s score</p>
              <div className="score-lockup">
                <strong>{lastResult.correct}</strong>
                <span>correct</span>
              </div>
              <div className="result-grid">
                <div>
                  <span>Accuracy</span>
                  <strong>{lastResult.accuracy}%</strong>
                </div>
                <div>
                  <span>Errors</span>
                  <strong>{lastResult.errors}</strong>
                </div>
                <div>
                  <span>Median pace</span>
                  <strong>{(lastResult.medianResponseMs / 1000).toFixed(2)}s</strong>
                </div>
              </div>
              <p className="result-context">
                {history.length === 1
                  ? 'Your first result is now your baseline.'
                  : personalBest === lastResult.correct
                    ? 'That matches your best saved score.'
                    : `Your saved best is ${personalBest}.`}
              </p>
              <button className="primary-button" type="button" onClick={startRun}>
                Run it again
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="history-card" aria-labelledby="history-title">
        <div className="history-heading">
          <div>
            <p className="section-label">On this device</p>
            <h2 id="history-title">Your recent runs</h2>
          </div>
          {history.length > 0 && (
            <button className="text-button" type="button" onClick={clearHistory}>
              Clear history
            </button>
          )}
        </div>

        {history.length === 0 ? (
          <p className="empty-history">Your scores will appear here after your first run.</p>
        ) : (
          <>
            <div className="summary-strip">
              <div>
                <span>Personal best</span>
                <strong>{personalBest}</strong>
              </div>
              <div>
                <span>Recent average</span>
                <strong>{recentAverage}</strong>
              </div>
              <div>
                <span>Runs saved</span>
                <strong>{history.length}</strong>
              </div>
            </div>
            <div className="history-table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Score</th>
                    <th>Accuracy</th>
                    <th>Pace</th>
                  </tr>
                </thead>
                <tbody>
                  {history.slice(0, 8).map((result) => (
                    <tr key={result.id}>
                      <td>{formatRunDate(result)}</td>
                      <td>{result.correct}</td>
                      <td>{result.accuracy}%</td>
                      <td>{(result.medianResponseMs / 1000).toFixed(2)}s</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        <p className="privacy-note">
          {storageAvailable
            ? 'Results stay in this browser and are not uploaded.'
            : 'Private browsing settings prevented this browser from saving results.'}
        </p>
      </section>

      <aside className="science-note">
        <h2>What this measures</h2>
        <p>
          Symbol–digit substitution tasks are commonly used to sample processing speed, attention, and visual
          scanning. Sleep, stress, practice, device, and time of day can all move the score.
        </p>
        <p>This personal tracker is not a validated clinical instrument and should not be used for diagnosis.</p>
      </aside>
    </main>
  );
}
