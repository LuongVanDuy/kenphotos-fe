import { Card, Skeleton } from "antd";
import { motion } from "framer-motion";

const ServiceCardLoading = () => {
  return (
    <motion.div
      key={Math.random()}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.8,
        ease: "easeOut",
      }}
    >
      <Card className="p-0 overflow-hidden rounded-[12px] !bg-gradient-to-b !bg-blue-50 flex flex-col h-full">
        <div className="relative h-80 card-image">
          <Skeleton.Image active style={{ width: "100%", height: "100%" }} />
        </div>

        <div className="p-6 flex flex-col flex-1 justify-between text-start bg-blue-50">
          <h3 className="text-[22px] leading-[30px] mb-4 font-bold text-[#161817] md:text-[24px] md:leading-[24px]">
            <Skeleton active title={false} paragraph={{ rows: 1, width: "60%" }} />
          </h3>

          <Skeleton active title={false} paragraph={{ rows: 3 }} className="mb-4" />

          <Skeleton active title={false} paragraph={{ rows: 1, width: "100%" }} />
        </div>
      </Card>
    </motion.div>
  );
};

export default ServiceCardLoading;
