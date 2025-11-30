import React from "react";
import { motion } from "framer-motion";

const Client = () => {
  const gameHistory = [
    { game: "لعبة 1", result: "ربح", amount: 50 },
    { game: "لعبة 2", result: "خسارة", amount: -20 },
    { game: "لعبة 3", result: "ربح", amount: 30 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-8 bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen"
    >
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-extrabold mb-10 text-center text-gray-800"
      >
        Client 
      </motion.h1>

      {/* ===== Profile Card ===== */}
      <motion.div
        whileHover={{ scale: 1.05, boxShadow: "0px 10px 25px rgba(0,0,0,0.15)" }}
        className="bg-gradient-to-r from-indigo-500 to-indigo-400 p-6 rounded-2xl shadow-lg max-w-md mx-auto mb-10 text-white transition-transform duration-300"
      >
        <h2 className="text-2xl font-bold mb-4">الملف الشخصي</h2>
        <div className="space-y-3">
          <p className="cursor-pointer hover:underline transition">{`اسم المستخدم: client1`}</p>
          <p className="cursor-pointer hover:underline transition">{`الرصيد الحالي: 200 دينار`}</p>
        </div>
      </motion.div>

      {/* ===== Game History Table ===== */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="bg-white p-6 rounded-2xl shadow-lg overflow-x-auto"
      >
        <h2 className="text-2xl font-bold mb-6 text-indigo-600">تاريخ الألعاب</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-indigo-100 text-indigo-800">
              <th className="p-3 text-left">اللعبة</th>
              <th className="p-3 text-center">النتيجة</th>
              <th className="p-3 text-center">المبلغ</th>
            </tr>
          </thead>
          <tbody>
            {gameHistory.map((game, idx) => (
              <motion.tr
                key={idx}
                whileHover={{ scale: 1.02, backgroundColor: "#e0f2ff" }}
                transition={{ duration: 0.2 }}
                className={`border-b ${idx % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
              >
                <td className="p-3 font-medium">{game.game}</td>
                <td className="p-3 font-semibold text-center">
                  <span className={game.result === "ربح" ? "text-green-600" : "text-red-600"}>
                    {game.result}
                  </span>
                </td>
                <td className={`p-3 font-semibold text-center ${game.amount > 0 ? "text-green-600" : "text-red-600"}`}>
                  {game.amount > 0 ? `+${game.amount}` : game.amount} دينار
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </motion.div>
  );
};

export default Client;
