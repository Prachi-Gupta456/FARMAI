"use client"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime)

export default function TimeAgo({ createdAt }) {
    return <span>{dayjs(createdAt).fromNow()}</span>;
}