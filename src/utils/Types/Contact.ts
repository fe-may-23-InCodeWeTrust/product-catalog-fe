import { Product } from "./Product";

export type Contact = {
  id: number;
  fullName: string;
  linkedIn: string;
  gitHub: string;
  email: string;
};

export type User = {
  "id": string
  "email": string
  "password": string,
  "fullName": string,
  "favorites": Product[]
}