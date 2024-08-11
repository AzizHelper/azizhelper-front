import SignInForm from "@/app/components/forms/SignInForm";
export default function Login() {
  return (
    // <div className="flex flex-col items-center gap-5 justify-center h-[70vh] w-full">
    <div className="flex items-center justify-center min-h-80 px-4">
      <div className="w-full min-w-[700px]">
        <SignInForm />
      </div>
    </div>
  );
}
