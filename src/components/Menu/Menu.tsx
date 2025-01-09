"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { BiLogOut } from 'react-icons/bi';
import { FaRegEdit, FaUser, FaUserEdit } from 'react-icons/fa';
import { IoMenu } from 'react-icons/io5';
import { MdOutlinePostAdd } from 'react-icons/md';

export const SideMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== "undefined") {
            const loginData = localStorage.getItem("loginData");
            setIsLoggedIn(!!loginData);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("loginData");
        setIsLoggedIn(false);
        router.push("/");
    };

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <div className="flex justify-end items-center h-screen z-50 ">
            <button
                onClick={toggleMenu}
                className="text-2xl p-2 m-4 text-black z-50">
                <IoMenu />
            </button>

            <div
                className={`fixed top-0 right-0 h-full bg-white text-white border-slate-300 border transition-all duration-300 ease-in-out
                ${isOpen ? 'w-64' : 'w-0 overflow-hidden'}`}
            >
                <div className="p-4 flex flex-col h-full">
                    <h2 className="text-2xl text-black font-semibold mb-6 font-raleway">Menu</h2>
                    <ul className="space-y-4 flex-grow">
                        <li>
                            <Link href="/" className="block px-2 py-1 rounded-full font-itim text-black hover:bg-orange-100">
                                <MdOutlinePostAdd  size={30} className="inline-block mr-2 text-orange-600" /> Novo Post
                            </Link>
                        </li>

                        <li>
                            <Link href="/gerenciar-posts" className="block px-2 py-1 rounded-full font-itim text-black hover:bg-orange-100">
                            <FaRegEdit size={25} className="inline-block mr-2 text-orange-600" /> Gerenciar Posts
                            </Link>
                        </li>

                    </ul>

                </div>
            </div>
        </div>
    );
};
