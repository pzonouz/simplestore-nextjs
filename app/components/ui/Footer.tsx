import { MapPinIcon, Phone, Smartphone } from "lucide-react";

export const Footer = () => {
  return (
    <div className=" w-screen bg-sky-950 flex flex-col gap-4 text-white mx-8 p-8">
      <div className="flex gap-2">
        <div className="flex gap-2 w-48">
          <MapPinIcon />
          <div>آدرس:</div>
        </div>
        <div>اردبیل مرکز رشد اتاق ۱۲</div>
      </div>
      <div className="flex gap-4">
        <div className="flex gap-2 w-48">
          <Phone />
          <div>شماره تماس:</div>
        </div>
        <div>۰۴۵۳۳۳۳۳</div>
      </div>
      <div className="flex gap-4">
        <div className="flex gap-2 w-48">
          <Smartphone />
          <div> پیام رسانهای ایرانی:</div>
        </div>
        <div>۰۹۰۴۰۴۲۷۱۵۳</div>
      </div>
    </div>
  );
};
