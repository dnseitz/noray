import * as nanoid from "nanoid";
import { config } from "../config.ts";
import { generateWordId } from "../utils.ts";

const generateOID = config.wordsOid.enabled
  ? () => generateWordId(config.wordsOid.length)
  : nanoid.customAlphabet(config.oid.charset, config.oid.length);
const generatePID = nanoid.customAlphabet(
  config.pid.charset,
  config.pid.length,
);

/**
 * Host entity.
 *
 * Hosts register in advance for other players to connect to them.
 */
export interface HostEntity {
  /**
   * Open id.
   */
  oid: string;

  /**
   * Private id.
   */
  pid: string;

  /**
   * Socket.
   */
  socket: Bun.Socket;

  /**
   * Relay port.
   */
  relay: number | undefined;

  /**
   * Host's address open for UDP.
   *
   * This is the public address where the host receives UDP traffic.
   */
  remoteAddress: string | undefined;

  /**
   * Host's port open for UDP.
   *
   * This is the public port where the host receives UDP traffic.
   */
  remotePort: number | undefined;

  /**
   * Host's local address open for UDP.
   * 
   * This is the address in their internal LAN where the host receives UDP traffic.
   * 
   * For certain network topologies, a client and server on the same LAN trying to
   * connect by exchanging address information through noray can fail to connect
   * directly because their router remaps the source address to their local address,
   * causing the ENet connection handshake to fail.
   */
  localRemoteAddress: string | undefined;

  /**
   * Host's local port open for UDP.
   * 
   * This is the port in their internal LAN where the host receives UDP traffic.
   * 
   * For certain network topologies, a client and server on the same LAN trying to
   * connect by exchanging address information through noray can fail to connect
   * directly because their router remaps the source address to their local address,
   * causing the ENet connection handshake to fail.
   */
  localRemotePort: number | undefined;
}

export function makeHost(socket: Bun.Socket): HostEntity {
  return {
    socket,
    oid: generateOID(),
    pid: generatePID(),

    relay: undefined,
    remoteAddress: undefined,
    remotePort: undefined,
    localRemoteAddress: undefined,
    localRemotePort: undefined
  };
}
