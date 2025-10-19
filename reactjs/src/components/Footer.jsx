/* eslint-disable no-unused-vars */
import { footerData } from "../data/footer";
import { LinkedinIcon, TwitterIcon, YoutubeIcon } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="flex flex-wrap justify-between overflow-hidden gap-10 md:gap-20 mt-40 py-6 px-6 md:px-16 lg:px-24 xl:px-32 text-[13px] text-gray-500">
            <motion.div className="flex flex-wrap items-start gap-10 md:gap-35"
                initial={{ x: -150, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 280, damping: 70, mass: 1 }}
            >
                <img className="size-8 aspect-square" src="/assets/footer-logo.svg" alt="Voltix logo" />
                {footerData.map((section, index) => (
                    <div key={index}>
                        <p className="text-slate-100 font-semibold">{section.title}</p>
                        <ul className="mt-2 space-y-2">
                            {section.links.map((link, index) => (
                                <li key={index}>
                                    <Link href={link.href} className="hover:text-pink-600 transition">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </motion.div>
            <motion.div className="flex flex-col max-md:items-center max-md:text-center gap-2 items-end"
                initial={{ x: 150, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 280, damping: 70, mass: 1 }}
            >
                <p className="max-w-60">
                    Empowering you to track, manage, and save energy—one unit at a time.
                </p>
                <div className="flex items-center gap-4 mt-3">
                    <a href="https://linkedin.com/company/voltix" target="_blank" rel="noreferrer">
                        <LinkedinIcon className="size-5 hover:text-pink-500" />
                    </a>
                    <a href="https://x.com/voltix" target="_blank" rel="noreferrer">
                        <TwitterIcon className="size-5 hover:text-pink-500" />
                    </a>
                    <a href="https://www.youtube.com/@voltix" target="_blank" rel="noreferrer">
                        <YoutubeIcon className="size-6 hover:text-pink-500" />
                    </a>
                </div>
                <p className="mt-3 text-center">
                    &copy; {new Date().getFullYear()} <a href="https://voltix.com">Voltix</a>. All rights reserved.
                </p>
            </motion.div>
        </footer>
    );
}
