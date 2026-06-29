import React, { useState, useEffect, useRef, useCallback } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

type Token = { t?: string; c?: string; node?: React.ReactNode; b?: boolean };
type Line = Token[];
type CommandResult = { lines?: Line[]; node?: React.ReactNode } | "CLEAR";

// ─── Constants ───────────────────────────────────────────────────────────────

const CHAR_DELAY = 12; // Slightly faster for a snappier boot
const LINE_PAUSE = 50;
const PROMPT = "mujahith@nexus";
const CWD = "~/dsa-mastery/arrays";
const TERMINAL_HEIGHT = 460; 

const BOOT_SCRIPT: Line[] = [
  [{ t: "BIOS v2.1.4 – Loading kernel modules...", c: "#475569" }],
  [{ t: "[ ", c:"#64748b"},{t:"  OK  ", c:"#22c55e"},{t:" ] Mounting filesystems", c:"#475569"}],
  [{ t: "[ ", c:"#64748b"},{t:"  OK  ", c:"#22c55e"},{t:" ] Starting network services", c:"#475569"}],
  [{ t: "[ ", c:"#64748b"},{t:"  OK  ", c:"#22c55e"},{t:" ] Loading Docker daemon", c:"#475569"}],
  [{ t: "[ ", c:"#64748b"},{t:"  OK  ", c:"#22c55e"},{t:" ] Initializing SSH server", c:"#475569"}],
  [],
  [{ t: "┌─────────────────────────────────────────┐", c: "#1e3a5f" }],
  [{ t: "│  ", c: "#1e3a5f" }, { t: "Ubuntu 22.04.3 LTS", c: "#38bdf8", b: true }, { t: "  –  Kernel 6.2.0-36", c: "#64748b" }, { t: "  │", c: "#1e3a5f" }],
  [{ t: "└─────────────────────────────────────────┘", c: "#1e3a5f" }],
  [],
  [{ t: "  System: ", c: "#64748b" }, { t: "nexus-dev-01", c: "#e2e8f0" }],
  [{ t: "  CPU:    ", c: "#64748b" }, { t: "AMD EPYC 7763 (16 cores)", c: "#e2e8f0" }],
  [{ t: "  Memory: ", c: "#64748b" }, { t: "32 GiB / 64 GiB", c: "#e2e8f0" }],
  [{ t: "  Uptime: ", c: "#64748b" }, { t: "3 days, 7 hours, 12 minutes", c: "#e2e8f0" }],
  [],
  [{ t: "❯ ", c: "#38bdf8", b: true }, { t: "ssh ", c: "#e2e8f0" }, { t: `${PROMPT}`, c: "#7dd3fc" }, { t: " -i ~/.ssh/id_ed25519", c: "#94a3b8" }],
  [{ t: "Authenticating... ", c: "#64748b" }, { t: "✓ Public key accepted", c: "#22c55e" }],
  [],
  [{ t: "❯ ", c: "#38bdf8", b: true }, { t: "docker compose up -d", c: "#e2e8f0" }],
  [{ t: " ✔  Network ", c: "#22c55e" }, { t: "project_default", c: "#94a3b8" }, { t: "  Created", c: "#22c55e" }],
  [{ t: " ✔  Container ", c: "#22c55e" }, { t: "api        ", c: "#94a3b8" }, { t: "  Started  ", c: "#22c55e" }, { t: "0.3s", c: "#475569" }],
  [{ t: " ✔  Container ", c: "#22c55e" }, { t: "postgres   ", c: "#94a3b8" }, { t: "  Started  ", c: "#22c55e" }, { t: "0.5s", c: "#475569" }],
  [{ t: " ✔  Container ", c: "#22c55e" }, { t: "redis      ", c: "#94a3b8" }, { t: "  Started  ", c: "#22c55e" }, { t: "0.2s", c: "#475569" }],
  [{ t: " ✔  Container ", c: "#22c55e" }, { t: "nginx      ", c: "#94a3b8" }, { t: "  Started  ", c: "#22c55e" }, { t: "0.4s", c: "#475569" }],
  [],
  [{ t: "System ready.", c: "#22c55e", b: true }, { t: " Type ", c: "#64748b" }, { t: "'help'", c: "#fde68a" }, { t: " or ", c: "#64748b" }, { t: "'?'", c: "#fde68a" }, { t: " to see commands.", c: "#64748b" }],
  [],
];

// ─── Animated Components ─────────────────────────────────────────────────────

function CoffeeAnim() {
  const [f, setF] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setF(x => (x + 1) % 4), 350);
    return () => clearInterval(t);
  }, []);
  const steam = [
    "  ( (   ) )\n   ) (  ( (  \n  ( (   ) )",
    "   ) (  ( (\n  ( (   ) )\n   ) (  ( (",
    "  ( (   ) )\n   ) (  ( (\n  ( (   ) )",
    "   ) (  ( (\n   ) (  ( (\n  ( (   ) )",
  ];
  return (
    <pre style={{ color: "#fde68a", fontFamily: "inherit", fontSize: 12, lineHeight: 1.4, margin: "8px 0 8px 16px", userSelect: "none" }}>
      <span style={{ color: "#cbd5e1"}}>{steam[f]}</span>
      {`
       ___________
      |           |
      |   ☕ 〜   |
      |  BREWING  |
      |___________|
       \\_________/
        |       |
───────┴───────┴───────`}
    </pre>
  );
}

function MatrixCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    c.width = c.offsetWidth;
    c.height = c.offsetHeight;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const chars = "アイウエオカキクケコ0123456789ABCDEF@#$%";
    const sz = 14;
    const cols = Math.floor(c.width / sz);
    const drops = Array(cols).fill(1);
    const draw = () => {
      ctx.fillStyle = "rgba(4, 9, 4, 0.2)";
      ctx.fillRect(0, 0, c.width, c.height);
      drops.forEach((y, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillStyle = i % 7 === 0 ? "#ffffff" : "#00ff41";
        ctx.shadowBlur = i % 3 === 0 ? 8 : 0;
        ctx.shadowColor = ctx.fillStyle;
        ctx.font = `${sz}px monospace`;
        ctx.fillText(char, i * sz, y * sz);
        ctx.shadowBlur = 0;
        if (y * sz > c.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });
    };
    const id = setInterval(draw, 45);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="matrix-container" style={{ width: "100%", height: 220, margin: "8px 0", borderRadius: 6, overflow: "hidden", position: "relative", border: "1px solid rgba(0, 255, 65, 0.2)", boxShadow: "0 0 15px rgba(0, 255, 65, 0.05)" }}>
      <div style={{ position: "absolute", top: 6, left: 10, color: "#00ff41", fontSize: 10, fontWeight: 700, background: "rgba(0,0,0,0.8)", padding: "2px 8px", borderRadius: 3, zIndex: 1, letterSpacing: "0.5px" }}>
        SIMULATION ACTIVE // FOLLOW THE WHITE RABBIT
      </div>
      <canvas ref={ref} style={{ width: "100%", height: "100%", display: "block", background: "#020a02" }} />
    </div>
  );
}

function SnakeGame() {
  const SIZE = 15;
  const CELL = 14;
  type Point = [number, number];

  const [snake, setSnake] = useState<Point[]>([[7,7],[6,7],[5,7]]);
  const [food, setFood] = useState<Point>([10,5]);
  const [alive, setAlive] = useState(true);
  const [score, setScore] = useState(0);
  const [started, setStarted] = useState(false);

  const dirRef = useRef<Point>([1,0]);
  const snakeRef = useRef<Point[]>([[7,7],[6,7],[5,7]]);
  const foodRef = useRef<Point>([10,5]);
  const aliveRef = useRef(true);

  const spawnFood = (s: Point[]): Point => {
    let f: Point;
    do { f = [Math.floor(Math.random() * SIZE), Math.floor(Math.random() * SIZE)]; }
    while (s.some(([x,y]) => x === f[0] && y === f[1]));
    return f;
  };

  useEffect(() => {
    if (!started) return;
    const handle = (e: KeyboardEvent) => {
      const map: Record<string, Point> = {
        ArrowUp: [0,-1], ArrowDown: [0,1], ArrowLeft: [-1,0], ArrowRight: [1,0],
        w: [0,-1], s: [0,1], a: [-1,0], d: [1,0]
      };
      const k = map[e.key];
      if (!k) return;
      if (k[0] === -dirRef.current[0] && k[1] === -dirRef.current[1]) return;
      dirRef.current = k;
      e.preventDefault();
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [started]);

  useEffect(() => {
    if (!started || !aliveRef.current) return;
    const tick = setInterval(() => {
      const head: Point = [snakeRef.current[0][0] + dirRef.current[0], snakeRef.current[0][1] + dirRef.current[1]];
      if (head[0] < 0 || head[0] >= SIZE || head[1] < 0 || head[1] >= SIZE || snakeRef.current.some(([x,y]) => x === head[0] && y === head[1])) {
        aliveRef.current = false; setAlive(false); return;
      }
      const ate = head[0] === foodRef.current[0] && head[1] === foodRef.current[1];
      const newSnake: Point[] = [head, ...snakeRef.current.slice(0, ate ? undefined : -1)];
      snakeRef.current = newSnake; setSnake([...newSnake]);
      if (ate) {
        setScore(s => s + 10);
        const nf = spawnFood(newSnake); foodRef.current = nf; setFood(nf);
      }
    }, 110);
    return () => clearInterval(tick);
  }, [started]);

  const restart = () => {
    const s: Point[] = [[7,7],[6,7],[5,7]];
    const f: Point = [10,5];
    snakeRef.current = s; foodRef.current = f; dirRef.current = [1,0];
    aliveRef.current = true;
    setSnake(s); setFood(f); setAlive(true); setScore(0); setStarted(true);
  };

  const grid = Array.from({length: SIZE}, (_, y) =>
    Array.from({length: SIZE}, (_, x) => {
      const isHead = snake[0][0] === x && snake[0][1] === y;
      const isBody = !isHead && snake.some(([sx,sy]) => sx === x && sy === y);
      const isFood = food[0] === x && food[1] === y;
      return { isHead, isBody, isFood };
    })
  );

  return (
    <div style={{ margin: "8px 0 16px 0" }}>
      <div style={{ fontSize: 11, color: "#64748b", marginBottom: 8 }}>
        Score: <span style={{color: "#22c55e", fontWeight: "bold"}}>{score}</span>
        {started && alive && <span style={{color:"#475569", marginLeft:12}}>← ↑ ↓ →  or  WASD</span>}
      </div>
      <div style={{ display: "inline-block", border: "1px solid rgba(30, 58, 95, 0.6)", borderRadius: 8, overflow: "hidden", lineHeight: 0, padding: 4, background: "#06090f", boxShadow: "inset 0 0 10px rgba(0,0,0,0.5)" }}>
        {grid.map((row, y) => (
          <div key={y} style={{display: "flex"}}>
            {row.map((cell, x) => (
              <div key={x} style={{
                width: CELL, height: CELL, margin: 1,
                background: cell.isHead ? "#38bdf8" : cell.isBody ? "#0ea5e9" : cell.isFood ? "#f43f5e" : "#0f172a",
                boxShadow: cell.isFood ? "0 0 8px rgba(244, 63, 94, 0.6)" : cell.isHead ? "0 0 6px rgba(56, 189, 248, 0.6)" : "none",
                borderRadius: cell.isHead ? 4 : cell.isFood ? 8 : 2,
                transition: "background 0.05s",
              }}/>
            ))}
          </div>
        ))}
      </div>
      {!started && <div style={{marginTop:10}}><button onClick={restart} className="interactive-btn">▶ Initialize Subroutine</button></div>}
      {started && !alive && <div style={{marginTop:10,color:"#ef4444",fontSize:12, fontWeight: "bold"}}>GAME OVER // SCORE: {score} <button onClick={restart} style={{marginLeft:12}} className="interactive-btn secondary">Retry</button></div>}
    </div>
  );
}

function HackerProgress() {
  const tasks = [
    { label:"Bypassing mainframe firewall", dur: 600 },
    { label:"Dumping kernel memory", dur: 900 },
    { label:"Decrypting root payload", dur: 700 },
    { label:"Exfiltrating Notion API keys", dur: 800 },
    { label:"Scrubbing security logs", dur: 500 },
  ];
  const [step, setStep] = useState(0);
  const [pct, setPct] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (step >= tasks.length) { setDone(true); return; }
    setPct(0);
    let p = 0;
    const interval = tasks[step].dur / 100;
    const id = setInterval(() => {
      p++; setPct(p);
      if (p >= 100) { clearInterval(id); setStep(s => s + 1); }
    }, interval);
    return () => clearInterval(id);
  }, [step]);

  return (
    <div style={{ margin: "12px 0 12px 16px", fontSize: 12 }}>
      {tasks.map((t, i) => {
        const isDone = i < step || done;
        const isActive = i === step && !done;
        return (
          <div key={i} style={{ marginBottom: 6 }}>
            <span style={{ color: isDone ? "#22c55e" : isActive ? "#fde68a" : "#334155", fontWeight: "bold" }}>
              {isDone ? "[✓]" : isActive ? "[▶]" : "[ ]"}
            </span>
            <span style={{ color: isDone ? "#94a3b8" : isActive ? "#e2e8f0" : "#334155", marginLeft: 10, minWidth: 230, display: "inline-block" }}>
              {t.label}
            </span>
            {isActive && (
              <span style={{ color: "#475569", marginLeft: 8 }}>
                [{Array.from({length:20}, (_, j) => <span key={j} style={{color: j < Math.floor(pct/5) ? "#38bdf8" : "#1e293b"}}>█</span>)}]
                {" "}<span style={{color:"#f8fafc", minWidth: 35, display: "inline-block", textAlign: "right"}}>{pct}%</span>
              </span>
            )}
            {isDone && <span style={{color:"#22c55e", marginLeft: 8}}> SUCCESS</span>}
          </div>
        );
      })}
      {done && <div style={{color:"#38bdf8", marginTop: 12, fontWeight: "bold"}}>ACCESS GRANTED. (Just kidding, your data is safe 😏)</div>}
    </div>
  );
}

function SysInfo() {
  const [cpu, setCpu] = useState(23);
  const [mem, setMem] = useState(61);
  const [net, setNet] = useState(4.2);

  useEffect(() => {
    const id = setInterval(() => {
      setCpu(c => Math.max(5, Math.min(95, c + (Math.random()-0.5)*8)));
      setMem(m => Math.max(40, Math.min(85, m + (Math.random()-0.5)*3)));
      setNet(n => Math.max(0.1, Math.min(100, n + (Math.random()-0.5)*5)));
    }, 800);
    return () => clearInterval(id);
  }, []);

  const Bar = ({val, color}: {val: number, color: string}) => (
    <span style={{display: "inline-flex", gap: 2, alignItems: "flex-end", height: 12}}>
      {Array.from({length: 20}, (_, i) => (
        <span key={i} style={{
          width: 4,
          height: i < val/5 ? 12 : 4,
          background: i < val/5 ? color : "#1e293b",
          borderRadius: 1,
          transition: "height 0.2s ease, background 0.2s ease",
          boxShadow: i < val/5 ? `0 0 4px ${color}40` : "none"
        }} />
      ))}
    </span>
  );

  return (
    <div style={{ margin: "12px 0", background: "rgba(15, 23, 42, 0.6)", padding: "16px", borderRadius: 8, border: "1px solid rgba(51, 65, 85, 0.5)", width: "fit-content", backdropFilter: "blur(4px)" }}>
      <div style={{marginBottom:10}}><span style={{color:"#94a3b8",display:"inline-block",width:60, fontWeight: "bold"}}>CPU  </span><Bar val={cpu} color="#38bdf8"/><span style={{color:"#f8fafc",marginLeft:12, minWidth: 50, display: "inline-block", textAlign: "right"}}>{cpu.toFixed(1)}%</span></div>
      <div style={{marginBottom:10}}><span style={{color:"#94a3b8",display:"inline-block",width:60, fontWeight: "bold"}}>MEM  </span><Bar val={mem} color="#a78bfa"/><span style={{color:"#f8fafc",marginLeft:12, minWidth: 50, display: "inline-block", textAlign: "right"}}>{mem.toFixed(1)}%</span></div>
      <div style={{marginBottom:4}}><span style={{color:"#94a3b8",display:"inline-block",width:60, fontWeight: "bold"}}>NET  </span><Bar val={net} color="#34d399"/><span style={{color:"#f8fafc",marginLeft:12, minWidth: 50, display: "inline-block", textAlign: "right"}}>{net.toFixed(1)} <span style={{color:"#64748b"}}>MB/s</span></span></div>
      <div style={{color:"#475569",marginTop:12,fontSize:10, letterSpacing: "0.5px", textTransform: "uppercase"}}>Live Telemetry Feed – 800ms Tick</div>
    </div>
  );
}

function AsciiRocket() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setY(v => v + 1), 50);
    return () => clearInterval(id);
  }, []);

  const rocket = `    /\\
   /  \\
  | !! |
  |    |
 /|    |\\
/ |    | \\
  |    |
  | .. |
  '----'
  / || \\
 /  ||  \\
'   ''   '`;

  const flames = [
    "  █████\n   ███\n    █",
    "  █████\n  █████\n   ███",
    "  █████\n   ███\n   ███"
  ];
  const flame = flames[y % 3];

  return (
    <pre style={{ color: "#e2e8f0", fontFamily: "inherit", fontSize: 12, lineHeight: 1.2, margin: "16px 0 16px 16px", userSelect: "none" }}>
      {rocket}
      {"\n"}<span style={{color:"#f97316", textShadow: "0 0 8px #f97316"}}>{flame}</span>
      {"\n\n"}<span style={{color:"#64748b",fontSize:10, letterSpacing: "1px"}}>🚀 DEPLOYING TO PRODUCTION... {"▰".repeat((y % 15) + 1)}{"▱".repeat(15 - (y % 15))}</span>
    </pre>
  );
}

// ─── Command Registry ─────────────────────────────────────────────────────────

const COMMANDS: Record<string, () => CommandResult> = {
  help: () => ({lines:[
    [{t:"╔══════════════════════════════════════════╗", c:"#1e3a5f"}],
    [{t:"║  ", c:"#1e3a5f"},{t:"        Available Commands", c:"#7dd3fc", b:true},{t:"          ║", c:"#1e3a5f"}],
    [{t:"╠══════════════════════════════════════════╣", c:"#1e3a5f"}],
    [{t:"║  ", c:"#1e3a5f"},{t:"whoami     ", c:"#fde68a"},{t:"Print current user            ║", c:"#64748b"}],
    [{t:"║  ", c:"#1e3a5f"},{t:"cat skills ", c:"#fde68a"},{t:"Tech stack overview           ║", c:"#64748b"}],
    [{t:"║  ", c:"#1e3a5f"},{t:"ls         ", c:"#fde68a"},{t:"List project directory        ║", c:"#64748b"}],
    [{t:"║  ", c:"#1e3a5f"},{t:"git log    ", c:"#fde68a"},{t:"Recent commits                ║", c:"#64748b"}],
    [{t:"║  ", c:"#1e3a5f"},{t:"htop       ", c:"#fde68a"},{t:"Live system monitor           ║", c:"#64748b"}],
    [{t:"║  ", c:"#1e3a5f"},{t:"neofetch   ", c:"#fde68a"},{t:"System info + ASCII art       ║", c:"#64748b"}],
    [{t:"║  ", c:"#1e3a5f"},{t:"clear      ", c:"#fde68a"},{t:"Clear terminal output         ║", c:"#64748b"}],
    [{t:"║  ", c:"#1e3a5f"},{t:"──────── Easter Eggs ──────", c:"#334155"},{t:" ────────║", c:"#1e3a5f"}],
    [{t:"║  ", c:"#1e3a5f"},{t:"coffee     ", c:"#f97316"},{t:"Brew something hot ☕          ║", c:"#64748b"}],
    [{t:"║  ", c:"#1e3a5f"},{t:"matrix     ", c:"#f97316"},{t:"Follow the white rabbit       ║", c:"#64748b"}],
    [{t:"║  ", c:"#1e3a5f"},{t:"snake      ", c:"#f97316"},{t:"Playable snake game 🐍         ║", c:"#64748b"}],
    [{t:"║  ", c:"#1e3a5f"},{t:"hack       ", c:"#f97316"},{t:"Totally legal hacking sim     ║", c:"#64748b"}],
    [{t:"║  ", c:"#1e3a5f"},{t:"deploy     ", c:"#f97316"},{t:"Ship it 🚀                    ║", c:"#64748b"}],
    [{t:"║  ", c:"#1e3a5f"},{t:"elite      ", c:"#f97316"},{t:"???                           ║", c:"#64748b"}],
    [{t:"║  ", c:"#1e3a5f"},{t:"sudo rm -rf", c:"#f97316"},{t:"...are you sure?              ║", c:"#64748b"}],
    [{t:"╚══════════════════════════════════════════╝", c:"#1e3a5f"}],
  ]}),

  "?": () => COMMANDS["help"](),

  whoami: () => ({lines:[
    [{t:"mujahith", c:"#86efac", b: true}],
    [{t:"uid=", c:"#64748b"},{t:"1001", c:"#7dd3fc"},{t:"(mujahith) gid=", c:"#64748b"},{t:"1001", c:"#7dd3fc"},{t:"(developers) groups=", c:"#64748b"},{t:"27(sudo),4(docker)", c:"#7dd3fc"}],
  ]}),

  ls: () => ({lines:[
    [{t:"total 16", c:"#475569"}],
    [{t:"-rw-r--r--  ", c:"#64748b"},{t:"main.cpp      ", c:"#7dd3fc", b:true},{t:"  Core array implementation", c:"#334155"}],
    [{t:"-rw-r--r--  ", c:"#64748b"},{t:"pointers.cpp  ", c:"#7dd3fc", b:true},{t:"  Memory allocation test", c:"#334155"}],
    [{t:"-rw-r--r--  ", c:"#64748b"},{t:"sliding_window.cpp", c:"#e2e8f0"},{t:"  Two-pointer techniques", c:"#334155"}],
    [{t:"-rw-r--r--  ", c:"#64748b"},{t:"README.md     ", c:"#e2e8f0"},{t:"  Complexity analysis notes", c:"#334155"}],
  ]}),

  "git log": () => ({lines:[
    [{t:"* ", c:"#f97316"},{t:"a7f3d2c ", c:"#94a3b8"},{t:"(HEAD → main) ", c:"#22c55e", b:true},{t:"feat: optimize array traversal to O(N)", c:"#e2e8f0"}],
    [{t:"* ", c:"#f97316"},{t:"3b19e8f ", c:"#94a3b8"},{t:"fix: resolve memory leak in raw pointer assignment", c:"#e2e8f0"}],
    [{t:"* ", c:"#f97316"},{t:"d84ca01 ", c:"#94a3b8"},{t:"docs: update Notion roadmap structure", c:"#e2e8f0"}],
    [{t:"* ", c:"#f97316"},{t:"9e3f7aa ", c:"#94a3b8"},{t:"feat: initialize C++ array mechanics fundamentals", c:"#e2e8f0"}],
  ]}),

  "cat skills": () => ({lines:[
    [{t:"╭──────────────────────────────────────╮", c:"#1e3a5f"}],
    [{t:"│  ", c:"#1e3a5f"},{t:"Languages ", c:"#7dd3fc", b:true},{t:"  C++ · Python · TypeScript    │", c:"#fde68a"}],
    [{t:"│  ", c:"#1e3a5f"},{t:"Theory    ", c:"#7dd3fc", b:true},{t:"  DSA · Memory Mgt · Comp Sci  │", c:"#fde68a"}],
    [{t:"│  ", c:"#1e3a5f"},{t:"Design    ", c:"#7dd3fc", b:true},{t:"  Elite UI · Multimedia        │", c:"#fde68a"}],
    [{t:"│  ", c:"#1e3a5f"},{t:"Infra     ", c:"#7dd3fc", b:true},{t:"  Docker · K8s · Terraform     │", c:"#fde68a"}],
    [{t:"╰──────────────────────────────────────╯", c:"#1e3a5f"}],
  ]}),

  htop: () => ({node: <SysInfo/>}),
  coffee: () => ({node: <CoffeeAnim/>}),
  matrix: () => ({node: <MatrixCanvas/>}),
  snake: () => ({node: <SnakeGame/>}),
  hack: () => ({node: <HackerProgress/>}),
  deploy: () => ({node: <AsciiRocket/>}),

  elite: () => ({lines:[
    [{t:"Checking UI status... ", c:"#64748b"},{t:"[OK]", c:"#22c55e"}],
    [{t:"Scanning for basic design... ", c:"#64748b"},{t:"[NONE FOUND]", c:"#38bdf8"}],
    [{t:"Verdict: ", c:"#94a3b8"},{t:"You're already operating at peak aesthetics. 😏✨", c:"#a78bfa", b:true}]
  ]}),

  neofetch: () => ({lines:[
    [{t:"        .-/+oossssoo+/-.               ", c:"#f97316"},{t:" mujahith", c:"#86efac", b:true},{t:"@nexus", c:"#e2e8f0"}],
    [{t:"      `:+ssssssssssssssssss+:`         ", c:"#f97316"},{t:" ─────────────────────", c:"#475569"}],
    [{t:"    -+ssssssssssssssssssyyssss+-       ", c:"#f97316"},{t:" OS:    Ubuntu 22.04.3 LTS", c:"#94a3b8"}],
    [{t:"  .ossssssssssssssssssdMMMNysssso.     ", c:"#f97316"},{t:" Kernel: 6.2.0-36-generic", c:"#94a3b8"}],
    [{t:" /ssssssssssshdmmNNmmyNMMMMhssssss/    ", c:"#f97316"},{t:" Shell:  zsh 5.9", c:"#94a3b8"}],
    [{t:"+ssssssssshmydMMMMMMMNddddyssssssss+   ", c:"#fde68a"},{t:" CPU:    AMD EPYC 7763 (16)", c:"#94a3b8"}],
    [{t:"/sssssssshNMMMyhhyyyyhmNMMMNhssssssss/   ", c:"#fde68a"},{t:" Memory: 20.1GiB / 64GiB", c:"#94a3b8"}],
    [{t:".ssssssssdMMMNhsssssssshNMMMdssssssss.   ", c:"#22c55e"},{t:" Uptime: 3d 7h 12m", c:"#94a3b8"}],
    [{t:"+sssshhhyNMMNyssssssssyNMMMysssssss+   ", c:"#22c55e"},{t:" Pkgs:   1847 (dpkg)", c:"#94a3b8"}],
    [{t:"ossyNMMMNyMMhsssssssssshmmmhssssssso   ", c:"#38bdf8"},{t:" ●●●●●●●●", c:"#ef4444"},{t:"●●●●●●●●", c:"#f97316"},{t:"●●●●●●●●", c:"#fde68a"}],
    [{t:"+sssshhhyNMMNyssssssssyNMMMysssssss+   ", c:"#38bdf8"}],
    [{t:".ssssssssdMMMNhsssssssshNMMMdssssssss.   ", c:"#a78bfa"}],
    [{t:"/sssssssshNMMMyhhyyyyhmNMMMNhssssssss/   ", c:"#a78bfa"}],
    [{t:"+sssssssssdmydMMMMMMMMddddyssssssss+   ", c:"#64748b"}],
    [{t:" /ssssssssssshdmNNNNmyNMMMMhssssss/    ", c:"#64748b"}],
    [{t:"  .ossssssssssssssssssdMMMNysssso.     ", c:"#475569"}],
    [{t:"    -+sssssssssssssssssyyyssss+-       ", c:"#334155"}],
    [{t:"      `:+ssssssssssssssssss+:`         ", c:"#1e293b"}],
    [{t:"          .-/+oossssoo+/-.             ", c:"#0f172a"}],
  ]}),

  "sudo rm -rf /": () => ({lines:[
    [{t:"[sudo] password for mujahith: ", c:"#e2e8f0"}],
    [{t:"", c:""}],
    [{t:"  ██████╗  █████╗ ███╗   ██╗ ██████╗ ███████╗██████╗ ", c:"#ef4444", b:true}],
    [{t:"  ██╔══██╗██╔══██╗████╗  ██║██╔════╝ ██╔════╝██╔══██╗", c:"#ef4444", b:true}],
    [{t:"  ██║  ██║███████║██╔██╗ ██║██║  ███╗█████╗  ██████╔╝", c:"#ef4444", b:true}],
    [{t:"  ██║  ██║██╔══██║██║╚██╗██║██║   ██║██╔══╝  ██╔══██╗", c:"#ef4444", b:true}],
    [{t:"  ██████╔╝██║  ██║██║ ╚████║╚██████╔╝███████╗██║  ██║", c:"#ef4444", b:true}],
    [{t:"  ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═══╝ ╚═════╝ ╚══════╝╚═╝  ╚═╝", c:"#ef4444", b:true}],
    [],
    [{t:"  Nice try. The C++ pointers are manually managed, but I'm not letting you dump the core. 😜", c:"#ef4444"}],
    [{t:"  This incident has been logged and reported to Notion.", c:"#94a3b8"}],
    [{t:"  FBI notification: ", c:"#64748b"},{t:"DISPATCHED", c:"#ef4444", b:true}],
  ]}),

  clear: () => "CLEAR",
};

function parseCmd(raw: string): CommandResult {
  const t = raw.trim().toLowerCase();
  
  // Handle echo command
  if (t.startsWith("echo ")) {
    return {lines: [[{t: raw.slice(5), c:"#e2e8f0"}]]};
  }

  if (COMMANDS[t]) return COMMANDS[t]();

  if (t.startsWith("sudo ") && !COMMANDS[t]) {
    return {lines:[[{t:"sudo: nice try, but you don't have those privileges here.", c:"#ef4444"}]]};
  }
  if (t === "exit" || t === "quit") {
    return {lines:[[{t:"There is no escape. The DSA grind never stops. 😈", c:"#a78bfa"}]]};
  }
  if (t === "vim" || t === "vi" || t === "nano") {
    return {lines:[
      [{t:`bash: ${t}: command not found`, c:"#ef4444"}],
      [{t:"(Just kidding. But how would you exit anyway?)", c:"#475569"}],
    ]};
  }
  return {lines:[
    [{t:`zsh: command not found: ${raw.trim()}`, c:"#ef4444"}],
    [{t:"Try ", c:"#64748b"},{t:"'help'", c:"#fde68a"},{t:" to see available commands.", c:"#64748b"}],
  ]};
}

// ─── Main Terminal ─────────────────────────────────────────────────────────────

export default function Terminal() {
  const [phase, setPhase] = useState<"boot" | "interactive">("boot");
  const [bootLine, setBootLine] = useState(0);
  const [bootChar, setBootChar] = useState(0);
  const [history, setHistory] = useState<Line[][]>([]);
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [tabCount, setTabCount] = useState(0);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [bootLine, bootChar, history]);

  useEffect(() => {
    if (phase !== "boot") return;
    let cancelled = false;
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    const sched = (fn: () => void, d: number) => {
      const id = setTimeout(() => { if (!cancelled) fn(); }, d);
      timeouts.push(id);
    };

    const revealLine = (li: number) => {
      if (li >= BOOT_SCRIPT.length) { setPhase("interactive"); return; }
      const line = BOOT_SCRIPT[li];
      const total = line.reduce((a, tok) => a + (tok.t?.length || 0), 0);

      if (total === 0) {
        setBootLine(li + 1); setBootChar(0);
        sched(() => revealLine(li + 1), LINE_PAUSE);
        return;
      }

      let c = 0;
      const tick = () => {
        c++; setBootChar(c);
        if (c < total) sched(tick, CHAR_DELAY);
        else { setBootLine(li + 1); setBootChar(0); sched(() => revealLine(li + 1), LINE_PAUSE); }
      };
      sched(tick, CHAR_DELAY);
    };

    revealLine(0);
    return () => { cancelled = true; timeouts.forEach(clearTimeout); };
  }, [phase]);

  useEffect(() => {
    if (phase === "interactive" && !isMinimized) {
      // Small timeout to ensure render is complete before focusing
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  }, [phase, isMinimized, history]);

  const renderBootLine = (li: number, isTyping: boolean) => {
    const line = BOOT_SCRIPT[li];
    if (!line || line.length === 0) return <br />;
    let rem = isTyping ? bootChar : Infinity;

    return line.map((tok, ti) => {
      const show = Math.min(rem, tok.t?.length || 0);
      rem -= show;
      const text = tok.t ? tok.t.slice(0, show) : "";
      const cursor = isTyping && rem <= 0 && ti === line.length - 1;

      return (
        <span key={ti} style={{ color: tok.c || "inherit", fontWeight: tok.b ? "bold" : "normal" }}>
          {text}
          {cursor && <span className="cursor-blink" />}
        </span>
      );
    });
  };

  const renderLine = (line: Line, key: string) => {
    if (!line || line.length === 0) return <br key={key} />;
    return (
      <div key={key} style={{ marginBottom: 2 }}>
        {line.map((tok, ti) =>
          tok.node
            ? <div key={ti}>{tok.node}</div>
            : <span key={ti} style={{ color: tok.c || "inherit", fontWeight: tok.b ? "bold" : "normal" }}>{tok.t}</span>
        )}
      </div>
    );
  };

  const submit = useCallback(() => {
    const cmd = input.trim();
    setInput(""); setHistIdx(-1);
    if (!cmd) {
      // Just print an empty prompt if they hit enter with no command
      const emptyLine: Line = [
        { t: `${PROMPT} `, c: "#86efac", b: true },
        { t: `${CWD} `, c: "#fde68a" },
        { t: "❯ ", c: "#38bdf8", b: true },
      ];
      setHistory(h => [...h, emptyLine]);
      return;
    }

    setCmdHistory(h => [cmd, ...h.slice(0, 49)]);

    const cmdLine: Line = [
      { t: `${PROMPT} `, c: "#86efac", b: true },
      { t: `${CWD} `, c: "#fde68a" },
      { t: "❯ ", c: "#38bdf8", b: true },
      { t: cmd, c: "#e2e8f0" },
    ];

    const result = parseCmd(cmd);
    if (result === "CLEAR") {
      setHistory([]);
      return;
    }

    if (result.node) {
      setHistory(h => [...h, cmdLine, [{ node: result.node }]]);
    } else {
      setHistory(h => [...h, cmdLine, ...(result.lines || [])]);
    }
  }, [input]);

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") { submit(); return; }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      const idx = Math.min(histIdx + 1, cmdHistory.length - 1);
      setHistIdx(idx);
      setInput(cmdHistory[idx] || "");
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      const idx = histIdx - 1;
      if (idx < 0) { setHistIdx(-1); setInput(""); }
      else { setHistIdx(idx); setInput(cmdHistory[idx] || ""); }
    }

    if (e.key === "Tab") {
      e.preventDefault();
      const keys = Object.keys(COMMANDS);
      const matches = keys.filter(k => k.startsWith(input.toLowerCase()));
      if (matches.length === 1) setInput(matches[0]);
      else if (matches.length > 1) {
        const tc = tabCount + 1;
        setTabCount(tc);
        if (tc >= 2) {
          setHistory(h => [...h, [{ t: matches.join("   "), c: "#64748b" }]]);
          setTabCount(0);
        }
      }
    }

    if (e.key === "l" && e.ctrlKey) { e.preventDefault(); setHistory([]); }
    if (e.key === "c" && e.ctrlKey) { e.preventDefault(); setInput(""); setHistory(h => [...h, [{ t: "^C", c: "#ef4444" }]]); }
  };

  const computedHeight = isFullscreen ? "100dvh" : isMinimized ? "48px" : `${TERMINAL_HEIGHT}px`;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap');
        
        .cursor-blink {
          display: inline-block; width: 8px; height: 16px;
          background: #e2e8f0; vertical-align: middle;
          margin-left: 2px; margin-bottom: 2px;
          animation: blink 1s step-end infinite;
          box-shadow: 0 0 6px rgba(226, 232, 240, 0.6);
        }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        
        .term-scroll {
          scrollbar-width: thin;
          scrollbar-color: rgba(148, 163, 184, 0.2) transparent;
        }
        .term-scroll::-webkit-scrollbar { width: 6px; }
        .term-scroll::-webkit-scrollbar-track { background: transparent; }
        .term-scroll::-webkit-scrollbar-thumb { background-color: rgba(148, 163, 184, 0.2); border-radius: 10px; }
        
        .traffic-btn { transition: opacity 0.15s, transform 0.1s; }
        .traffic-btn:hover { opacity: 0.85; transform: scale(1.15); }
        .traffic-btn:active { transform: scale(0.9); }
        
        /* Mobile safe hidden input */
        .term-input-hidden {
          position: absolute; opacity: 0; pointer-events: none; left: -9999px; top: 0;
        }

        .interactive-btn {
          background: rgba(14, 79, 122, 0.5); color: #e0f2fe;
          border: 1px solid #38bdf8; border-radius: 6px;
          padding: 6px 16px; font-size: 11px; cursor: pointer;
          font-family: inherit; font-weight: bold; letter-spacing: 0.5px;
          transition: all 0.2s ease;
          box-shadow: 0 0 10px rgba(56, 189, 248, 0.2);
        }
        .interactive-btn:hover {
          background: rgba(14, 79, 122, 0.8);
          box-shadow: 0 0 15px rgba(56, 189, 248, 0.4);
        }
        .interactive-btn.secondary {
          background: #1e1e2e; border-color: #475569; color: #f8fafc; box-shadow: none;
        }
        .interactive-btn.secondary:hover {
          background: #28283d; border-color: #64748b;
        }
        
        /* The Elite Visuals */
        .scanline {
          position: absolute; inset: 0; pointer-events: none; z-index: 10;
          background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.15) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.03), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.03));
          background-size: 100% 4px, 3px 100%;
          box-shadow: inset 0 0 80px rgba(0,0,0,0.4); /* Vignette */
          border-radius: inherit;
        }
        .glow-border {
          box-shadow: 0 0 0 1px rgba(56,189,248,0.1) inset,
                      0 20px 50px rgba(0,0,0,0.8),
                      0 0 0 1px rgba(255,255,255,0.05);
        }
        
        .term-container {
          position: relative;
          background: #060608;
          border-radius: 12px;
          font-family: 'JetBrains Mono', 'Fira Code', monospace;
          font-size: 13px;
          line-height: 1.6;
          color: #c8d6e5;
          transition: height 0.3s cubic-bezier(0.16,1,0.3,1), border-radius 0.3s;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
      `}</style>

      <div
        className={`term-container ${isFullscreen ? "" : "glow-border"}`}
        style={{
          position: isFullscreen ? "fixed" : "relative",
          inset: isFullscreen ? 0 : "auto",
          zIndex: isFullscreen ? 9999 : 1,
          width: isFullscreen ? "100vw" : "100%",
          maxWidth: isFullscreen ? "none" : 800,
          height: computedHeight,
          borderRadius: isFullscreen ? 0 : 12,
        }}
        onClick={() => { if (phase === "interactive" && !isMinimized) inputRef.current?.focus(); }}
      >
        <div className="scanline" />

        {/* Mac-style Glass Header */}
        <div style={{
          display: "flex", alignItems: "center", padding: "0 16px",
          height: 48, flexShrink: 0,
          background: "linear-gradient(180deg, rgba(30, 30, 40, 0.6) 0%, rgba(20, 20, 25, 0.8) 100%)",
          backdropFilter: "blur(12px)",
          borderBottom: isMinimized ? "none" : "1px solid rgba(255,255,255,0.06)",
          position: "relative", zIndex: 20
        }}>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <button className="traffic-btn" onClick={(e) => { e.stopPropagation(); setIsMinimized(false); setIsFullscreen(false); setHistory([]); setInput(""); }} title="Reset" style={{ width:14, height:14, borderRadius:"50%", background:"#ff5f57", border:"1px solid #e0443e", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", padding:0 }}>
              <svg width="8" height="8" viewBox="0 0 8 8" style={{opacity:0.6}}><path d="M1 1l6 6M7 1L1 7" stroke="#4a0000" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </button>
            <button className="traffic-btn" onClick={(e) => { e.stopPropagation(); setIsFullscreen(false); setIsMinimized(m => !m); }} title={isMinimized ? "Restore" : "Minimize"} style={{ width:14, height:14, borderRadius:"50%", background:"#febc2e", border:"1px solid #d89f24", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", padding:0 }}>
              <svg width="8" height="2" viewBox="0 0 8 2" style={{opacity:0.6}}><path d="M0 1h8" stroke="#5a3a00" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </button>
            <button className="traffic-btn" onClick={(e) => { e.stopPropagation(); setIsMinimized(false); setIsFullscreen(f => !f); }} title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"} style={{ width:14, height:14, borderRadius:"50%", background:"#28c840", border:"1px solid #1fa42d", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", padding:0 }}>
              <svg width="8" height="8" viewBox="0 0 8 8" style={{opacity:0.6, transform:"rotate(45deg)"}}><path d="M5 1h2v2M1 5H3v2M7 1L4 4M1 7l3-3" stroke="#004a00" strokeWidth="1.2" strokeLinecap="round"/></svg>
            </button>
          </div>

          <span style={{
            position:"absolute", left:"50%", transform:"translateX(-50%)",
            fontSize:12, color:"rgba(255,255,255,0.4)", letterSpacing:"0.05em",
            fontWeight:600, userSelect:"none", whiteSpace:"nowrap",
            textShadow: "0 1px 2px rgba(0,0,0,0.5)"
          }}>
            {PROMPT} — zsh
          </span>

          <div style={{ marginLeft:"auto", display:"flex", gap:12, alignItems:"center" }}>
            <span style={{ fontSize:10, color: phase==="interactive" ? "#22c55e" : "#f97316", letterSpacing:"0.05em", fontWeight:"bold", textShadow: phase==="interactive" ? "0 0 8px rgba(34, 197, 94, 0.4)" : "0 0 8px rgba(249, 115, 22, 0.4)" }}>
              ● {phase==="boot" ? "BOOTING" : "READY"}
            </span>
          </div>
        </div>

        {!isMinimized && (
          <>
            <div ref={scrollRef} className="term-scroll" style={{ flex: 1, overflowY: "auto", padding: "20px 24px 16px", cursor: "text", position: "relative" }}>
              {Array.from({length: bootLine}, (_, i) => (
                <div key={`b${i}`}>{renderBootLine(i, false)}</div>
              ))}
              {phase === "boot" && bootLine < BOOT_SCRIPT.length && (
                <div key="btyping">{renderBootLine(bootLine, true)}</div>
              )}

              {phase === "interactive" && history.map((line, i) => renderLine(line, `h${i}`))}

              {/* Enhanced Interactive Prompt */}
              {phase === "interactive" && (
                <div style={{ display:"flex", alignItems:"center", marginTop:8, flexWrap: "wrap", gap: "0 8px" }}>
                  <span style={{ color:"#86efac", fontWeight:"bold" }}>{PROMPT}</span>
                  <span style={{ color:"#475569" }}>:</span>
                  <span style={{ color:"#fde68a", fontWeight:"bold" }}>{CWD}</span>
                  <span style={{ color:"#38bdf8", fontWeight:"bold" }}>❯</span>
                  <span style={{ color:"#e2e8f0" }}>{input}</span>
                  <span className="cursor-blink" />
                </div>
              )}
            </div>

            {/* Footer Status Bar */}
            <div style={{
              display:"flex", alignItems:"center", justifyContent:"space-between",
              padding:"8px 24px", flexShrink:0,
              background:"rgba(15, 15, 20, 0.8)",
              borderTop:"1px solid rgba(255,255,255,0.04)",
              position: "relative", zIndex: 20
            }}>
              <div style={{ display:"flex", gap:20 }}>
                <span style={{ fontSize:10, color:"#64748b", fontFamily:"inherit", letterSpacing:"0.5px" }}>
                  <span style={{color:"#94a3b8", fontWeight:"bold"}}>zsh</span> · utf-8 · LF
                </span>
                <span style={{ fontSize:10, color:"#475569", letterSpacing:"0.5px" }}>
                  {phase === "interactive" ? `${history.length} operations logged` : "executing init seq..."}
                </span>
              </div>
              <div style={{ display:"flex", gap:20 }}>
                <span style={{ fontSize:10, color:"#475569", letterSpacing:"0.5px" }}>
                  {isFullscreen ? "⛶ fullscreen mode" : "⊡ fixed bounds"}
                </span>
                <span style={{ fontSize:10, color: phase==="interactive" ? "#22c55e" : "#f97316", opacity: 0.6, fontWeight:"bold", letterSpacing:"0.5px" }}>
                  {phase === "interactive" ? "✓ SYS.ONLINE" : "⟳ SYS.INIT"}
                </span>
              </div>
            </div>
          </>
        )}

        {phase === "interactive" && !isMinimized && (
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            className="term-input-hidden"
          />
        )}
      </div>
    </>
  );
}