import axios from "axios";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateObjectId() {
  const timestamp = ((new Date().getTime() / 1000) | 0).toString(16);
  return (
    timestamp +
    "xxxxxxxxxxxxxxxx"
      .replace(/[x]/g, function () {
        return ((Math.random() * 16) | 0).toString(16);
      })
      .toLowerCase()
  );
}

export async function isAuthenticated() {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/authenticated`,
      {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        }
      }
    );
    return response.status === 200;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export function setCookie(name: string, val: string) {
  const date = new Date();
  const value = val;

  // Set it expire in 1 hour
  date.setTime(date.getTime() + (1 * 60 * 60 * 1000));

  // Set it
  document.cookie = name+"="+value+"; expires="+date.toUTCString()+"; path=/";
}

export function getCookie(name: string) {
  const value = "; " + document.cookie;
  const parts = value.split("; " + name + "=");
  
  if (parts.length == 2) {
      return parts.pop()?.split(";").shift();
  }
}

export function deleteCookie(name: string) {
  const date = new Date();

  // Set it expire in -1 days
  date.setTime(date.getTime() + (-1 * 24 * 60 * 60 * 1000));

  // Set it
  document.cookie = name+"=; expires="+date.toUTCString()+"; path=/";
}

