import { JsonResponse } from "./appInterfaces";

export type ResponseReadFile = {
  status: "OK";
  content: JsonResponse;
} | {
  status: "FILE_NOT_FOUND";
  message: string;
}
