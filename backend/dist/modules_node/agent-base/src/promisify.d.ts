import { ClientRequest, RequestOptions, AgentCallbackCallback, AgentCallbackPromise } from './index';
type LegacyCallback = (req: ClientRequest, opts: RequestOptions, fn: AgentCallbackCallback) => void;
export default function promisify(fn: LegacyCallback): AgentCallbackPromise;
export {};
