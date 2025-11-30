import React, { useState } from "react";
import { motion } from "framer-motion";

const COLORS = {
  blue: "border-blue-500 bg-blue-100 text-blue-600",
  green: "border-green-500 bg-green-100 text-green-600",
  red: "border-red-500 bg-red-100 text-red-600",
  purple: "border-purple-500 bg-purple-100 text-purple-600",
  orange: "border-orange-500 bg-orange-100 text-orange-600"
};

const SuperAdmin = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("createAccount");

  const [users, setUsers] = useState([
    { id: 1, name: "admin1", password: "pass123", role: "admin", balance: 1000, createdAt: "2024-01-15" },
    { id: 2, name: "subadmin1", password: "pass456", role: "subadmin", balance: 500, createdAt: "2024-01-14" },
    { id: 3, name: "client1", password: "pass789", role: "client", balance: 200, createdAt: "2024-01-13" }
  ]);

  const stats = {
    totalUsers: users.length,
    totalBalance: users.reduce((s, u) => s + u.balance, 0),
    admins: users.filter(u => u.role === "admin").length,
    clients: users.filter(u => u.role === "client").length
  };

  const addAccount = (data) => {
    const newUser = {
      id: Date.now(),
      name: data.username,
      password: data.password,
      role: data.role,
      balance: Number(data.initialBalance || 0),
      createdAt: new Date().toISOString().split("T")[0]
    };
    setUsers([...users, newUser]);
  };

  const addBalance = ({ userId, amount }) => {
    setUsers(users.map(u =>
      u.id === Number(userId)
        ? { ...u, balance: u.balance + Number(amount) }
        : u
    ));
  };

  const deleteUser = (id) => {
    if (!window.confirm("هل أنت متأكد من الحذف؟")) return;
    setUsers(users.filter(u => u.id !== id));
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setSidebarOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* ===== Sidebar ===== */}
      <div className={`fixed md:static top-0 left-0 h-full w-64 bg-gray-900 text-white p-5 transform
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        transition-transform duration-300 z-50`}>

        <h2 className="text-2xl font-bold mb-8">Super Admin</h2>

        <ul className="space-y-4">
          <li onClick={() => handleTabClick("createAccount")} className="hover:bg-gray-700 p-2 rounded cursor-pointer">➕ إنشاء حساب</li>
          <li onClick={() => handleTabClick("addBalance")} className="hover:bg-gray-700 p-2 rounded cursor-pointer">💰 إضافة رصيد</li>
          <li onClick={() => handleTabClick("usersTable")} className="hover:bg-gray-700 p-2 rounded cursor-pointer">📊 المستخدمين</li>
        </ul>
      </div>

      {/* Overlay للـ mobile */}
      {sidebarOpen && <div 
        className="fixed inset-0 bg-black opacity-30 z-40 md:hidden"
        onClick={() => setSidebarOpen(false)}
      ></div>}

      {/* ===== Main ===== */}
      <div className="flex-1 p-6 md:ml-64">

        {/* Top bar */}
        <div className="flex justify-between items-center mb-6">
          <button
            className="md:hidden bg-gray-800 text-white px-4 py-2 rounded"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>
          <h1 className="text-3xl font-bold"> Super Admin</h1>
        </div>

        {/* ===== Stats ===== */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <StatCardSmall title="المستخدمين" value={stats.totalUsers} emoji="👥" color="blue" />
          <StatCardSmall title="إجمالي الرصيد" value={stats.totalBalance} emoji="💰" color="green" />
          <StatCardSmall title="Admins" value={stats.admins} emoji="👑" color="red" />
          <StatCardSmall title="Clients" value={stats.clients} emoji="👤" color="purple" />
        </div>

        {/* ===== Content ===== */}
        <div className="bg-white rounded shadow p-6">
          {activeTab === "createAccount" && <CreateAccountForm onCreate={addAccount} />}
          {activeTab === "addBalance" && <AddBalanceForm users={users} onAdd={addBalance} />}
          {activeTab === "usersTable" && <UsersTable users={users} onDelete={deleteUser} />}
        </div>

      </div>
    </div>
  );
};

// ================= COMPONENTS =================

const StatCardSmall = ({ title, value, emoji, color }) => (
  <motion.div whileHover={{ scale: 1.05 }} className={`flex items-center gap-4 p-3 rounded shadow border-l-4 ${COLORS[color]}`}>
    <div className="text-3xl">{emoji}</div>
    <div className="flex flex-col">
      <span className="text-gray-600 text-sm">{title}</span>
      <span className="font-bold text-lg">{value}</span>
    </div>
  </motion.div>
);

const CreateAccountForm = ({ onCreate }) => {
  const [form, setForm] = useState({ username: "", password: "", role: "client", initialBalance: "" });

  return (
    <form
      onSubmit={e => { e.preventDefault(); onCreate(form); setForm({ username: "", password: "", role: "client", initialBalance: "" }); }}
      className="max-w-lg mx-auto space-y-4"
    >
      <InputField label="اسم المستخدم" value={form.username} onChange={v => setForm({ ...form, username: v })} />
      <InputField label="كلمة السر" type="password" value={form.password} onChange={v => setForm({ ...form, password: v })} />
      <select
        value={form.role}
        onChange={e => setForm({ ...form, role: e.target.value })}
        className="w-full p-3 border rounded"
      >
        <option value="admin">Admin</option>
        <option value="subadmin">Sub Admin</option>
        <option value="client">Client</option>
      </select>
      <InputField label="الرصيد الابتدائي" type="number" value={form.initialBalance} onChange={v => setForm({ ...form, initialBalance: v })} />
      <button className="bg-green-600 hover:bg-green-700 w-full text-white py-2 rounded">إنشاء</button>
    </form>
  );
};

const AddBalanceForm = ({ users, onAdd }) => {
  const [data, setData] = useState({ userId: "", amount: "" });

  return (
    <form
      onSubmit={e => { e.preventDefault(); onAdd(data); setData({ userId: "", amount: "" }); }}
      className="max-w-md mx-auto space-y-4"
    >
      <select
        value={data.userId}
        onChange={e => setData({ ...data, userId: e.target.value })}
        className="w-full p-3 border rounded"
      >
        <option value="">اختر مستخدم</option>
        {users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
      </select>
      <InputField label="المبلغ" type="number" value={data.amount} onChange={v => setData({ ...data, amount: v })} />
      <button className="bg-purple-600 hover:bg-purple-700 w-full text-white py-2 rounded">إضافة</button>
    </form>
  );
};

const UsersTable = ({ users, onDelete }) => {
  const [filter, setFilter] = useState("");
  const [showPassword, setShowPassword] = useState({}); // لتخزين حالة العرض لكل مستخدم

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(filter.toLowerCase())
  );

  const togglePassword = (id) => {
    setShowPassword(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div>
      <input
        className="w-full p-2 border rounded mb-4"
        placeholder="🔍 بحث..."
        value={filter}
        onChange={e => setFilter(e.target.value)}
      />

      <div className="overflow-auto">
        <table className="w-full text-center border">
          <thead className="bg-gray-200">
            <tr>
              {["ID", "User", "Password", "Role", "Balance", "Date", "Action"].map(h =>
                <th key={h} className="p-2 border">{h}</th>
              )}
            </tr>
          </thead>
          <tbody>
            {filtered.map(u => (
              <tr key={u.id} className="border-t">
                <td className="border">{u.id}</td>
                <td className="border">{u.name}</td>
                <td className="border">
                  {showPassword[u.id] ? u.password : "••••••"}
                  <button onClick={() => togglePassword(u.id)} className="ml-2 text-blue-500 underline text-sm">
                    {showPassword[u.id] ? "إخفاء" : "إظهار"}
                  </button>
                </td>
                <td className="border">{u.role}</td>
                <td className="border text-green-600 font-bold">{u.balance}</td>
                <td className="border">{u.createdAt}</td>
                <td className="border">
                  <button onClick={() => onDelete(u.id)} className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded">
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && <p className="text-center p-4">لا يوجد نتائج</p>}
      </div>
    </div>
  );
};

const InputField = ({ label, value, onChange, type = "text" }) => (
  <input
    type={type}
    value={value}
    placeholder={label}
    onChange={e => onChange(e.target.value)}
    className="w-full p-3 border rounded"
  />
);

export default SuperAdmin;
