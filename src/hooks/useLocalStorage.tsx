import { useEffect, useState } from "react";

export default function useLocalStorage(key: string) {
  const setItem = (value: unknown) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.log(e);
    }
  };

  const getItem = ()=> {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : undefined;
    }
    catch(error){
        console.log(error)
    }
  }

  return {setItem, getItem}
}
