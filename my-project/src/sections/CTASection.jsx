/* eslint-disable no-unused-vars */
import { motion } from "motion/react";

export default function CTASection() {
    return (
        <motion.div className="max-w-5xl py-16 mt-40 md:pl-20 md:w-full max-md:mx-4 md:mx-auto flex flex-col md:flex-row max-md:gap-6 items-center justify-between text-left bg-gradient-to-b from-pink-900 to-pink-950 rounded-2xl p-6 text-white"
            initial={{ y: 150, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 320, damping: 70, mass: 1 }}
        >
            <div>
                <motion.h1 className="text-4xl md:text-[46px] md:leading-[60px] font-semibold bg-gradient-to-r from-white to-pink-400 text-transparent bg-clip-text"
                    initial={{ y: 80, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 280, damping: 70, mass: 1 }}
                >
                    Ready to take control of your energy?
                </motion.h1>
                <motion.p className="bg-gradient-to-r from-white to-pink-400 text-transparent bg-clip-text text-lg"
                    initial={{ y: 80, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 200, damping: 70, mass: 1 }}
                >
                    Voltix helps you track, analyze, and save energy — start your smarter journey today.
                </motion.p>
            </div>
            <motion.button className="px-12 py-3 text-slate-800 bg-white hover:bg-slate-200 rounded-full text-sm mt-4"
                initial={{ y: 80, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 280, damping: 70, mass: 1 }}
            >
                Start
            </motion.button>
        </motion.div>
    );
}
