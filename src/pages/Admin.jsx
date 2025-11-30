import React, { useState } from 'react';

const Admin = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("createUser");
  const [users, setUsers] = useState([
    { id: 1, name: 'subadmin1', password: 'pass123', role: 'subadmin', balance: 500, createdAt: '2024-01-10' },
    { id: 2, name: 'client1', password: 'pass456', role: 'client', balance: 250, createdAt: '2024-01-11' },
    { id: 3, name: 'client2', password: 'pass789', role: 'client', balance: 150, createdAt: '2024-01-12' },
  ]);
  const [showPassword, setShowPassword] = useState({});
  
  const [subAdminForm, setSubAdminForm] = useState({ name: '', password: '', balance: '' });
  const [clientForm, setClientForm] = useState({ name: '', password: '', balance: '' });
  const [balanceForm, setBalanceForm] = useState({ name: '', amount: '' });
  const [search, setSearch] = useState('');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setSidebarOpen(false);
  };

  const addUser = (role, form, setForm) => {
    if (!form.name || !form.password) { alert("عمر الحقول"); return; }
    const newUser = {
      id: Date.now(),
      name: form.name,
      password: form.password,
      role,
      balance: Number(form.balance || 0),
      createdAt: new Date().toISOString().split('T')[0]
    };
    setUsers([...users, newUser]);
    setForm({ name: '', password: '', balance: '' });
  };

  const addBalance = () => {
    if (!balanceForm.name || !balanceForm.amount) { alert("عمّر الاسم والمبلغ"); return; }

    const targetUser = users.find(u => u.name === balanceForm.name);
    if (!targetUser) { alert("المستخدم غير موجود"); return; }
    if (targetUser.role === 'admin') { alert("لا يمكن زيادة الرصيد للـAdmin"); return; }

    setUsers(users.map(u => u.name === balanceForm.name ? { ...u, balance: Number(u.balance) + Number(balanceForm.amount) } : u));
    setBalanceForm({ name: '', amount: '' });
  };

  const deleteUser = (id) => { if (!window.confirm("هل أنت متأكد؟")) return; setUsers(users.filter(u => u.id !== id)); };
  const togglePassword = (id) => setShowPassword(prev => ({ ...prev, [id]: !prev[id] }));
  const getRoleColor = (role) => role === 'subadmin' ? 'bg-orange-100 text-orange-700' : role === 'client' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700';
  const filteredUsers = users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <div className={`fixed md:static top-0 left-0 h-full w-64 bg-gray-900 text-white p-5 transform
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"} transition-transform duration-300 z-50`}>
        <h2 className="text-2xl font-bold mb-8">Admin</h2>
        <ul className="space-y-4">
          <li onClick={() => handleTabClick("createUser")} className="hover:bg-gray-700 p-2 rounded cursor-pointer">➕ إنشاء مستخدم</li>
          <li onClick={() => handleTabClick("addBalance")} className="hover:bg-gray-700 p-2 rounded cursor-pointer">💰 إضافة رصيد</li>
          <li onClick={() => handleTabClick("usersTable")} className="hover:bg-gray-700 p-2 rounded cursor-pointer">📊 المستخدمين</li>
        </ul>
      </div>

      {/* Overlay mobile */}
      {sidebarOpen && <div className="fixed inset-0 bg-black opacity-30 z-40 md:hidden" onClick={() => setSidebarOpen(false)}></div>}

      {/* Main */}
      <div className="flex-1 p-6 md:ml-64">
        <div className="flex justify-between items-center mb-6">
          <button className="md:hidden bg-gray-800 text-white px-4 py-2 rounded" onClick={() => setSidebarOpen(!sidebarOpen)}>☰</button>
          <h1 className="text-3xl font-bold"> Admin</h1>
        </div>

        <div className="bg-white rounded shadow p-6">
          {/* إنشاء المستخدمين */}
          {activeTab === "createUser" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Sub Admin */}
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold mb-4 text-orange-600">إنشاء Sub Admin</h2>
                <input value={subAdminForm.name} onChange={e => setSubAdminForm({ ...subAdminForm, name: e.target.value })} placeholder="اسم المستخدم" className="w-full p-3 border rounded-lg mb-3"/>
                <input type="password" value={subAdminForm.password} onChange={e => setSubAdminForm({ ...subAdminForm, password: e.target.value })} placeholder="كلمة المرور" className="w-full p-3 border rounded-lg mb-3"/>
                <input type="number" value={subAdminForm.balance} onChange={e => setSubAdminForm({ ...subAdminForm, balance: e.target.value })} placeholder="الرصيد" className="w-full p-3 border rounded-lg mb-4"/>
                <button onClick={() => addUser('subadmin', subAdminForm, setSubAdminForm)} className="bg-orange-600 text-white w-full py-2 rounded-lg hover:bg-orange-700">إنشاء Sub Admin</button>
              </div>
              {/* Client */}
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold mb-4 text-blue-600">إنشاء Client</h2>
                <input value={clientForm.name} onChange={e => setClientForm({ ...clientForm, name: e.target.value })} placeholder="اسم المستخدم" className="w-full p-3 border rounded-lg mb-3"/>
                <input type="password" value={clientForm.password} onChange={e => setClientForm({ ...clientForm, password: e.target.value })} placeholder="كلمة المرور" className="w-full p-3 border rounded-lg mb-3"/>
                <input type="number" value={clientForm.balance} onChange={e => setClientForm({ ...clientForm, balance: e.target.value })} placeholder="الرصيد" className="w-full p-3 border rounded-lg mb-4"/>
                <button onClick={() => addUser('client', clientForm, setClientForm)} className="bg-blue-600 text-white w-full py-2 rounded-lg hover:bg-blue-700">إنشاء Client</button>
              </div>
            </div>
          )}

          {/* إضافة رصيد */}
          {activeTab === "addBalance" && (
            <div className="bg-white p-6 rounded-xl shadow-lg max-w-xl mx-auto">
              <h2 className="text-xl font-bold mb-4 text-purple-600">إضافة رصيد</h2>
              <input value={balanceForm.name} onChange={e => setBalanceForm({ ...balanceForm, name: e.target.value })} placeholder="اختر مستخدم (SubAdmin أو Client)" className="w-full p-3 border rounded-lg mb-3"/>
              <input type="number" value={balanceForm.amount} onChange={e => setBalanceForm({ ...balanceForm, amount: e.target.value })} placeholder="المبلغ" className="w-full p-3 border rounded-lg mb-4"/>
              <button onClick={addBalance} className="bg-purple-600 text-white w-full py-2 rounded-lg hover:bg-purple-700">إضافة الرصيد</button>
            </div>
          )}

          {/* جدول المستخدمين مع الكروت */}
          {activeTab === "usersTable" && (
            <div>
              {/* Dashboard Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white p-4 rounded-xl shadow flex flex-col items-center justify-center">
                  <span className="text-3xl">👥</span>
                  <p className="font-bold text-lg mt-2">المستخدمين</p>
                  <p className="text-gray-500">{users.length}</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow flex flex-col items-center justify-center">
                  <span className="text-3xl">💰</span>
                  <p className="font-bold text-lg mt-2">إجمالي الرصيد</p>
                  <p className="text-gray-500">{users.reduce((sum, u) => sum + u.balance, 0)} TND</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow flex flex-col items-center justify-center">
                  <span className="text-3xl">👤</span>
                  <p className="font-bold text-lg mt-2">Clients</p>
                  <p className="text-gray-500">{users.filter(u => u.role === 'client').length}</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow flex flex-col items-center justify-center">
                  <span className="text-3xl">🧡</span>
                  <p className="font-bold text-lg mt-2">SubAdmins</p>
                  <p className="text-gray-500">{users.filter(u => u.role === 'subadmin').length}</p>
                </div>
              </div>

              {/* Search input */}
              <input type="text" placeholder="🔍 ابحث..." value={search} onChange={e => setSearch(e.target.value)} className="w-full p-3 rounded-xl border mb-4"/>

              {/* Users Table */}
              <div className="overflow-x-auto shadow-lg rounded-xl bg-white">
                <table className="w-full text-center">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="p-4">ID</th>
                      <th className="p-4">User</th>
                      <th className="p-4">Password</th>
                      <th className="p-4">Role</th>
                      <th className="p-4">Balance</th>
                      <th className="p-4">Created</th>
                      <th className="p-4">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((u, i) => (
                      <tr key={u.id} className={`border-t hover:bg-gray-50 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                        <td className="p-3">{u.id}</td>
                        <td className="p-3 font-semibold">{u.name}</td>
                        <td className="p-3">
                          {showPassword[u.id] ? u.password : "••••••"}
                          <button onClick={() => togglePassword(u.id)} className="ml-2 text-blue-500 underline text-sm">{showPassword[u.id] ? "إخفاء" : "إظهار"}</button>
                        </td>
                        <td className="p-3"><span className={`px-3 py-1 rounded-full text-sm ${getRoleColor(u.role)}`}>{u.role}</span></td>
                        <td className="p-3 text-green-600 font-bold">{u.balance} TND</td>
                        <td className="p-3 text-gray-500">{u.createdAt}</td>
                        <td className="p-3">
                          <button onClick={() => deleteUser(u.id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">حذف</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      </div>

    </div>
  );
};

export default Admin;
