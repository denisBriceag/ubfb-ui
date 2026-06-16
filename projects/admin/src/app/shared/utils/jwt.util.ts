import { decodeJwt, JWTPayload } from 'jose';

export function jwtDecode<T extends JWTPayload>(token: string): T | null {
  try {
    return decodeJwt<T>(token);
  } catch {
    return null;
  }
}
