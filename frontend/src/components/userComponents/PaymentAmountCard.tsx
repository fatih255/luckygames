import React from 'react'
import { UseFormSetValue, UseFormWatch } from 'react-hook-form'
import { FaCoins } from 'react-icons/fa'
import { FormInputs } from '../../../pages/profile/buygamecoin'

interface Props {
    amounts: string
    HookFormFunctions: {
        watch: UseFormWatch<FormInputs>
        setValue: UseFormSetValue<FormInputs>
    }

}


export default function PaymentAmountCard({ amounts, HookFormFunctions }: Props) {

    const selectedAmount = HookFormFunctions.watch("amount")

    return (
        <>
            <h2 className="text-black text-xl font-semibold">Yüklemek istediğiniz Miktar {selectedAmount && <span className="text-lg font-normal text-green-600">{`( ${selectedAmount} Seçildi )`}</span>}</h2>
            <div className="flex gap-x-3">
                {
                    amounts.split(',').map(Number).map((amount,index) => (
                        <div key={index} onClick={() => HookFormFunctions.setValue('amount', amount)} className={`${amount === selectedAmount ? 'bg-green-600 hover:bg-green-700' : 'bg-white hover:bg-blue-600'} mt-4 group  hover:scale-105 transition-all select-none cursor-pointer duration-150 shadow-lg rounded-lg border-blue-200 border-[1px] flex flex-col px-3 py-3 w-40 justify-center items-center`}>
                            <FaCoins className={`${amount === selectedAmount ? 'text-white' : 'text-blue-600'} text-3xl group-hover:text-white`} />
                            <span className={`font-bold  group-hover:text-white  ${amount === selectedAmount ? 'text-white' : 'text-blue-600'}  text-2xl mt-2`}>{amount}</span>

                        </div>
                    ))
                }
            </div>
        </>
    )
}
