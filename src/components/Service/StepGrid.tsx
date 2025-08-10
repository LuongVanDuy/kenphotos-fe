// components/ServicesGrid.jsx
import React from "react";

import {
  EnvironmentOutlined,
  CameraOutlined,
  BgColorsOutlined,
  DesktopOutlined,
  CloudOutlined,
  FireOutlined,
  BulbOutlined,
  ToolOutlined,
  ColumnHeightOutlined,
  BgColorsOutlined as WhiteBalanceIcon,
  HomeOutlined,
  DeleteOutlined,
  HighlightOutlined,
  ThunderboltOutlined,
  BorderOutlined,
  EyeOutlined,
  ZoomInOutlined,
  SunOutlined,
  MedicineBoxOutlined,
  EyeInvisibleOutlined,
  FileTextOutlined,
  RocketOutlined,
  MinusSquareOutlined,
} from "@ant-design/icons";
import MainTitle from "../UI/Title/MainTitle";

const servicesStep = [
  {
    icon: <EnvironmentOutlined />,
    label: "Ocean/River Water Enhancement",
    content: "Enhance the color and vibrancy of river or ocean water to ensure a natural and eye-catching look.",
  },
  {
    icon: <CameraOutlined />,
    label: "Remove Photographer’s Reflection",
    content: "Remove reflections of the photographer in mirrors or reflective surfaces.",
  },
  {
    icon: <BgColorsOutlined />,
    label: "Lawn Enhancement",
    content: "Improve the appearance of grass by removing stains or dry patches.",
  },
  {
    icon: <DesktopOutlined />,
    label: "TV Screen Replacement",
    content: "Edit the content displayed on TV screens to meet your requirements.",
  },
  {
    icon: <CloudOutlined />,
    label: "Sky Replacement",
    content: "Replace or enhance the sky in photos for a more beautiful and natural look.",
  },
  {
    icon: <FireOutlined />,
    label: "Add Fire to Fireplaces",
    content: "Add flames to fireplaces for a warm and lively feel.",
  },
  {
    icon: <BulbOutlined />,
    label: "Turn On Lights",
    content: "Turn on light sources in the image to create a brighter environment.",
  },
  {
    icon: <ToolOutlined />,
    label: "Fixing Burn Out Lightbulbs",
    content: "Replace broken light bulbs in photos with working, natural-looking ones.",
  },
  {
    icon: <ColumnHeightOutlined />,
    label: "Vertical & Horizontal Straightening",
    content: "Align vertical and horizontal lines for a more balanced image.",
  },
  {
    icon: <WhiteBalanceIcon />,
    label: "White Balancing",
    content: "Adjust white balance for more natural and accurate colors.",
  },
  {
    icon: <HomeOutlined />,
    label: "Remove Pool Cleaners from Water",
    content: "Remove pool cleaning equipment for a clean and inviting pool.",
  },
  {
    icon: <DeleteOutlined />,
    label: "Dust Spot Removal",
    content: "Remove dust spots and small particles for a cleaner image.",
  },
  {
    icon: <HighlightOutlined />,
    label: "Tone Adjustment",
    content: "Modify brightness, contrast, and color balance for desired visual effects.",
  },
  {
    icon: <ThunderboltOutlined />,
    label: "Flash Reflection Removal",
    content: "Remove distracting flash reflections from shiny surfaces.",
  },
  {
    icon: <BorderOutlined />,
    label: "Lens Distortion Removal",
    content: "Correct lens distortions so straight lines appear straight.",
  },
  {
    icon: <EyeOutlined />,
    label: "Window Mask",
    content: "Create clear and attractive window views in photos.",
  },
  {
    icon: <ZoomInOutlined />,
    label: "Image Sharpening",
    content: "Enhance image sharpness for clearer details.",
  },
  {
    icon: <SunOutlined />,
    label: "Brightness & Contrast Adjustment",
    content: "Adjust brightness and contrast for a balanced image.",
  },
  {
    icon: <MedicineBoxOutlined />,
    label: "Remove Minor Blemishes",
    content: "Remove small imperfections such as spots or marks.",
  },
  {
    icon: <EyeInvisibleOutlined />,
    label: "Remove Sun Flare",
    content: "Reduce or remove unwanted sun glare from photos.",
  },
  {
    icon: <FileTextOutlined />,
    label: "Blurring License Plates",
    content: "Blur license plates to protect privacy.",
  },
  {
    icon: <DeleteOutlined />,
    label: "Delete Sticky Note",
    content: "Remove sticky notes or small unwanted objects from images.",
  },
  {
    icon: <RocketOutlined />,
    label: "Drone / Aerial Photos",
    content: "Enhance and adjust the colors of drone photography.",
  },
  {
    icon: <MinusSquareOutlined />,
    label: "Fill TV Black/Gradient",
    content: "Fill TV screens with black or gradient effects for better focus.",
  },
];

const StepGrid: React.FC = () => {
  return (
    <section className="bg-white relative py-10 md:pt-[70px] md:pb-[120px]">
      <div className="max-w-content mx-auto px-4">
        <MainTitle
          title={
            <>
              You'll Get <span className="inline-block bg-gradient-to-r from-[#2D6DFF] to-[#3BE5FF] bg-clip-text text-transparent">24 Steps</span> of
              Manual Editing
            </>
          }
          content="All your photos perfected in 24 detailed steps — for just US$0.99."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {servicesStep.map((service, index) => (
            <div key={index} className="flex items-start gap-4 p-5 rounded-xl bg-blue-50">
              <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-lg bg-[#fff] text-2xl text-blue-600">
                {service.icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">{service.label}</h3>
                <p className="text-gray-600 text-sm">{service.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StepGrid;
