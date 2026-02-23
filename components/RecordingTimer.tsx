import React from "react";
import { useRecordingTimer } from "../hooks/useRecordingTimer";
import { formatTime } from "../utils/formatTime";
import { useCall } from "@stream-io/video-react-sdk";

export const RecordingTimer = () => {
    const seconds = useRecordingTimer();
    const call = useCall();

    if (!call?.state.recording) return null;

    return (
        <div className="pointer-events-none absolute top-4 left-4 z-50">
            <div className="flex items-center gap-2 rounded-full 
                      bg-black/70 backdrop-blur-md 
                      text-white text-sm font-medium
                      px-3 py-1.5 shadow-lg ring-1 ring-white/10">

                {/* Pulsing recording dot */}
                <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600"></span>
                </span>

                <span className="tracking-wide">
                    REC {formatTime(seconds)}
                </span>
            </div>
        </div>
    );
};