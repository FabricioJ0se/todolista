'use client'
import { useState, useEffect } from "react";
import axios from "axios";

interface Tarefa {
    id:number,
    title: string,
    comploted: boolean
}

export default function ListaTarefas(){
    const[tarefas,setTarefas] = useState<Tarefa[]>([])
    const[carregando,setCarregando] = useState(true);

    useEffect(function(){
        axios.get("https://jsonplaceholder.typicode.com/")
        .then(function(resposta){
            setTarefas(resposta.data)
            setCarregando(false)
        })
        .catch(function(){
            setCarregando(false)
        })
    },[])

    function deletarTarefa(id: number){
        axios.delete("https://jsonplaceholder.typicode.com/todos/" + id)
        .then (function(){
            alert("Tarefa deletada com sucesso(simulado)")
            
            const novasTarefas = tarefas.filter(function(dados){
                return dados.id !== id
            })
            setTarefas(novasTarefas)
        })
        .catch (function(){
            alert("erro ao deletar")
        })
    }

        if(carregando){
            return(
                <p>Carregando tarefas</p>
            )
        }
    return(
        <>
        <ul>
            {tarefas.map(function(tarefa){
                return(
                    <li key={tarefa.id}>
                        {tarefa.title}
                    
                    <button onClick={function(){
                        deletarTarefa(tarefa.id)
                    }}>DELETAR
                    </button>
                    </li>
                )
            })}
        </ul>
        </>
    )

}