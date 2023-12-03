'use client';
import { useState } from 'react';

export const LoadingProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect();
    return (
        <div>LoadingProvider</div>
    );
};
