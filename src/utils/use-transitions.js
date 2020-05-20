import { useState } from "react";
import { TimelineMax } from "gsap";

export function useEnter(callback) {
  const [enterTween, setEnterTween] = useState(null);
}

export function useExit(callback) {
  const [exitTween, setExitTween] = useState(null);
}
