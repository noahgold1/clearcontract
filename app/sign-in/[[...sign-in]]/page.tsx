import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 px-5 py-12">
      <SignIn />
    </div>
  );
}
