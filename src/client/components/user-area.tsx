import { User } from "@/common/user";
import { AlertCircle } from "lucide-react";
import React from "react";
import AccountPanel from "./account-panel";
import { GoogleSignInButton } from "./google-sign-in-button";
import { Alert, AlertDescription } from "./ui/alert";
import Skeleton from "./ui/skeleton";

const UserArea = React.memo(({ user, isLoading, isFetched, handleSignOut }: { user: User | null, isLoading: boolean, isFetched: boolean, handleSignOut: () => void }) => {
	if (user) {
		console.log("User:", user);
		return <AccountPanel key={user.uid} onSignOut={handleSignOut} user={user} />;
	}

	if (isLoading || !isFetched) {
		console.log("IsLoading:", isLoading);
		console.log("IsFetched:", isFetched);
		return <Skeleton className="h-16 w-full" />;
	}

	return (
		<>
			<GoogleSignInButton />
			<Alert
				variant="default"
				className="my-4 flex flex-row justify-center items-center"
			>
				<AlertCircle />
				<AlertDescription>
					Lütfen görev seçmek için giriş yapın.
				</AlertDescription>
			</Alert>
		</>
	);
});

UserArea.displayName = 'UserArea';

export default UserArea;