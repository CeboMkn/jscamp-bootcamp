import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAppliedStore = create(
    persist(
        (set, get) => ({
            appliedJobs: [],

            addAppliedJob: (jobId) => {
                set((state) => ({
                    appliedJobs: state.appliedJobs.includes(jobId)
                        ? state.appliedJobs
                        : [...state.appliedJobs, jobId],
                }));
            },

            removeAppliedJob: (jobId) => {
                set((state) => ({
                    appliedJobs: state.appliedJobs.filter((id) => id !== jobId),
                }));
            },

            isApplied: (jobId) => get().appliedJobs.includes(jobId),

            toggleApplied: (jobId) => {
                const { addAppliedJob, removeAppliedJob, isApplied } = get();
                const isApp = isApplied(jobId);
                isApp ? removeAppliedJob(jobId) : addAppliedJob(jobId);
            },

            countApplied: () => get().appliedJobs.length,
        }),
        { name: "applied-jobs" }
    )
);
