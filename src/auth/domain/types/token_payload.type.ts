export interface TokenPayloadType {
  _id: string;
  sub: string;
  exp: number;
  companies?: {
    _id: string;
    name: string;
    active?: boolean;
  }[];
}
