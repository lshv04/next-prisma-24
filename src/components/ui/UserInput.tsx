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
      userText: '',
    },
  })

  const { handleSubmit, control, reset } = formMethods

  const onSubmit = async (data: any) => {
    setLoading(true)
    try {
      // Realiza a chamada POST para a API, enviando o campo userText
      const response = await fetch('/api/userinput', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userText: data.userText }),
      })

      if (!response.ok) {
        // Caso a resposta não seja ok, lança um erro
        throw new Error('Erro ao enviar os dados.')
      }

      // Opcional: trate o resultado retornado pela API
      const result = await response.json()
      console.log('Registro salvo:', result)
      
      // Limpa os campos do formulário e define um feedback (se necessário)
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
        <FormField
          control={control}
          name="userText"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Digite seu texto:</FormLabel>
              <FormControl className="w-[180px]">
                <Input placeholder="type here..." {...field} />
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
