"use client";

import MainTitle from "../Common/Title/MainTitle";
import { StarOutlined, AimOutlined, TeamOutlined, TrophyOutlined } from "@ant-design/icons";

const data = [
  {
    title: "Faith",
    icon: StarOutlined,
    content: `We believe happiness comes from daily growth. Growth should benefit not only ourselves but also family, friends, colleagues, community, and customers.`,
  },
  {
    title: "Mission",
    icon: AimOutlined,
    content: `True Color creates a workplace where everyone feels proud of who they are and what they do, while delivering lasting value to customers and the community.`,
  },
  {
    title: "Business philosophy",
    icon: TeamOutlined,
    content: `Our development is built on the trust of customers and partners. This trust drives us to improve, adapt, and learn each day to bring greater value to all.`,
  },
  {
    title: "High quality standards",
    icon: TrophyOutlined,
    content: `Quality is our highest priority. True Color’s photos meet strict standards, pleasing even demanding clients, including those who have trusted us for years.`,
  },
];

const OurMission: React.FC = () => {
  return (
    <section className="relative py-10 md:pt-[70px] md:pb-[120px] bg-[rgba(220,237,248,0.6)]">
      <div className="max-w-content mx-auto px-4">
        <MainTitle
          title={
            <>
              Our Mission & Values
              <br />
              <span className="inline-block bg-gradient-to-r from-[#2D6DFF] to-[#3BE5FF] bg-clip-text text-transparent -webkit-background-clip-text -webkit-text-fill-transparent">
                Committed to Excellence in Pixels
              </span>
            </>
          }
          content="True Color has built a global reputation for delivering exceptional, on-time results. Clients praise our detail, clear communication, and ability to turn ordinary images into stunning, market-ready visuals."
        />

        <ul className="md:flex mt-16">
          {data.map((item, index) => {
            const Icon = item.icon;
            return (
              <li key={index} className="md:flex-col flex-1 justify-between flex gap-10">
                <div className="md:flex-row flex flex-col items-center gap-[12px] md:gap-[10px]">
                  <div className="h-3 w-3 md:mx-[4px]">
                    <svg fill="none" height="24" viewBox="0 0 24 24" width="24">
                      <rect height="23" rx="11.5" stroke="#2D6DFF" width="23" x="0.5" y="0.500488"></rect>
                      <circle cx="12" cy="12.0005" fill="#2D6DFF" r="6"></circle>
                    </svg>
                  </div>
                  {index !== data.length - 1 && <div className="md:h-[1px] md:w-full h-full w-[1px] ml-[10px] md:ml-0 md:mt-3 bg-[#2D6DFF]"></div>}
                </div>

                <div
                  className={`flex-1 p-6 rounded-xl ${index !== data.length - 1 ? "md:mr-[24px]" : ""}`}
                  style={{
                    backdropFilter: "blur(8px)",
                    backgroundColor: "#fffc",
                  }}
                >
                  <div className="w-[50px] h-[50px] bg-[rgba(220,237,248,0.6)] flex items-center justify-center rounded-md mb-4">
                    <Icon style={{ fontSize: 24, color: "#2D6DFF" }} />
                  </div>
                  <h3 className="text-[22px] leading-[30px] mb-4 font-semibold text-[#161817] md:text-[24px] md:leading-[24px]">{item.title}</h3>
                  <p className="text-black text-[16px]">{item.content}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default OurMission;
