import { createMetadata } from "@/utils/metadata";
import { Result, Button } from "antd";

export async function generateMetadata() {
  return createMetadata({
    title: "Page Not Found",
  });
}

export default function NotFound() {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-100">
      <Result
        status="404"
        title={<span className="text-9xl md:text-[15rem] font-bold">404</span>}
        subTitle={<span className="text-xl md:text-3xl">Sorry, the page you visited does not exist.</span>}
        extra={
          <Button href="/" type="primary" size="large">
            Back Home
          </Button>
        }
        className="w-full max-w-full"
      />
    </div>
  );
}
