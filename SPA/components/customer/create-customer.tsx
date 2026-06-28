export default function CreateCostumer({toggle}:boolean){
    return (
        <div className="relative" hidden>
            <h2>Novo cliente</h2>
            <input placeholder="Nome"></input>
            <input type="select" placeholder="Tipo de cliente"></input>
            <input placeholder="telefone"></input>
            <input placeholder="email"></input>
        </div>
    )
}