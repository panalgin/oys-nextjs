import { cn } from "../../utils";

export default function Skeleton({ className }: { className: string }) {
	return <div className={cn('animate-pulse rounded-md bg-muted', className)} />;
}