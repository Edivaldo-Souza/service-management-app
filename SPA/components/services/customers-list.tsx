import styles from "./customers-list.module.css";

const customers = [
  { id: 1, name: "Lucas"},
  { id: 2, name: "Pedro"},
  { id: 3, name: "Simone"},
  { id: 4, name: "Lucas"},
  { id: 5, name: "Pedro"},
  { id: 6, name: "Simone"},
  { id: 7, name: "Lucas"},
  { id: 8, name: "Pedro"},
  { id: 9, name: "Simone"},
  { id: 10, name: "Lucas"},
  { id: 11, name: "Pedro"},
  { id: 12, name: "Simone"},
];

export default function CustomersList(){
    return (
        <div className={`w-full flex flex-col h-full ${styles.container}`}>
            <div className="flex justify-center p-3">
                <input
                    placeholder="Pesquisar"
                    className="rounded-xl border px-4 py-2 w-full max-w-xs text-center"
                />
            </div>

            {/* Scrollable customer list */}
            <div className="flex-1 min-h-0 overflow-y-auto px-2 pb-16">
                <ul className="w-full p-2">
                    {customers.map((customer)=>(
                        <li key={customer.id} className="p-0.5">
                            <div className="rounded-xl border flex w-full items-center gap-2 p-2">
                                <img alt="Profile picture" className="w-8 h-8 rounded-full"/>
                                <label className="flex-1">{customer.name}</label>
                                <button className="rounded-full bg-emerald-600 w-6 h-6 text-white text-sm flex items-center justify-center">+</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div className={styles.bottomBar}>
                <button className="bg-emerald-600 font-bold rounded-xl text-white px-6 py-2 w-full cursor-pointer hover:bg-emerald-700 transition-colors">
                    Adicionar novo cliente
                </button>
            </div>
        </div>
    )
}