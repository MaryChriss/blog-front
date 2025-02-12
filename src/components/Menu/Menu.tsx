"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { BiLogOut } from 'react-icons/bi';
import { FaRegEdit } from 'react-icons/fa';
import { IoMenu } from 'react-icons/io5';
import { MdOutlinePostAdd } from 'react-icons/md';

export const SideMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen((prev) => !prev);

    return (
        <div className="relative z-50">
            <button
                onClick={toggleMenu}
                className="text-3xl p-3 m-4 text-white bg-orange-500 rounded-full shadow-lg hover:bg-orange-600 focus:outline-none z-[100]
                xs:p-1 xs:text-2xl
                xmd:p-1 xmd:text-2xl 
                xlg:p-2
                sm:p-2
                md:p-2
                lg:p-3 
                xl:p-3 
                2xl:p-3
                "
            >
                <IoMenu />
            </button>

            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-30 z-40"
                    onClick={() => setIsOpen(false)}
                ></div>
            )}

            <div
                className={`fixed top-0 right-0 h-full bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-xl transition-all duration-300 ease-in-out 
                ${isOpen ? "w-64" : "w-0 overflow-hidden"} z-50`}
            >
                <div className="p-6 flex flex-col h-full">
                    <h2 className="text-2xl font-bold mb-6">Menu</h2>
                    <ul className="space-y-6">
                        <li>
                            <Link
                                href="/"
                                onClick={() => setIsOpen(false)} 
                                className="flex items-center text-lg font-medium hover:bg-white hover:text-orange-600 rounded-lg px-4 py-3 transition duration-200"
                            >
                                <MdOutlinePostAdd size={25} className="mr-3" />
                                Novo Post
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/gerenciar-posts"
                                onClick={() => setIsOpen(false)} 
                                className="flex items-center text-lg font-medium hover:bg-white hover:text-orange-600 rounded-lg px-4 py-3 transition duration-200"
                            >
                                <FaRegEdit size={25} className="mr-3" />
                                Gerenciar Posts
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
