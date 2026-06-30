import { Updater } from './updater.type';

export interface BaseResponse {
  id: string;
  version: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  updater: Updater;
}
