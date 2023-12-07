import {
    EffectCallback,
    useEffect,
    useRef
} from "react";

export default function useEffectHook(_effect: React.EffectCallback) {
    const effect = useRef<React.EffectCallback>(_effect);
    const destroy = useRef<EffectCallback>();
    const effectCalled = useRef<boolean>(false);
    const rendered = useRef<boolean>(false);

    if (effectCalled.current) {
        rendered.current = true;
    }

    useEffect(() => {
        if (!effectCalled.current) {
            destroy.current = effect.current() as EffectCallback;
            effectCalled.current = true;
        }
        return () => {
            if (rendered.current === false) return;
            if (destroy.current) destroy.current();
        }
    }, [])
}