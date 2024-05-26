"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const passwordFormSchema = z.object({
  password: z.string().min(1, "Password is required"),
});

type PasswordFormValues = z.infer<typeof passwordFormSchema>;

interface LocalWalletModalProps {
  closeModal: () => void;
  isModalOpen: boolean;
  onSubmit: (values: PasswordFormValues) => void;
}

export function LocalWalletPasswordModal({
  closeModal,
  isModalOpen,
  onSubmit,
}: LocalWalletModalProps) {
  function handleOpenChange(open: boolean) {
    if (!open) {
      closeModal();
    }
  }

  const defaultValues: PasswordFormValues = {
    password: "",
  };

  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues,
  });

  return (
    <>
      <Dialog open={isModalOpen} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Enter Password</DialogTitle>
            <DialogDescription>
              Enter your password to unlock your wallet.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid w-full items-center gap-4">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Authorize</Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
