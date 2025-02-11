import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const Userinput = () => {
  const [loading, setLoading] = useState(false)

  const formMethods = useForm({
    defaultValues: {
      field1: '',
      field2: '',
      field3: '',
      field4: '',
      field5: '',
    },
  })

  const { handleSubmit, control, reset } = formMethods

  const onSubmit = async (data: any) => {
    setLoading(true)
    try {
      // Realiza a chamada POST para a API, enviando todos os campos do formulário
      const response = await fetch('/api/userinput', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Erro ao enviar os dados.')
      }

      const result = await response.json()
      console.log('Registro salvo:', result)
      reset()
    } catch (error) {
      console.error('Erro ao enviar os dados:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    
    <Form {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Campo 1 */}
        <FormField
          control={control}
          name="field1"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Campo 1:</FormLabel>
              <FormControl className="w-[180px]">
                <Input placeholder="Digite o campo 1..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Campo 2 */}
        <FormField
          control={control}
          name="field2"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Campo 2:</FormLabel>
              <FormControl className="w-[180px]">
                <Input placeholder="Digite o campo 2..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Campo 3 */}
        <FormField
          control={control}
          name="field3"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Campo 3:</FormLabel>
              <FormControl className="w-[180px]">
                <Input placeholder="Digite o campo 3..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Campo 4 */}
        <FormField
          control={control}
          name="field4"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Campo 4:</FormLabel>
              <FormControl className="w-[180px]">
                <Input placeholder="Digite o campo 4..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Campo 5 */}
        <FormField
          control={control}
          name="field5"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Campo 5:</FormLabel>
              <FormControl className="w-[180px]">
                <Input placeholder="Digite o campo 5..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          variant="default"
          type="submit"
          disabled={loading}
          className="mt-4 px-4 py-2"
        >
          {loading ? 'Enviando...' : 'Enviar'}
        </Button>
      </form>
    </Form>
  )
}

export default Userinput
