"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSession } from "next-auth/react";
import { UserProvider } from "@/lib/models/types";
import { SettingsValidation } from "@/lib/validations/auth";
import { settings } from "@/lib/actions/auth/settings";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { FormError } from "@/components/shared/form-error";
import { FormSuccess } from "@/components/shared/form-success";


import {
    DialogDescription,
    DialogHeader,
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
  import ImageUpload from "@/components/shared/image-upload";

export const SettingsForm = () => {
    const { data: session, status, update } = useSession({ required: true });
    const user = session?.user;

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof SettingsValidation>>({
        resolver: zodResolver(SettingsValidation),
        defaultValues: {
            name: user?.name || "",
            email: user?.email || "",
            password: "",
            newPassword: "",
            isTwoFactorEnabled: user?.isTwoFactorEnabled || false,
        },
    });

    async function onSubmit(values: z.infer<typeof SettingsValidation>) {
        setError("");
        setSuccess("");

        startTransition(() => {
            settings(values)
                .then((data) => {
                    if (data?.error) {
                        setError(data.error);
                    } else if (data?.success) {
                        update();
                        setSuccess(data.success);
                    }
                })
                .catch(() => setError("Something went wrong"));
        });
    }

    function uploadAvatar(event: React.ChangeEvent<HTMLInputElement>) {
        event.preventDefault();
        const file = event.target.files?.[0];
        if(file){
            
        }
    }

    if (status === "loading") {
        return <div>Loading...</div>;
    }

    return (
        <Card className="w-full mt-1 py-3 px-5">
            <CardHeader>
                <p className="text-4xl font-semibold text-center">Settings</p>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                        <div className="space-y-2">
                            <div className="flex items-center justify-center space-x-4">
                                <p className="font-semibold">Upload a new avatar picture</p>
                                <Dialog>
              <DialogTrigger asChild>
                <Button className="rounded-full shadow" variant="outline">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13" />
                  </svg>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle className="text-center">
                    Upload your files
                  </DialogTitle>
                  <DialogDescription className="text-center">
                    The only file upload you will ever need
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <ImageUpload />
                </div>
              </DialogContent>
            </Dialog>
            {selectedFile && (
            <div className="mt-2 text-sm text-gray-400">
              Attached: {selectedFile.name}
            </div>
          )}
                            </div>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input disabled={isPending} placeholder="your username on the web" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input disabled={isPending || user?.provider !== UserProvider.CREDENTIALS} placeholder="mail@example.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {user?.provider === UserProvider.CREDENTIALS && (
                                <>
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <Input disabled={isPending} type="password" placeholder="your password" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="newPassword"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>New password</FormLabel>
                                                <FormControl>
                                                    <Input disabled={isPending} type="password" placeholder="new password" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </>
                            )}
                            {user?.provider === UserProvider.CREDENTIALS && (
                                <FormField
                                    control={form.control}
                                    name="isTwoFactorEnabled"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                            <div className="space-y-0.5">
                                                <FormLabel>Two Factor Authentication</FormLabel>
                                                <FormDescription>Enable two factor authentication</FormDescription>
                                            </div>
                                            <FormControl>
                                                <Switch disabled={isPending} checked={field.value} onCheckedChange={field.onChange} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            )}
                        </div>
                        <FormError message={error} />
                        <FormSuccess message={success} />
                        <Button size="lg" className="w-full my-6" type="submit" disabled={isPending}>
                            {isPending ? "Saving..." : "Save"}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};
