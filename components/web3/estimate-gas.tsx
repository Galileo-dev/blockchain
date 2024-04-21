"use client"

import { useEffect } from "react"
import { Fuel } from "lucide-react"
import { useFormContext } from "react-hook-form"

import { BaseError } from "types"
import { AlertError } from "@/components/ui/alert-error"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

interface EstimateGasProps {
  estimateGas: string | null
  estimateGasError: BaseError | null
}

export default function EstimateGas({
  estimateGas,
  estimateGasError,
}: EstimateGasProps) {
  const { control, setValue } = useFormContext()

  useEffect(() => {
    setValue("gas", estimateGas, { shouldDirty: true })
  }, [estimateGas, setValue])

  return (
    <>
      {estimateGas ? (
        <FormField
          control={control}
          name="gas"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center space-x-2">
                <FormLabel>Gas price</FormLabel>
                <Fuel className="ml-2 size-4" />
              </div>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ) : (
        estimateGasError?.shortMessage && (
          <AlertError>
            {estimateGasError?.shortMessage || "Failed to estimate gas"}
          </AlertError>
        )
      )}
    </>
  )
}
