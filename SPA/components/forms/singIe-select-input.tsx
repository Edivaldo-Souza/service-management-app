import api from "@/lib/api"
import { isAxiosError } from "axios"
import { useEffect, useId, useState } from "react"
import toast from "react-hot-toast"
import { SingleValue } from "react-select"
import Select from "react-select"
import { SingleSelectedOption } from "@/types/selectables"

interface SingleSelectInputProps{
    value: SingleSelectedOption | null,
    onChange: (selectedOption:SingleValue<SingleSelectedOption>) => void,
    url: string,
    typeMetaData:string
}

export default function SingleSelectInput({value,onChange,url,typeMetaData}:SingleSelectInputProps){
    const [options,setOptions] = useState<SingleSelectedOption[]>([])
    const [loading,setLoading] = useState<boolean>(true)
    const stableId = useId()

    useEffect(()=>{

        const getOptions = async () => {

            try{
                const response = await api.get(url)
                
                const responseData = response.data.data.map((option:{id:number,name:string,price:number}) =>({
                    id:option.id,
                    label:`${option.name} (R$ ${option.price})`,
                    value:option.id,
                    price:option.price
                }))
                setOptions(responseData)
            }
            catch(error){
                if(isAxiosError(error)){
                    toast.error(`${error.response?.data.error}`)
                }
            }
            finally{
                setLoading(false)
            }
        }
        getOptions()
    },[])

    return (
        <div>
            <Select 
            isClearable
            instanceId={stableId}
            options={options}
            isLoading={loading}
            value={value}
            onChange={onChange}
            placeholder={`Selecione a ${typeMetaData}`}
            noOptionsMessage={()=>(`Nenhuma ${typeMetaData} encontrada`)}
            loadingMessage={()=>(`Carregando ${typeMetaData}...`)}
            />
        </div>
    )
}