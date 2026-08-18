// ponytail: persistent JSONL diagnostic log. One appendFileSync, no abstractions.
// Set AX_DIAGNOSTICS=0 to silence.
import { appendFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { homedir } from "node:os";

const LOG_PATH = join(homedir(), ".agents", "experience", "diagnostics.log");
let _dir = false;

export function diagLog(component: string, event: string, message: string, data?: Record<string, unknown>): void {
	if (process.env.AX_DIAGNOSTICS === "0") return;
	try {
		if (!_dir) { mkdirSync(dirname(LOG_PATH), { recursive: true }); _dir = true; }
		appendFileSync(LOG_PATH, JSON.stringify({ ts: new Date().toISOString(), component, event, message, ...data }) + "\n");
	} catch { /* best-effort */ }
}

export function getDiagnosticsLogPath(): string { return LOG_PATH; }