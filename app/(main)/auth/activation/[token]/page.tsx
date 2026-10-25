import { translateError } from "@/app/lib/utils/translate";
import Link from "next/link";

const page = async ({
  params,
}: {
  params: Promise<{ uid: string; token: string }>;
}) => {
  let success = true;
  const { uid, token } = await params;
  const activationRes = await fetch(
    `${process.env.BACKEND_URL}/auth/activation`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: token }),
    },
  );
  if (!activationRes.ok) {
    success = false;
  }
  return (
    <div className="h-[50vh] w-full">
      {success ? (
        <div className="flex flex-col gap-4 items-center w-full">
          <div>فعال سازی با موفقیت انجام شد</div>
          <Link href={"/auth/login"} className="text-primary">
            صفحه ورود
          </Link>
        </div>
      ) : (
        <div>زمان استفاده از لینک فعالسازی سپری شده است</div>
      )}
    </div>
  );
};

export default page;
