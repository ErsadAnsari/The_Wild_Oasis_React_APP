import { useEffect, useRef } from "react";

export function useOutsideClick(handler,listenCapturing=true)
{
  console.log("test123")
    const ref=useRef();
    useEffect(function(){
    function handleClick(e){
      if(ref.current&&!ref.current.contains(e.target))
      {
        console.log("test0001", ref.current.contains(e.target));
        handler();
      }
    }
    document.addEventListener("click", handleClick, listenCapturing);
    return () =>
      document.removeEventListener("click", handleClick, listenCapturing);
  },[handler,listenCapturing])
  return ref;
}