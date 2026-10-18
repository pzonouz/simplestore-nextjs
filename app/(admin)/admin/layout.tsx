import MobileMenu from "@/app/components/ui/MobileMenu";
import {MenuItem} from "@/app/lib/types/menu";
import React from "react";
import {cookies} from "next/headers";

const layout = async ({children}: { children: React.ReactNode }) => {
    const menuItems: MenuItem[] = [
        {title: "خانه", href: "/admin"},
        {
            title: "دسته بندی ها",
            href: "/admin/categories",
        },
        {
            title: "محصولات",
            href: "/admin/products",
        },
        {title: "خدمات", href: "admin/services"},
    ];
    const cookieStore = await cookies()
    const access = cookieStore.get("access")?.value
    const userRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/me/`, {
        headers: {
            Cookie: `access=${access}`
        }
    })
    const user = await userRes.json()
    return (
        <div>
            <MobileMenu menuItems={menuItems} user={user}/>
            <div className="mt-4">{children}</div>
        </div>
    );
};

export default layout;
